package com.pw.speedtyping.controllers;

import com.pw.speedtyping.dtos.JwtDto;
import com.pw.speedtyping.dtos.SignInDto;
import com.pw.speedtyping.dtos.SignUpDto;
import com.pw.speedtyping.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody SignUpDto userSignUpData) {
        return ResponseEntity.ok(authService.signUp(userSignUpData));
    }

    @PostMapping("/sign-in")
    public JwtDto signIn(@RequestBody SignInDto signInData) {
        return authService.signIn(signInData);
    }

}
