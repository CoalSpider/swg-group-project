/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.dao.TagRepository;
import com.sg.cmsblog.model.Tag;
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
 * @author Willie Suggs ZeroCool
 */
@Controller
public class TagController {

    @Autowired
    private TagRepository tags;

    @GetMapping("/tag{id}")
    @ResponseBody
    public Tag getTag(@PathVariable Integer id) {
        // TODO: should we handle id doesnt exist here?
        return tags.findOne(id);
    }

    @GetMapping("/tags")
    @ResponseBody
    public List<Tag> getAllTags() {
        return tags.findAll();
    }

    @PostMapping("/tag")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Tag createTag(@Valid @RequestBody Tag tag, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad create for " + tag);
        }
        return tags.save(tag);
    }

    @PutMapping("/tag{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateTag(@PathVariable Integer id, @Valid @RequestBody Tag tag, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad update for " + tag);
        }
        tags.save(tag);
    }

    @DeleteMapping("/tag{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTag(@PathVariable Integer id) {
        tags.delete(id);
    }

    public void validateRole(Integer id) {
        if (tags.exists(id) == false) {
            throw new RuntimeException();
        }
    }
}
