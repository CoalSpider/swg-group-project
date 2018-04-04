/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.dao;

import com.sg.cmsblog.model.PendingPost;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Willie Suggs ZeroCool
 */
public interface PendingPostRepository extends JpaRepository<PendingPost, Integer> {

}
