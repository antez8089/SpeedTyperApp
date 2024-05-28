package com.pw.speedtyping.controllers;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.repository.UserRepository;
import com.pw.speedtyping.dtos.SignInResponseDto;
import com.pw.speedtyping.service.JwtService;
import com.pw.speedtyping.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final JwtService jwtService;

    public UserProfileController(UserService userService, UserRepository userRepository, JwtService jwtService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }

    @PostMapping("/set-username")
    public SignInResponseDto String(@AuthenticationPrincipal User user, @RequestBody String newUsername) {
        if (userRepository.findByUsername(newUsername) != null) {
            return new SignInResponseDto(false, "user with this username already exists", null);
        }
        userService.setUsername(user, newUsername);
        user = userRepository.findByUsername(newUsername);
        return new SignInResponseDto(true, "login successful", jwtService.generateToken(user));
    }

    @GetMapping("/get-username")
    public String getUsername(@AuthenticationPrincipal User user) {
        return user.getUsername();

    }
}
