package com.pw.speedtyping.exceptions;

public class InvalidJwtTokenException extends Exception {

    public InvalidJwtTokenException() {
        super();
    }

    public InvalidJwtTokenException(String message) {
        super(message);
    }
}
