package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentLinkedQueue;


@Service
public class MatchmakingService {

    final private ConcurrentLinkedQueue<User> queue = new ConcurrentLinkedQueue<>();

    public void addPlayer(User user) {
        queue.add(user);
    }

    public User findMatch(User user) {
        User opponent = queue.poll();
        if (opponent != null && !opponent.getUsername().equals(user.getUsername())) {
            queue.poll();
            return opponent;
        }
        if (opponent != null && opponent.getUsername().equals(user.getUsername()) && queue.isEmpty()) {
            queue.add(user);
        }
        return null;
    }

    public void removePlayer(User user) {
        queue.remove(user);
    }
}