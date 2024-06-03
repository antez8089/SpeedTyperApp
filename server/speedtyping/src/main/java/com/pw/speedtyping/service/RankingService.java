package com.pw.speedtyping.service;


import com.pw.speedtyping.dtos.UserScoreDto;
import com.pw.speedtyping.database.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.pw.speedtyping.database.models.User;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RankingService {

    private final UserRepository userRepository;

    public RankingService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<UserScoreDto> getAllUsersAndScores(int limit) {
        return userRepository.findAll().stream()
                .sorted(Comparator.comparingInt(User::getScore).reversed())
                .limit(limit)
                .map(user -> {
                    UserScoreDto dto = new UserScoreDto();
                    dto.setUsername(user.getUsername());
                    dto.setScore(user.getScore());
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
