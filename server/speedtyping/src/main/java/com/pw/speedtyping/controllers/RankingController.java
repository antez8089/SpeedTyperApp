package com.pw.speedtyping.controllers;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import com.pw.speedtyping.service.RankingService;
import com.pw.speedtyping.dtos.UserScoreDto;
import com.pw.speedtyping.dtos.RankingDto;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RankingController {

    private final RankingService rankingService;

    public RankingController(RankingService rankingService) {
        this.rankingService = rankingService;
    }

    @GetMapping("/ranking")
    public List<UserScoreDto> getAllUsersAndScores(RankingDto rankingDto) {
        return rankingService.getAllUsersAndScores(rankingDto.getLimit());
    }
}
