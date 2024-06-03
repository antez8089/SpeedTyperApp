package com.pw.speedtyping.dtos;

public class RankingDto {

    private int limit;

    public RankingDto(int limit) {
        this.limit = limit;
    }

    public RankingDto() {}

    public int getLimit() {
        return limit;
    }

    public void setLimit(int newLimit) {
        limit = newLimit;
    }
}
