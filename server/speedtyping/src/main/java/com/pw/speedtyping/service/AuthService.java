package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.repository.UserRepository;
import com.pw.speedtyping.dtos.SignInDto;
import com.pw.speedtyping.dtos.SignInResponseDto;
import com.pw.speedtyping.dtos.SignUpDto;
import com.pw.speedtyping.dtos.SignUpResponseDto;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


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

    public SignUpResponseDto signUp(SignUpDto userSignUpData) {

        if (userRepository.findByUsername(userSignUpData.getUsername()) != null) {
            return new SignUpResponseDto(false, "user with this username already exists");
        }
        if (userRepository.findByEmail(userSignUpData.getEmail()) != null) {
            return new SignUpResponseDto(false, "user with this email already exists");
        }

        User user = new User(userSignUpData.getUsername(), userSignUpData.getEmail(), encoder.encode(userSignUpData.getPassword()));

        try {
            userRepository.save(user);
        } catch (Exception e) {
            return new SignUpResponseDto(false, "invalid email");
        }

        return new SignUpResponseDto(true, "user registered");

    }

    public SignInResponseDto signIn(SignInDto userSignInData) {
        try {
            authManager.authenticate(new UsernamePasswordAuthenticationToken(userSignInData.getEmail(), userSignInData.getPassword()));
            User user = userRepository.findByEmail(userSignInData.getEmail());
            return new SignInResponseDto(true, "login successful", jwtService.generateToken(user));
        } catch (BadCredentialsException e) {
            return new SignInResponseDto(false, "wrong password", null);
        } catch (InternalAuthenticationServiceException e) {
            return new SignInResponseDto(false, "user does not exist", null);
        }
    }
}
