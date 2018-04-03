/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const basePath = "http://localhost:8080/CMSBlog/";
var submitId = $("#postSubmit").attr("value");
var editId = $("#postEdit").attr("value");
var deleteId = $("#postDelete").attr("value");

$(document).ready(function () {
    loadCategory();
    
    $("#postSubmit").click(function () {
        loadPost();
    });

    $("#postEdit").click(function () {
        updatePost(id);
    });

    $("#postDelete").click(function () {
        deletePost(id);
    });
});


/*
 * Post ajax calls
// */
function loadPost(id) {
    $("textarea").hide();
    $.ajax({
        type: 'GET',
        url: basePath + 'post/' + id,
        success: function (data) {
            $("body").innerhtml(data);
        },
        error: function () {

        },
    });
}

function updatePost(id) {
    $("textarea").hide();
    $.ajax({
        type: 'PUT',
        url: basePath + 'post/' + id,
        data: JSON.stringify({
            userId: $("#usrId").val(),
            postId: $("#postId").val(),
            date: $("#date").val(),
            summary: $("#summary").val(),
            content: $("#content").val(),
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        dataType: 'json',
        success: function (data) {
            $("#body").innerhtml(data);
        },
        error: function () {

        }
    });
}

function deletePost(id) {
    $("textarea").hide();
    $.ajax({
        type: 'DELETE',
        url: basePath + 'post/' + id,
        data: JSON.stringify({
            postId: $("#postID").val()
        }),
        success: function (data) {
        },
        error: function () {
            //some error
        },
    });
}

/*
 * Category ajax calls
 */

//working method
function loadCategory() {
    $.ajax({
        type: 'GET',
        url: basePath + 'categories',
        success: function(data) {
            $.each(data, function(index, data) {
                $("#postByCategory").append("<a href='#'><p>"  + data.name + "</p></a><br>");
            });
        },
        error: function() {
            console.log("somthing went worng - figure it out!");
        }
    });
}

function displayPostByCategory(name) {
    $.ajax({
        type: 'GET',
        url: basePath + 'categories' + name,
        data: JSON.stringify({
            name: name
        }),
        success: function(data) {
            $.each(data, function(index, data) {
                var title = data.title;
                var id = data.postId;
                var author = data.user.name;
                var summary = data.summary;
                var date = data.date;
                console.log(data.date);

                var preview = '<div class="postSelect" id="' + id + '">';
                preview += '<h3>' + title + '</h3><br>';
                preview += '<p>' + summary + '</p><br>';
                preview += '<p>' + author + " " + date + '</p></div><hr>';
                
                $("#previewDiv").append(preview);
            });
        },
    });
}

function addCategory(id) {
    $.ajax({
        type:'POST',
        url: basePath + 'categories/' + id,
        data: JSON.stringify({
            name: $("#categoryName").val()
        }),
        success: function(data) {
            
        },
        error: function() {
            
        }
    });
}

function deleteCategory(id) {
    $.ajax({
        type:'POST',
        url: 'http://localhost:8080/CMSBlog/categories/{id}',
        data: JSON.stringify({
            id: $("#categoryId").val()
        }),
        success: function(data) {
            
        },
        error: function() {
            
        }
    });
}

function updateCategory(id) {
    $.ajax({
        type:'POST',
        url: 'http://localhost:8080/CMSBlog/categories/{id}',
        data: JSON.stringify({
            postId: $("#postID").val(),
            name: $("#categoryName").val()
        }),
        success: function(data) {
            
        },
        error: function() {
            
        }
    });
}
