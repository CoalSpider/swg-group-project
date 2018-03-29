/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.controller;

import com.sg.cmsblog.dao.CategoryRepository;
import com.sg.cmsblog.model.Category;
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
 * @author Matt
 */
public class CategoryController {

    @Autowired
    private CategoryRepository repCategory;

    @GetMapping("/category{id}")
    @ResponseBody
    public Category getCategory(@PathVariable Integer id) {
        return repCategory.findOne(id);
    }

    @GetMapping("/categories")
    @ResponseBody
    public List<Category> getAllCategories() {
        return repCategory.findAll();
    }

    @PostMapping("/category")
    @ResponseBody
    @ResponseStatus(HttpStatus.CREATED)
    public Category createCategory(@Valid @RequestBody Category category, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad create for " + category);
        }
        return repCategory.save(category);
    }

    @PutMapping("/category{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void updateCategory(@PathVariable Integer id, @Valid @RequestBody Category category, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            throw new RuntimeException("bad update for " + category);
        }
        repCategory.save(category);
    }

    @DeleteMapping("/category{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteCategory(Integer id) {
        repCategory.delete(id);
    }

    public void validateCategory(Integer categoryId) {
        if (repCategory.exists(categoryId) == false) {
            throw new RuntimeException("not post with id " + categoryId + " exists");
        }
    }
}
