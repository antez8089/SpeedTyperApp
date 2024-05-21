package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.repository.UserRepository;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;


@Service
public class MatchmakingService {

    private final ConcurrentLinkedQueue<User> queue = new ConcurrentLinkedQueue<>();
    private final Map<String, String> activeMatches = new ConcurrentHashMap<>();
    private final SimpMessagingTemplate template;
    private final UserRepository userRepository;

    public MatchmakingService(SimpMessagingTemplate template, UserRepository userRepository) {
        this.template = template;
        this.userRepository = userRepository;
    }

    public void addPlayer(User user) {
        queue.add(user);
        User opponent = findMatch(user);
        if (opponent != null) {
            activeMatches.put(user.getUsername(), opponent.getUsername());
            activeMatches.put(opponent.getUsername(), user.getUsername());
            template.convertAndSendToUser(user.getUsername(), "/queue/match", opponent.getUsername());
            template.convertAndSendToUser(opponent.getUsername(), "/queue/match", user.getUsername());
        }
    }

    private User findMatch(User user) {
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
        queue.removeIf(userInQueue -> userInQueue.getUsername().equals(user.getUsername()));

        if (activeMatches.containsKey(user.getUsername())) {
            String opponentName = activeMatches.get(user.getUsername());
            activeMatches.remove(user.getUsername());
            activeMatches.remove(opponentName);
            queue.add(userRepository.findByEmail(opponentName));
            template.convertAndSendToUser(opponentName, "/queue/disconnect", user.getUsername());
        }
    }
}