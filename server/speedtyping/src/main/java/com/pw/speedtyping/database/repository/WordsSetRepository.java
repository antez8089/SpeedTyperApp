package com.pw.speedtyping.database.repository;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.models.WordsSet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordsSetRepository extends JpaRepository<WordsSet, Long> {
    List<WordsSet> findByUser(User user);
    WordsSet findByUserAndWordSetName(User user, String wordSetName);
}
