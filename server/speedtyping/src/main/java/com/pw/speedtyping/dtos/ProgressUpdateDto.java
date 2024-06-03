package com.pw.speedtyping.dtos;

public class ProgressUpdateDto {
    private String accessToken;
    private Integer progress;

    public ProgressUpdateDto() {}

    public ProgressUpdateDto(String accessToken, int progress) {
        this.accessToken = accessToken;
        this.progress = progress;
    }

    public Integer getProgress() {
        return progress;
    }
    public String getAccessToken() {
        return accessToken;
    }
}
