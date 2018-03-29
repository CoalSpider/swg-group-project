/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.dao.UserRepository;
import com.sg.cmsblog.model.User;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 *
 * @author Matt
 */
@Controller
public class UserController {

    @Autowired
    private UserRepository repUser;

    @GetMapping("/user{id}")
    @ResponseBody
    public User getUser(@PathVariable Integer id) {
        return repUser.findOne(id);
    }

    @GetMapping("users")
    @ResponseBody
    public List<User> getAllUsers() {
        return repUser.findAll();
    }

    @PostMapping("/user")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad create for " + user);
        }
        return repUser.save(user);
    }

    @PutMapping("/user{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateUser(@PathVariable Integer id, @Valid @RequestBody User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad update for " + user);
        }
        repUser.save(user);
    }

    @DeleteMapping("/user{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(Integer id) {
        repUser.delete(id);

    }

    private void validateUser(Integer id) {
        if (repUser.exists(id) == false) {
            throw new RuntimeException("no post with id " + id + "exists");
        }
    }
}
