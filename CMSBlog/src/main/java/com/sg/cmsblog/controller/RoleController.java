/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.dao.RoleRepository;
import com.sg.cmsblog.model.Role;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
 * @author Willie Suggs ZeroCool
 */
public class RoleController {

    @Autowired
    private RoleRepository roles;

    @GetMapping("/role{id}")
    @ResponseBody
    public Role getRole(@PathVariable Integer id) {
        return roles.getOne(id);
    }

    @GetMapping("/roles")
    @ResponseBody
    public List<Role> getAllRoles() {
        return roles.findAll();
    }

    @PostMapping("/role")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Role createRole(@Valid @RequestBody Role role, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad create for " + role);
        }
        return roles.save(role);
    }

    @PutMapping("/role{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateRole(@PathVariable Integer id, @Valid @RequestBody Role role, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad update for " + role);
        }
        roles.save(role);
    }

    @DeleteMapping("/role{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteRole(@PathVariable Integer id) {
        roles.delete(id);
    }

    public void validateRole(Integer id) {
        if (roles.exists(id) == false) {
            throw new RuntimeException();
        }
    }
}
