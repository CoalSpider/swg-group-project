/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.exceptions.NotFoundException;
import com.sg.cmsblog.dao.TagRepository;
import com.sg.cmsblog.model.Tag;
import java.util.List;
//import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.validation.BindingResult;
//import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Willie Suggs ZeroCool
 */
@RestController
public class TagController {

    @Autowired
    private TagRepository tags;

// tags are not retrieved singly    
//    @GetMapping("/tag/{id}")
//    public Tag getTag(@PathVariable Integer id) throws NotFoundException{
//        if(tags.exists(id)==false){
//            throw new NotFoundException("could not find tag");
//        }
//        return tags.findOne(id);
//    }

    @GetMapping("/tags")
    public List<Tag> getAllTags() {
        return tags.findAll();
    }
    
    @PutMapping("/tags")
    public List<Tag> createTagsThatDontExist(@RequestBody List<Tag> tagList) {
        for(Tag t : tagList){
            // if the tag doesnt yet exist create it
            if(tags.existsByName(t.getName())==false){
                tags.save(t);
            }
        }
        return tags.findAll();
    }

// tags are not currently created one at a time but in batches
//    @PostMapping("/tag")
//    @ResponseStatus(HttpStatus.CREATED)
//    public Tag createTag(@Valid @RequestBody Tag tag, BindingResult bindingResult){
//        if (bindingResult.hasErrors()) {
//            throw new RuntimeException("bad create for " + tag);
//        }
//        return tags.save(tag);
//    }

// tags cannot be edited    
//    @PutMapping("/tag/{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void updateTag(@PathVariable Integer id, @Valid @RequestBody Tag tag, BindingResult bindingResult) {
//        if (bindingResult.hasErrors()) {
//            throw new RuntimeException("bad update for " + tag);
//        }
//        tags.save(tag);
//    }

// tags cannot be deleted
//    @DeleteMapping("/tag/{id}")
//    @ResponseStatus(HttpStatus.NO_CONTENT)
//    public void deleteTag(@PathVariable Integer id) throws NotFoundException {
//        if(tags.exists(id)==false){
//            throw new NotFoundException("could not find tag");
//        }
//        tags.delete(id);
//    }
}
