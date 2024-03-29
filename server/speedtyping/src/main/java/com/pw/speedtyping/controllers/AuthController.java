package com.pw.speedtyping.controllers;

import com.pw.speedtyping.dtos.SignInDto;
import com.pw.speedtyping.dtos.SignInResponseDto;
import com.pw.speedtyping.dtos.SignUpDto;
import com.pw.speedtyping.dtos.SignUpResponseDto;
import com.pw.speedtyping.service.AuthService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-up")
    public SignUpResponseDto signUp(@RequestBody SignUpDto userSignUpData) {
        return authService.signUp(userSignUpData);
    }

    @PostMapping("/sign-in")
    public SignInResponseDto signIn(@RequestBody SignInDto signInData) {
        return authService.signIn(signInData);
    }

}
