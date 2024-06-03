package com.pw.speedtyping.dtos;

public class SignInResponseDto {
    private Boolean logged_in;
    private String message;
    private String token;

    public SignInResponseDto() {}

    public SignInResponseDto(Boolean logged_in, String message, String token) {
        this.logged_in = logged_in;
        this.message = message;
        this.token = token;
    }

    public Boolean getLogged_in() {
        return logged_in;
    }

    public void setLogged_in(Boolean logged_in) {
        this.logged_in = logged_in;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
