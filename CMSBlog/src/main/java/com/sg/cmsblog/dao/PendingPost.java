/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sg.cmsblog.dao;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sg.cmsblog.model.Category;
import com.sg.cmsblog.model.Tag;
import com.sg.cmsblog.model.User;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.validation.constraints.Size;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Willie Suggs ZeroCool
 */
public interface PendingPost extends JpaRepository<PendingPost, Integer>{
    
  
}
