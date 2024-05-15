package com.pw.speedtyping.controllers;

import com.pw.speedtyping.database.models.GameStatus;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import com.pw.speedtyping.service.MatchmakingService;
import com.pw.speedtyping.database.models.User;



@Controller
public class GameController {

    private final SimpMessagingTemplate template;
    private final MatchmakingService matchmakingService;

    public GameController(SimpMessagingTemplate template, MatchmakingService matchmakingService) {
        this.template = template;
        this.matchmakingService = matchmakingService;
    }

    @MessageMapping("/join")
    public void join(User user) throws Exception {
        matchmakingService.addPlayer(user);
        User opponent = matchmakingService.findMatch(user);
        if (opponent != null) {
            // Notify both players that a match has been found
            template.convertAndSendToUser(user.getUsername(), "/queue/match", opponent);
            template.convertAndSendToUser(opponent.getUsername(), "/queue/match", user);
        }
    }

    @MessageMapping("/game")
    @SendTo("/topic/game")
    public GameStatus game(GameStatus gameStatus) throws Exception {
        // update game status and return new status
        return gameStatus;
    }
}