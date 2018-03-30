/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {
   var submitId = $("#postSubmit").attr("value");
   var editId = $("#postEdit").attr("value");
   
   $("#postSubmit").click(function() {
       loadPost();
   });

   $("#postEdit").click(function() {
       updatePost(id);
   });
});

function loadPost(id) {
    $("textarea").hide();
    $.ajax({
        type: 'GET',
        url: "post/" + id,
        success: function(data) {
            $("body").innerhtml(data);
        },
        error: function() {

        },
    });
}    

function updatePost(id) {
    $("textarea").hide();
    $.ajax({
        type: 'PUT',
        url: "post/" + id,
        data: JSON.stringify({
           userId: $("#usrId").val(),
           postId: $("#postId").val(),
           date: $("#date").val(),
           summary: $("#summary").val(),
           content: $("content").val(),
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function(data) {
            $("#body").innerhtml(data);
        },
        error: function() {

        }
    });
}

function deletePost(id) {
    $("textarea").hide();
    $.ajax({
        type: 'DELETE',
        url: "post/" + id,
        data: JSON.stringify({
            postId: $("#postID").val()
        }),
        success: function(data) {
            $("body").innerhtml(data);
        },
        error: function() {

        },
    });
}


