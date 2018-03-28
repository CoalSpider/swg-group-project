/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.dao;

import com.sg.cmsblog.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Matt
 */
public interface TagRepository extends JpaRepository<Tag, Integer> {

}
