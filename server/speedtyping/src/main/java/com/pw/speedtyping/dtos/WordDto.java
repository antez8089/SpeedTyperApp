package com.pw.speedtyping.dtos;

import java.util.List;

public class WordDto {
    private List<String> words;
    private String wordsSetName;

    public WordDto() {}
    public WordDto(List<String> words, String wordsSetName) {
        this.words = words;
        this.wordsSetName = wordsSetName;
    }
    public List<String> getWords() {return words;}
    public String getWordsSetName() {return wordsSetName;}
}
