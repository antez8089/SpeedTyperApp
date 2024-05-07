package com.pw.speedtyping.database.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "words")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String word;

    @NotNull
    @ManyToOne
    @JoinColumn(name="words_set_id")
    private WordsSet wordsSet;

    public Word() {}

    public Word(String word, WordsSet wordsSet) {
        this.word = word;
        this.wordsSet = wordsSet;
    }

    public String getWord() {
        return word;
    }
}
