/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.dao.CategoryRepository;
import com.sg.cmsblog.dao.PostRepository;
import com.sg.cmsblog.dao.TagRepository;
import com.sg.cmsblog.model.Post;
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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Ben Norman
 */
@RestController
public class PostController {

    @Autowired
    private PostRepository posts;
    @Autowired
    private TagRepository tags;

    @Autowired
    private CategoryRepository categories;

    @GetMapping("/post/{id}")
    public Post getPost(@PathVariable Integer id) {
        return posts.findOne(id);
    }

    @GetMapping("/posts")
    public List<Post> getAllPosts() {
        return posts.findAll();
    }

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@Valid @RequestBody Post post, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad create for " + post);
        }
        post.setApproved(false);
        
        return posts.save(post);
    }

    @PutMapping("/post/{id}")
    public Post updatePost(@PathVariable Integer id, @Valid @RequestBody Post post, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad update for " + post);
        }
        return posts.save(post);
    }

    @DeleteMapping("/post/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Integer id) {
        posts.delete(id);
    }

    // TODO: fix endpoint ajax
    @GetMapping("/posts/categories/{name}")
    public List<Post> getPostByCategoryId(@PathVariable String name) {
        return posts.findByCategoriesContaining(categories.findByName(name));
    }

    @GetMapping("/posts/tags/{tagName}")
    public List<Post> getPostsWithTag(@PathVariable String tagName) {
        return posts.findByTagsContaining(tags.findByName(tagName));
    }

    @GetMapping("/post/approved")
    public List<Post> getPostThatHaveBeenApproved() {
        return posts.findByApproved(true);
    }
    
    @GetMapping("/post/notapproved")
    public List<Post> getPostThatHaveNotBeenApproved() {
        return posts.findByApproved(false);
    }
}
