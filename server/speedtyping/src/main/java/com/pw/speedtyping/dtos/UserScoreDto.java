package com.pw.speedtyping.dtos;

public class UserScoreDto {
    private String username;
    private int score;

    public UserScoreDto(String username, int score) {
        this.username = username;
        this.score = score;
    }

    public UserScoreDto() {}

    public String getUsername() {
        return username;
    }

    public void setUsername(String newUsername) {
        username = newUsername;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int newScore) {
        score = newScore;
    }
}
