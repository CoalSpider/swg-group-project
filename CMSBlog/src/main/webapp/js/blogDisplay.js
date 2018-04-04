/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
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
        url: "http://localhost:8080/CMSBlog/" + 'post/' + id,
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
        url: "http://localhost:8080/CMSBlog/" + 'post/' + id,
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
        url: "http://localhost:8080/CMSBlog/" + 'post/' + id,
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
        url: "http://localhost:8080/CMSBlog/" + 'categories',
        success: function (data) {
            $.each(data, function (index, data) {
//                $("#postByCategory").append("<a href='"+"http://localhost:8080/CMSBlog/"+"posts/categories/"+data.name+"'><p>"  + data.name + "</p></a><br>");
                $("#postByCategory").append("<p><button name=" + data.name + " class='categoryButton'>" + data.name + "</button></p><br>");
            });
            console.log($(".categoryButton"));
            $(".categoryButton").click(function () {
                console.log("clicked " + this.name + " name");
                displayPostByCategory(this.name);
            });
        },
        error: function () {
            console.log("somthing went worng - figure it out!");
        }
    });
}

function displayPostByCategory(name) {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/CMSBlog/posts/categories/" + name,
        success: function (data) {
            console.log("success");
            console.log(data);
            $("#postFeed").html("");
            $.each(data, function (index, data) {
                var title = data.title;
                var id = data.postId;
                var author = data.user.name;
                var summary = data.summary;
                var date = data.date;
                console.log(data.date);

                var preview = '<div class="postSelect" id="' + name + id + '">';
                preview += '<h3>' + title + '</h3><br>';
                preview += '<p>' + summary + '</p><br>';
                preview += '<p>' + author + " " + date + '</p></div><hr>';

                $("#postFeed").append(preview);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("failure");
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}

function addCategory(id) {
    $.ajax({
        type: 'POST',
        url: "http://localhost:8080/CMSBlog/" + 'categories/' + id,
        data: JSON.stringify({
            name: $("#categoryName").val()
        }),
        success: function (data) {

        },
        error: function () {

        }
    });
}

function deleteCategory(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/CMSBlog/categories/{id}',
        data: JSON.stringify({
            id: $("#categoryId").val()
        }),
        success: function (data) {

        },
        error: function () {

        }
    });
}

function updateCategory(id) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8080/CMSBlog/categories/{id}',
        data: JSON.stringify({
            postId: $("#postID").val(),
            name: $("#categoryName").val()
        }),
        success: function (data) {

        },
        error: function () {

        }
    });
}
