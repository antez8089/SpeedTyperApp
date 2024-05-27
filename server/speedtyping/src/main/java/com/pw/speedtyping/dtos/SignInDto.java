package com.pw.speedtyping.dtos;

public class SignInDto {
    private String password;
    private String username;

    public SignInDto() {}

    public SignInDto(String email, String password) {
        this.username = email;
        this.password = password;
    }

    public String getEmail() {
        return username;
    }

    public void setEmail(String email) {
        this.username= username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
