/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var previewDiv = $("#postFeed");
var dateDiv = $("#postByDate");


$(document).ready(function () {
    getAllApproved();
    getAllCategories();
//    getAllDate();
    $("#searchForm").submit(function (e) {
        var text = $("#searchValue").val();
        if (text.length > 0) {
            searchByTag(text);
        }
        e.preventDefault();
    });
});

$("#header").click(function (event) {
    $(previewDiv).html("");
    getAllApproved();
});

function getAllPreviews() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts",
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



                previewDiv.append(preview);
                $("#" + id).click(function (event) {

                    $(previewDiv).html("");
                    load(id);
                });
            });
        },
        error: function () {
            alert("Failure");
        }
    });
}
;

function getAllApproved() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/post/approved",
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



                previewDiv.append(preview);
                $("#" + id).click(function (event) {

                    $(previewDiv).html("");
                    load(id);
                });
            });
        },
        error: function () {
            alert("Failure");
        }
    });
}
;
//
//function getAllDate() {
//
//    $ajax({
//        type: "GET",
//        url: "http://localhost:8080/CMSBlog/posts",
//        success: function (posts) {
//            $.each(posts, function (index, post) {
//                var title = post.title;
//                var id = post.postId;
//                var author = post.user.name;
//                var summary = post.summary;
//                var date = post.date;
//                var yearSelect = '<div><a>' + date.substring(0, 4) + '</a></div>';
//                console.log(yearSelect);
//
//                dateDiv.append(yearSelect);
//
//            });
//        },
//        error: function () {
//            alert("Failure");
//        }
//    });
//}
//;
function load(postId) {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/post/" + postId,
        success: function (data) {


            var title = data.title;
            var id = data.postId;
            var author = data.user.name;
            var summary = data.summary;
            var content = data.content;
            var date = data.date;


            var blogPost = '<div class=postSelect id ="post' + id + '">';
            blogPost += '<h1>' + title + '</h1>';
            blogPost += '<p>' + summary + '</p>';
            blogPost += '<p>' + author + ' ' + date + '</p><br>';
            blogPost += '<p>' + content + '</p>';
            blogPost += '<div id="navigator"> <a id="previous"> <- previous post  </a> <a id="next">  next post -></a></div>';

            previewDiv.append(blogPost);

            $("#next").click(function (event) {
                $(previewDiv).html("");
                load(id + 1);
            });

            $("#previous").click(function (event) {
                $(previewDiv).html("");
                load(id - 1);
            });

            // append tag buttons
            previewDiv.append(createTagButtons(data.tags));
            // hookup tag buttons
            $(".tag").click(function () {
                console.log("clicked " + name);
                searchByTag(this.name);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("body").html("<p>404 not found</p>");
        }
    });


}

function getAllCategories() {
    var categoriesDiv = $("#categorySection");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts",
        success: function (categories) {
            $.each(categories, function (index, category) {
                var name = category.name;
                var categoryId = category.categoryId;
                var categoryLink = '<a>' + name + '</a><br>';

                categoriesDiv.append(categoryLink);
            });
        },
        error: function () {
            alert("Failure");
        }
    });
}

// converts a list of tags to html buttons
function createTagButtons(tags) {
    var html = "";
    $.each(tags, function (i, tag) {
        // create a tag string
        html += "<button class='tag' id=" + tag.tagId + " value='" + tag.tagId + "' name=" + tag.name + ">" + tag.name + "</button>";
    });
    return html;
}

function searchByTag(tagName) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts/tags/" + tagName,
        success: function (posts) {
            previewDiv.html("");

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

                previewDiv.append(preview);
                $("#" + id).click(function (event) {
                    previewDiv.html("");
                    load(id);
                });
            });

        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("failure could not find any posts with tag");
//            console.log(tagName);
//            console.log(jqXHR);
//            console.log(textStatus);
//            console.log(errorThrown);

            previewDiv.html("<p>NO POSTS FOUND</p>");
        }
    });
}