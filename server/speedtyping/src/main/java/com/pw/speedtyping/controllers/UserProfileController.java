package com.pw.speedtyping.controllers;


import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.dtos.NewWordsSetDto;
import com.pw.speedtyping.service.UserService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserProfileController {
    private final UserService userService;

    public UserProfileController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/user/set-username")
    public boolean String(@AuthenticationPrincipal User user, @RequestBody String newUsername) {
        return userService.setUsername(user, newUsername);
    }
}
