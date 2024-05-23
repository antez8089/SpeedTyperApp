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
    private final Map<String, String> gameSets = new ConcurrentHashMap<>();
    private final SimpMessagingTemplate template;
    private final UserRepository userRepository;

    public MatchmakingService(SimpMessagingTemplate template, UserRepository userRepository) {
        this.template = template;
        this.userRepository = userRepository;
    }

    public synchronized void addPlayer(User user) {
        queue.add(user);
        createMatch();
    }


    private synchronized void createMatch() {
        User player = queue.poll();
        if (player != null) {
            User opponent = queue.poll();
            if (opponent == null || opponent.getUsername().equals(player.getUsername())) {
                queue.add(player);
            } else {
                activeMatches.put(player.getUsername(), opponent.getUsername());
                activeMatches.put(opponent.getUsername(), player.getUsername());
                template.convertAndSendToUser(player.getUsername(), "/queue/match", opponent.getUsername());
                template.convertAndSendToUser(opponent.getUsername(), "/queue/match", player.getUsername());
            }
        }
    }

    public synchronized void sendWords(User user) {
        if (activeMatches.containsKey(user.getUsername())) {
            String opponentName = activeMatches.get(user.getUsername());
            String words;
            if (gameSets.containsKey(opponentName)) {
                words = gameSets.get(opponentName);
                gameSets.remove(opponentName);
            } else {
                words = WordsApiManager.getWords(63, 5);
                gameSets.put(user.getUsername(), words);
            }
            template.convertAndSendToUser(opponentName, "/queue/match/words", words);
        }
    }

    public synchronized void removePlayer(User user) {
        queue.removeIf(userInQueue -> userInQueue.getUsername().equals(user.getUsername()));

        if (activeMatches.containsKey(user.getUsername())) {
            String opponentName = activeMatches.get(user.getUsername());
            activeMatches.remove(user.getUsername());
            activeMatches.remove(opponentName);
            queue.add(userRepository.findByEmail(opponentName));
            template.convertAndSendToUser(opponentName, "/queue/disconnect", user.getUsername());
        }
    }

    public synchronized void endGame(User user) {
        if (activeMatches.containsKey(user.getUsername())) {
            String opponentName = activeMatches.get(user.getUsername());
            activeMatches.remove(user.getUsername());
            activeMatches.remove(opponentName);
            user.setScore(user.getScore() + 10);
            userRepository.save(user);
            template.convertAndSendToUser(opponentName, "/queue/match/end", user.getUsername());
        }
    }

    public synchronized void update(User user, Integer progress) {
        if (activeMatches.containsKey(user.getUsername())) {
            String opponentName = activeMatches.get(user.getUsername());
            template.convertAndSendToUser(opponentName, "/queue/match/update", progress);
        }
    }
}