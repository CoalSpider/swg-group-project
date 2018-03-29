/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.dao.CategoryRepository;
import com.sg.cmsblog.dao.PostRepository;
import com.sg.cmsblog.dao.RoleRepository;
import com.sg.cmsblog.dao.TagRepository;
import com.sg.cmsblog.dao.UserRepository;
import com.sg.cmsblog.model.Post;
import com.sg.cmsblog.model.Role;
import com.sg.cmsblog.model.User;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
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
 * @author Ben Norman
 */
@Controller
public class RESTController {

    @Autowired
    private CategoryRepository categories;
    @Autowired
    private PostRepository posts;
    @Autowired
    private RoleRepository roles;
    @Autowired
    private TagRepository tags;
    @Autowired
    private UserRepository users;

    @GetMapping("/role{id}")
    @ResponseBody
    public Role getRole(@PathVariable Integer id) {
        return roles.findOne(id);
    }

    @GetMapping("/user{id}")
    @ResponseBody
    public User getUser(@PathVariable Integer id) {
        return users.findOne(id);
    }

    @GetMapping("/post{id}")
    @ResponseBody
    public Post getPost(@PathVariable Integer id) {
        this.validatePost(id);
        return posts.findOne(id);
    }

    @GetMapping("/posts")
    @ResponseBody
    public List<Post> getAllPosts() {
        return posts.findAll();
    }

    @PostMapping("/post")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Post createPost(@Valid @RequestBody Post post, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad create for " + post);
        }
        return posts.save(post);
    }

    @PutMapping("/post{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updatePost(@PathVariable Integer id, @Valid @RequestBody Post post, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad update for " + post);
        }
        posts.save(post);
    }

    @DeleteMapping("/post{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePost(@PathVariable Integer id) {
        posts.delete(id);
    }

    private void validatePost(Integer postId) {
        if (posts.exists(postId) == false) {
            throw new RuntimeException("not post with id " + postId + " exists");
        }
    }
}
