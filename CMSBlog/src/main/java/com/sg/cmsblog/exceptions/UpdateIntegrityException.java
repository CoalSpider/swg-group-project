/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.exceptions;

/**
 *
 * @author Ben Norman
 */
public class UpdateIntegrityException extends Exception{

    public UpdateIntegrityException() {
    }

    public UpdateIntegrityException(String message) {
        super(message);
    }

    public UpdateIntegrityException(String message, Throwable cause) {
        super(message, cause);
    }

    public UpdateIntegrityException(Throwable cause) {
        super(cause);
    }

    public UpdateIntegrityException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
    
}
