package com.pw.speedtyping.service;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.database.models.Word;
import com.pw.speedtyping.database.models.WordsSet;
import com.pw.speedtyping.database.repository.WordRepository;
import com.pw.speedtyping.database.repository.WordsSetRepository;
import com.pw.speedtyping.dtos.EditWordsSetDto;
import com.pw.speedtyping.dtos.WordDto;
import com.pw.speedtyping.dtos.WordsSetDto;
import com.pw.speedtyping.dtos.NewWordsSetDto;
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

    public boolean newSaveWordsSet(User user, NewWordsSetDto wordsSetDto) {
        String newWordSetName = wordsSetDto.getName();
        System.out.println("NewWordsSetDto: " + wordsSetDto);
        System.out.println("newWordSetName: " + newWordSetName);
        if (wordsSetRepository.findByUserAndWordSetName(user, newWordSetName) != null) {
            return false;
        }
        WordsSet wordsSet = new WordsSet(newWordSetName, user);
        try {
            wordsSetRepository.save(wordsSet);
            for (String wordToSave : wordsSetDto.getWords()) {
                Word word = new Word(wordToSave, wordsSet);
                wordRepository.save(word);
            }
            return true;
        } catch (Exception e) {
            System.err.println(e.getMessage());
            return false;
        }
    }

    public List<NewWordsSetDto> getAllSets(User user) {
        List<WordsSet> wordsSets = wordsSetRepository.findByUser(user);
        List<NewWordsSetDto> newWordsSetDtos = new ArrayList<>();
        for (WordsSet wordsSet: wordsSets) {
            List<Word> words = wordRepository.findByWordsSet(wordsSetRepository.findByUserAndWordSetName(user, wordsSet.getWordSetName()));
            List<String> wordsStrings = new ArrayList<>();
            for (Word word: words) {
                wordsStrings.add(word.getWord());
            }
            newWordsSetDtos.add(new NewWordsSetDto(wordsStrings, wordsSet.getWordSetName()));
        }
        return newWordsSetDtos;
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

    public boolean deleteWordsSet(User user, WordsSetDto wordsSetDto) {
        try {
            wordsSetRepository.delete(wordsSetRepository.findByUserAndWordSetName(user, wordsSetDto.getName()));
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean editWordsSet(User user, EditWordsSetDto editWordsSetDto) {
        if (wordsSetRepository.findByUserAndWordSetName(user, editWordsSetDto.getName()) != null && !editWordsSetDto.getName().equals(editWordsSetDto.getOldName())) {
            return false;
        }

        try {
            WordsSet oldWordsSet = wordsSetRepository.findByUserAndWordSetName(user, editWordsSetDto.getOldName());
            wordRepository.deleteAll(wordRepository.findByWordsSet(oldWordsSet));
            oldWordsSet.setWordSetName(editWordsSetDto.getName());
            wordsSetRepository.save(oldWordsSet);
            for (String wordToSave: editWordsSetDto.getWords()) {
                Word word = new Word(wordToSave, oldWordsSet);
                wordRepository.save(word);
            }
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
