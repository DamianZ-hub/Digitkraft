package com.example.digitkraftbackend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.io.IOException;
import java.nio.file.FileAlreadyExistsException;

@ControllerAdvice
@Slf4j
public class ExceptionHandlerController {

    @ExceptionHandler(BlankUsernameException.class)
    public ResponseEntity<String> handleBlankUsernameException(BlankUsernameException blankUsernameException) {
        log.error(blankUsernameException.toString());
        return new ResponseEntity<>(blankUsernameException.toString(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(FileAlreadyExistsException.class)
    public ResponseEntity<String> handleFileAlreadyExistsException(FileAlreadyExistsException fileAlreadyExistsException) {
        log.error(fileAlreadyExistsException.toString());
        return new ResponseEntity<>(fileAlreadyExistsException.toString(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<String> handleProductNotFoundException(CategoryNotFoundException categoryNotFoundException) {
        log.error(categoryNotFoundException.toString());
        return new ResponseEntity<>(categoryNotFoundException.toString(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IOException.class)
    public ResponseEntity<String> handleIOException(IOException exception) {
        log.error("IOException occured during processing request: {}", exception.getMessage());
        return new ResponseEntity<>("IOException occured during processing request: " + exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception exception) {
        log.error("Exception occured during processing request: {}", exception.getMessage());
        return new ResponseEntity<>("Exception occured during processing request: " + exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

}
