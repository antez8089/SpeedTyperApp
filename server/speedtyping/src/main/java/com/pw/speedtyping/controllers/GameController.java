package com.pw.speedtyping.controllers;

import com.pw.speedtyping.database.models.GameStatus;
import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.service.JwtService;
import com.pw.speedtyping.service.MatchmakingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class GameController {

    private final SimpMessagingTemplate template;
    private final MatchmakingService matchmakingService;
    private final JwtService jwtService;

    public GameController(SimpMessagingTemplate template, MatchmakingService matchmakingService, JwtService jwtService) {
        this.template = template;
        this.matchmakingService = matchmakingService;
        this.jwtService = jwtService;
    }

    @MessageMapping("/join")
    public void join(String token) throws Exception {
        User user = (User) jwtService.getUserDetailsFromToken(token);
        matchmakingService.addPlayer(user);
        User opponent = matchmakingService.findMatch(user);
        if (opponent != null) {
            template.convertAndSendToUser(user.getUsername(), "/queue/match", opponent.getUsername());
            template.convertAndSendToUser(opponent.getUsername(), "/queue/match", user.getUsername());
        }
    }

    @MessageMapping("/game")
    @SendTo("/topic/game")
    public GameStatus game(GameStatus gameStatus) throws Exception {
        return gameStatus;
    }
}