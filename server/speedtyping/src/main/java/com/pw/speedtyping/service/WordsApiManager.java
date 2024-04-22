package com.pw.speedtyping.service;


import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class WordsApiManager {

    public static String getWords(Integer number_of_words, Integer words_length) {
        URI uri = null;
        HttpResponse<String> response = null;
        HttpClient client = HttpClient.newHttpClient();
        try {
            uri = new URI(String.format("https://random-word-api.herokuapp.com/word?number=%s&length=%s", number_of_words, words_length));
        } catch (URISyntaxException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        HttpRequest request = HttpRequest.newBuilder(uri).GET().build();

        try {
            response = client.send(request, HttpResponse.BodyHandlers.ofString());
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
        return response.body();
    }
}
