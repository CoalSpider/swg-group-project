/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function runSearch(searchtag) {
    
    $.ajax({
        type:"GET",
        url: "http://localhost:8080/search" + searchTag,
        
    })
}

