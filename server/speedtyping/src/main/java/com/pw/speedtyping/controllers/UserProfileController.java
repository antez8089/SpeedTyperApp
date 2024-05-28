package com.pw.speedtyping.controllers;

import com.pw.speedtyping.database.repository.UserRepository;
import com.pw.speedtyping.dtos.SignInDto;
import com.pw.speedtyping.dtos.SignInResponseDto;
import com.pw.speedtyping.service.JwtService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.dtos.NewWordsSetDto;
import com.pw.speedtyping.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public UserProfileController(UserService userService, UserRepository userRepository, JwtService jwtService, AuthenticationManager authManager) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    @PostMapping("/set-username")
    public SignInResponseDto String(@AuthenticationPrincipal User user, @RequestBody String newUsername) {
        if (userRepository.findByUsername(newUsername) != null) {
            return new SignInResponseDto(false, "user with this username already exists", jwtService.generateToken(user));
        }
        userService.setUsername(user, newUsername);
        authManager.authenticate(new UsernamePasswordAuthenticationToken(newUsername, user.getPassword()));
        return new SignInResponseDto(true, "login successful", jwtService.generateToken(user));
    }

    @GetMapping("/get-username")
    public String getUsername(@AuthenticationPrincipal User user) {
        return user.getUsername();

    }
}
