package com.pw.speedtyping.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.ConcurrentLinkedQueue;
import com.pw.speedtyping.database.models.User;


@Service
public class MatchmakingService {

    final private ConcurrentLinkedQueue<User> queue = new ConcurrentLinkedQueue<>();

    public void addPlayer(User user) {
        queue.add(user);
    }

    public User findMatch(User user) {
        User opponent = queue.poll();
        if (opponent != null && !opponent.equals(user)) {
            return opponent;
        }
        return null;
    }

    public void removePlayer(User user) {
        queue.remove(user);
    }
}