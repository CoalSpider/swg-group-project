/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 *
 * @author Ben Norman
 */
    
public class PWEnc {

    public static void main(String[] args) {
        String clearTxtPw = "password";
        // BCrypt
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPw = encoder.encode(clearTxtPw);
        System.out.println(hashedPw);
        System.out.println("$2a$10$fSoLLwBthDUjLjD58b1AU.qCgGYtq/WX/5hjJHkYIv5EArTnsoRUm");
        System.out.println("$2a$10$DH/hmF4yOLIR9cxnEzO5yus75EPOkCezs0O7g8ybPl211/0VcwcRS");
    }
}
