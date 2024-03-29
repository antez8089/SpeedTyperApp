package com.pw.speedtyping.dtos;

public class SignUpResponseDto {
    private Boolean registered;
    private String message;

    public SignUpResponseDto() {}

    public SignUpResponseDto(Boolean registered, String message) {
        this.registered = registered;
        this.message = message;
    }

    public Boolean getRegistered() {
        return registered;
    }

    public void setRegistered(Boolean registered) {
        this.registered = registered;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
