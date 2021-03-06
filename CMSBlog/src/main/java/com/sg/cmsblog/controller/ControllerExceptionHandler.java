/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.exceptions.AccountExistsException;
import com.sg.cmsblog.exceptions.ErrorMessage;
import com.sg.cmsblog.exceptions.NotFoundException;
import com.sg.cmsblog.exceptions.UpdateIntegrityException;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author Ben Norman
 */
@ControllerAdvice
public class ControllerExceptionHandler {

    /**
     * @param e the exception to process
     * @return the error message of the exception argument
     */
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorMessage proccessNotFoundException(NotFoundException e) {
        return new ErrorMessage(e.getMessage());
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public ErrorMessage processMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        BindingResult result = e.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        StringBuilder messageBuilder = new StringBuilder();
        messageBuilder.append("Your submission has the following errors: ");

        for (FieldError currentError : fieldErrors) {
            messageBuilder.append("[");
            messageBuilder.append(currentError.getField());
            messageBuilder.append(":");
            messageBuilder.append(currentError.getDefaultMessage());
            messageBuilder.append("] ");
        }

        return new ErrorMessage(messageBuilder.toString());
    }

    @ExceptionHandler(UpdateIntegrityException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public ErrorMessage processUpdateIntegrityException(UpdateIntegrityException e) {
        return new ErrorMessage(e.getMessage());
    }
    
    @ExceptionHandler(AccountExistsException.class)
    @ResponseStatus(HttpStatus.UNPROCESSABLE_ENTITY)
    @ResponseBody
    public ErrorMessage processAccountExistsException(AccountExistsException e){
        return new ErrorMessage(e.getMessage());
    }
}
