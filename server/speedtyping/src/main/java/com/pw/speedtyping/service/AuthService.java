package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.repository.UserRepository;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Map<String, Object> signUp(User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByUsername(user.getUsername()) != null) {
            response.put("registered", false);
            response.put("message", "user with this username already exists");
            return response;
        }
        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.put("registered", false);
            response.put("message", "user with this email already exists");
            return response;
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));

        try {
            userRepository.save(user);
        } catch (Exception e) {
            response.put("registered", false);
            response.put("message", "invalid email");
            return response;
        }
        response.put("registered", true);
        response.put("message", "user registered");
        return response;
    }
}
