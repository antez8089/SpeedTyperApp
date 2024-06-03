package com.pw.speedtyping.dtos;

import java.util.List;

public class NewWordsSetDto {
    private List<String> words;
    private String name;

    public NewWordsSetDto() {}
    public NewWordsSetDto(List<String> words, String wordsSetName) {
        this.words = words;
        this.name = wordsSetName;
    }

    public List<String> getWords() {
        return words;
    }

    public String getName() {
        return name;
    }
}
