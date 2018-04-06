/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var submitId = $("#postSubmit").attr("value");
//var editId = $("#postEdit").attr("value");
//var deleteId = $("#postDelete").attr("value");

$(document).ready(function () {
    loadCategory();
//
//    $("#notApprovedBtn").click(function () {
////        getNotApprovedPost();
//    });
//
//    $("#postSubmit").click(function () {
//        loadPost();
//    });
//
//    $("#postEdit").click(function () {
//        updatePost(id);
//    });
//
//    $("#postDelete").click(function () {
//        deletePost(id);
//    });
});

function getNotApprovedPost() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/" + "/post/notapproved",
        success: function (posts) {
            $.each(posts, function (index, post) {
                var title = post.title;
                var id = post.postId;
                var author = post.user.name;
                var summary = post.summary;
                var date = post.date;
                console.log(post.date);

                var preview = '<div class="postSelect" id="' + id + '">';
                preview += '<h3>' + title + '</h3><br>';
                preview += '<p>' + summary + '</p><br>';
                preview += '<p>' + author + " " + date + '</p></div><hr>';

                $("#postFeedUser").append(preview);
                $("#" + id).click(function (event) {

                    $("#postFeedUser").html("");
                    load(id);
                });
            });
        },
        error: function (xhr) {
            printErrorMsg(xhr);
        }
    });
}

/*
 * Category ajax calls
 */

function loadCategory() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:8080/CMSBlog/categories",
        success: function (data) {
            $.each(data, function (index, data) {
//                $("#postByCategory").append("<a href='"+"http://localhost:8080/CMSBlog/"+"posts/categories/"+data.name+"'><p>"  + data.name + "</p></a><br>");
                $("#postByCategory").append("<p><button name=" + data.name + " class='btn btn-default categoryButton'>" + data.name + "</button></p><br>");
            });
//            console.log($(".categoryButton"));
            $(".categoryButton").click(function () {
//                console.log("clicked " + this.name + " name");
                displayPostByCategory(this.name);
            });
        },
        error: function (xhr) {
            printErrorMsg(xhr);
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
                $("#" + name + id).click(function (event) {

                    $("#postFeed").html("");
                    load(id);
                });
            });
        },
        error: function (xhr) {
            printErrorMsg(xhr);
        }
    });
}

function load(postId) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/post/" + postId,
        success: function (data) {
            printSuccessMsg(data, "load");
//            var title = data.title;
            var id = data.postId;
//            var author = data.user.name;
//            var summary = data.summary;
//            var content = data.content;
//            var date = data.date;

            var blogPost =
                '<div class=postSelect id ="post' + id + '">' +
                    '<h1>' + data.title + '</h1>' +
                    '<p>' + data.summary + '</p>' +
                    '<p>' + data.user.author + ' ' + data.date + '</p><br>' +
                    '<p>' + data.content + '</p>' +
                    '<div id="navigator">' +
                        '<a id="previous"> <- previous post  </a> <a id="next">  next post -></a>' +
                    '</div>' +
                '</div>';

            $("#postFeed").append(blogPost);

            $("#next").click(function (event) {
                $("#postFeed").html("");
                load(id + 1);
            });

            $("#previous").click(function (event) {
                $("#postFeed").html("");
                load(id - 1);
            });

            // append tag buttons
            $("#postFeed").append(createTagButtons(data.tags));
            // hookup tag buttons
            $(".tag").click(function () {
//                console.log("clicked " + name);
                searchByTag(this.name);
            });
        },
        error: function (xhr) {
            printErrorMsg(xhr, "load");
            $("body").html("<p>404 post not found</p>");
        }
    });


}
/*
 * Post ajax calls
 // */
//function loadPost(id) {
//    $("textarea").hide();
//    $.ajax({
//        type: 'GET',
//        url: "http://localhost:8080/CMSBlog/post/" + id,
//        success: function (data) {
//            $("body").innerhtml(data);
//        },
//        error: function () {
//
//        },
//    });
//}

//function updatePost(id) {
//    $("textarea").hide();
//    $.ajax({
//        type: 'PUT',
//        url: "http://localhost:8080/CMSBlog/post/" + id,
//        data: JSON.stringify({
//            userId: $("#usrId").val(),
//            postId: $("#postId").val(),
//            date: $("#date").val(),
//            summary: $("#summary").val(),
//            content: $("#content").val(),
//        }),
//        headers: {
//            'Accept': 'application/json',
//            'Content-Type': 'application/json'
//        },
//        dataType: 'json',
//        success: function (data) {
//            $("#body").innerhtml(data);
//        },
//        error: function () {
//
//        }
//    });
//}

//function deletePost(id) {
//    $("textarea").hide();
//    $.ajax({
//        type: 'DELETE',
//        url: "http://localhost:8080/CMSBlog/post/" + id,
//        data: JSON.stringify({
//            postId: $("#postID").val()
//        }),
//        success: function (data) {
//        },
//        error: function () {
//            //some error
//        },
//    });
//}
//function addCategory(id) {
//    $.ajax({
//        type: 'POST',
//        url: "http://localhost:8080/CMSBlog/" + 'categories/' + id,
//        data: JSON.stringify({
//            name: $("#categoryName").val()
//        }),
//        success: function (data) {
//
//        },
//        error: function () {
//
//        }
//    });
//}

//function deleteCategory(id) {
//    $.ajax({
//        type: 'POST',
//        url: 'http://localhost:8080/CMSBlog/categories/{id}',
//        data: JSON.stringify({
//            id: $("#categoryId").val()
//        }),
//        success: function (data) {
//
//        },
//        error: function () {
//
//        }
//    });
//}

//function updateCategory(id) {
//    $.ajax({
//        type: 'POST',
//        url: 'http://localhost:8080/CMSBlog/categories/{id}',
//        data: JSON.stringify({
//            postId: $("#postID").val(),
//            name: $("#categoryName").val()
//        }),
//        success: function (data) {
//
//        },
//        error: function () {
//
//        }
//    });
//}
