package com.pw.speedtyping.controllers;

import com.pw.speedtyping.database.models.User;
import com.pw.speedtyping.dtos.WordDto;
import com.pw.speedtyping.dtos.WordsSetDto;
import com.pw.speedtyping.dtos.NewWordsSetDto;
import com.pw.speedtyping.service.WordsApiManager;
import com.pw.speedtyping.service.WordsService;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api")
public class WordsController {

    private final WordsService wordsService;

    public WordsController(WordsService wordsService) {
        this.wordsService = wordsService;
    }

    @GetMapping("/words")
    public String getWords(@RequestParam(name = "num", required = false, defaultValue = "1") String number_of_words,
                           @RequestParam(name = "len", required = false, defaultValue = "7") String words_length) {
        return WordsApiManager.getWords(Integer.parseInt(number_of_words), Integer.parseInt(words_length));
    }


    @PostMapping("/user/new-words-set")
    public boolean newWordsSet(@AuthenticationPrincipal User user, @RequestBody NewWordsSetDto newWordsSetDto) {
        return wordsService.newSaveWordsSet(user, newWordsSetDto);
    }

    @GetMapping("/user/new-get-all-sets")
    public List<NewWordsSetDto> getAllSets(@AuthenticationPrincipal User user) {
        return wordsService.getAllSets(user);
    }


    @PostMapping("/user/save-words-set")
    public boolean saveWordsSet(@AuthenticationPrincipal User user, @RequestBody WordsSetDto wordsSetDto) {
        return wordsService.saveWordsSet(user, wordsSetDto);
    }

    @GetMapping("/user/get-words-sets")
    public List<WordsSetDto> getWordsSets(@AuthenticationPrincipal User user) {
        return wordsService.getWordsSets(user);
    }

    @PostMapping("/user/save-words")
    public boolean saveWords(@AuthenticationPrincipal User user, @RequestBody WordDto wordDto) {
        return wordsService.saveWords(user, wordDto);
    }

    @GetMapping("/user/get-words")
    public List<String> getWords(@AuthenticationPrincipal User user, @RequestBody WordsSetDto wordsSetDto) {
        return wordsService.getWords(user, wordsSetDto);
    }

    @PostMapping("/user/delete-words-set")
    public boolean deleteWordsSet(@AuthenticationPrincipal User user, @RequestBody WordsSetDto wordsSetDto) {
        return wordsService.deleteWordsSet(user, wordsSetDto);
    }
}
