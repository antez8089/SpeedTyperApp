package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.models.Word;
import com.pw.speedtyping.database.models.WordsSet;
import com.pw.speedtyping.database.repository.WordRepository;
import com.pw.speedtyping.database.repository.WordsSetRepository;
import com.pw.speedtyping.dtos.WordDto;
import com.pw.speedtyping.dtos.WordsSetDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WordsService {

    private final WordsSetRepository wordsSetRepository;
    private final WordRepository wordRepository;

    public WordsService(WordsSetRepository wordsSetRepository, WordRepository wordRepository) {
        this.wordsSetRepository = wordsSetRepository;
        this.wordRepository = wordRepository;
    }

    public boolean saveWordsSet(User user, WordsSetDto wordsSetDto) {
        String newWordSetName = wordsSetDto.getName();
        if (wordsSetRepository.findByUserAndWordSetName(user, newWordSetName) != null) {
            return false;
        }
        WordsSet wordsSet = new WordsSet(newWordSetName, user);
        try {
            wordsSetRepository.save(wordsSet);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean saveWords(User user, WordDto wordDto) {
        try {
            WordsSet wordsSet = wordsSetRepository.findByUserAndWordSetName(user, wordDto.getWordsSetName());
            for (String wordToSave: wordDto.getWords()) {
                Word word = new Word(wordToSave, wordsSet);
                wordRepository.save(word);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public List<WordsSetDto> getWordsSets(User user) {
        List<WordsSet> wordsSets = wordsSetRepository.findByUser(user);
        List<WordsSetDto> wordsSetDtos = new ArrayList<>();
        for (WordsSet wordsSet: wordsSets) {
            wordsSetDtos.add(new WordsSetDto(wordsSet.getWordSetName()));
        }
        return wordsSetDtos;
    }

    public List<String> getWords(User user, WordsSetDto wordsSetDto) {
        List<Word> words = wordRepository.findByWordsSet(wordsSetRepository.findByUserAndWordSetName(user, wordsSetDto.getName()));
        List<String> wordsStrings = new ArrayList<>();
        for (Word word: words) {
            wordsStrings.add(word.getWord());
        }
        return wordsStrings;
    }
}
