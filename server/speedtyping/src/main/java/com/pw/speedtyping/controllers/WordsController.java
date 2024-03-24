package com.pw.speedtyping.controllers;

import com.pw.speedtyping.service.WordsApiManager;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class WordsController {

    @GetMapping("/words")
    public String getWords(@RequestParam(name = "num", required = false, defaultValue = "1") String number_of_words) {
        return WordsApiManager.getWords(Integer.parseInt(number_of_words));
    }
}
