package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.repository.UserRepository;
import com.pw.speedtyping.dtos.JwtDto;
import com.pw.speedtyping.dtos.SignInDto;
import com.pw.speedtyping.dtos.SignUpDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

    public AuthService(UserRepository userRepository, PasswordEncoder encoder, JwtService jwtService, AuthenticationManager authManager) {
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.jwtService = jwtService;
        this.authManager = authManager;
    }

    public Map<String, Object> signUp(SignUpDto userSignUpData) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.findByUsername(userSignUpData.getUsername()) != null) {
            response.put("registered", false);
            response.put("message", "user with this username already exists");
            return response;
        }
        if (userRepository.findByEmail(userSignUpData.getEmail()) != null) {
            response.put("registered", false);
            response.put("message", "user with this email already exists");
            return response;
        }

        User user = new User(userSignUpData.getUsername(), userSignUpData.getEmail(), encoder.encode(userSignUpData.getPassword()));

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

    public JwtDto signIn(SignInDto userSignInData) {
        authManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInData.getEmail(), userSignInData.getPassword()));
        User user = userRepository.findByEmail(userSignInData.getEmail());
        return new JwtDto(jwtService.generateToken(user));
    }
}
