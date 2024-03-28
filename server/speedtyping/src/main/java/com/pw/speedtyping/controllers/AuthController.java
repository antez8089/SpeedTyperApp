package com.pw.speedtyping.controllers;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostMapping("/sign-up")
    public ResponseEntity<Map<String, Object>> signUp(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByUsername(user.getUsername()) != null) {
            response.put("registered", false);
            response.put("message", "user with this username already exists");
            return ResponseEntity.ok(response);
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.put("registered", false);
            response.put("message", "user with this username already exists");
            return ResponseEntity.ok(response);
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

        try {
            userRepository.save(user);
        } catch (Exception e) {
            response.put("registered", false);
            response.put("message", "invalid email");
            return ResponseEntity.ok(response);
        }
        response.put("registered", true);
        response.put("message", "user registered");
        return ResponseEntity.ok(response);

    }

}
