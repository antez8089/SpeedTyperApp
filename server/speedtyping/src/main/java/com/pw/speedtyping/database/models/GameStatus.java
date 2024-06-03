package com.pw.speedtyping.database.models;

public class GameStatus {
    private String player;
    private int wpm;

    public String getPlayer() {
        return player;
    }

    public void setPlayer(String player) {
        this.player = player;
    }

    public int getWpm() {
        return wpm;
    }

    public void setWpm(int wpm) {
        this.wpm = wpm;
    }
}