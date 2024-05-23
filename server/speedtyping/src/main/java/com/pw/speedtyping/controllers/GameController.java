package com.pw.speedtyping.controllers;

import com.pw.speedtyping.database.models.GameStatus;
import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.service.JwtService;
import com.pw.speedtyping.service.MatchmakingService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class GameController {

    private final MatchmakingService matchmakingService;
    private final JwtService jwtService;

    public GameController(SimpMessagingTemplate template, MatchmakingService matchmakingService, JwtService jwtService) {
        this.matchmakingService = matchmakingService;
        this.jwtService = jwtService;
    }

    @MessageMapping("/join")
    public void join(String token) throws Exception {
        User user = (User) jwtService.getUserDetailsFromToken(token);
        matchmakingService.addPlayer(user);
    }

    @MessageMapping("/disconnect")
    public void disconnect(String token) throws Exception {
        User user = (User) jwtService.getUserDetailsFromToken(token);
        matchmakingService.removePlayer(user);
    }

    @MessageMapping("/get-game-words")
    public void gameWords(String token) throws Exception {
        User user = (User) jwtService.getUserDetailsFromToken(token);
        matchmakingService.sendWords(user);
    }

    @MessageMapping("/game-end")
    public void endGame(String token) throws Exception {
        User user = (User) jwtService.getUserDetailsFromToken(token);
        matchmakingService.endGame(user);
    }

    @MessageMapping("/game")
    public GameStatus game(GameStatus gameStatus) throws Exception {
        return gameStatus;
    }
}