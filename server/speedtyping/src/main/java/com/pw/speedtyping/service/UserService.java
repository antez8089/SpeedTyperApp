package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                return userRepository.findByUsername(username);
            }
        };
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public boolean setUsername(User user, String newUsername) {
        User userFromDb = userRepository.findByUsername(user.getUsername());
        userFromDb.setUsername(newUsername);
        userRepository.save(userFromDb);
        return true;
    }
}
