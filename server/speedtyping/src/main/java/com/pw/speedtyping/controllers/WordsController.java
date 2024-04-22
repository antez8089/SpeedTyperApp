package com.pw.speedtyping.controllers;

import com.pw.speedtyping.service.WordsApiManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class WordsController {

    @GetMapping("/words")
    public String getWords(@RequestParam(name = "num", required = false, defaultValue = "1") String number_of_words,
                           @RequestParam(name = "len", required = false, defaultValue = "7") String words_length) {
        return WordsApiManager.getWords(Integer.parseInt(number_of_words), Integer.parseInt(words_length));
    }
}
