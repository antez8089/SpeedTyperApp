package com.pw.speedtyping.dtos;

import java.util.List;

public class EditWordsSetDto {
    private List<String> words;
    private String name;
    private List<String> oldWords;
    private String oldName;

    public EditWordsSetDto() {}
    public EditWordsSetDto(List<String> oldWords, String oldWordsSetName, List<String> words, String wordsSetName) {
        this.oldWords = oldWords;
        this.oldName = oldWordsSetName;
        this.words = words;
        this.name = wordsSetName;
    }

    public List<String> getWords() {
        return words;
    }

    public String getName() {
        return name;
    }

    public List<String> getOldWords() {return oldWords;}

    public String getOldName() {return oldName;}
}
