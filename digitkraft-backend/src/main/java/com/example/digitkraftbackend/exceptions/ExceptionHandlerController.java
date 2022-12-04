package com.example.digitkraftbackend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
@Slf4j
public class ExceptionHandlerController {

    @ExceptionHandler(BlankUsernameException.class)
    public ResponseEntity<String> handleBlankUsernameException(BlankUsernameException blankUsernameException) {
        log.error(blankUsernameException.toString());
        return new ResponseEntity<>(blankUsernameException.toString(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception exception) {
        log.error("Exception occured during processing request: {}", exception.getMessage());
        return new ResponseEntity<>("Exception occured during processing request: " + exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
