package com.pw.speedtyping.database.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table(name = "wordsset")
public class WordsSet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String wordSetName;

    @NotNull
    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "wordsSet")
    private List<Word> words;


    public WordsSet() {}

    public WordsSet(String wordSetName, User user) {
        this.wordSetName = wordSetName;
        this.user = user;
    }
}
