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
    hookSearchForm();
    loadNavbarTabs();
});

$("#header").click(function (event) {
    previewDiv.html("");
    getAllApproved();
});

function hookSearchForm() {
    $("#searchForm").submit(function (e) {
        var text = $("#searchValue").val();
        if (text.length > 0) {
            searchByTag(text);
        }
        e.preventDefault();
    });
}

function loadNavbarTabs() {
    $("#navbar").append("<li role='presentation' class=active role='presentation'><a href='http://localhost:8080/CMSBlog/'>Home</a></li>");
    var staticPages = $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts/staticPages",
        success: function (posts) {
            printSuccessMsg(posts, "loadNavbarTabs");
            $.each(posts, function (index, post) {
                $("#navbar").append("<li role='presentation' id='postTab" + post.postId + "' class='tab'><a>" + post.title + "</a></li>");
            });
            $(".tab").click(function () {
                this.className += " active";
                console.log(this.id);
                previewDiv.html("");
                load(this.id.replace("postTab", ""));
            });
        },
        error: function (xhr) {
            printErrorMsg(xhr, "loadNavbarTabs");
        }
    });
}

function postToPreviewHtml(post) {
    return '<div class="postSelect" id="' + post.postId + '">' +
            '<h3>' + post.title + '</h3><br>' +
            '<p>' + post.summary + '</p><br>' +
            '<p>' + post.user.name + " " + post.date + '</p>' +
            '</div>' +
            '<hr>';
}

function setPreviewDiv(posts) {
    previewDiv.html("");
    $.each(posts, function (index, post) {
        previewDiv.append(postToPreviewHtml(post));
    });
    $(".postSelect").click(function () {
        previewDiv.html("");
        load(this.id);
    });
}

function printSuccessMsg(data, methodName) {
    console.log('SUCCESS ' + methodName);
    console.log(data);
}

function printErrorMsg(xhr, methodName) {
    console.log('ERROR ' + methodName + ' ' + xhr.status);
    console.log(xhr);
}

function getAllPreviews() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts",
        success: function (posts) {
            printSuccessMsg(posts, "getAllPreviews");
//            $.each(posts, function (index, post) {
//                var title = post.title;
//                var id = post.postId;
//                var author = post.user.name;
//                var summary = post.summary;
//                var date = post.date;
//                console.log(post.date);
//
//                var preview = '<div class="postSelect" id="' + id + '">';
//                preview += '<h3>' + title + '</h3><br>';
//                preview += '<p>' + summary + '</p><br>';
//                preview += '<p>' + author + " " + date + '</p></div><hr>';
//
//                previewDiv.append(preview);
//                
//                $("#" + id).click(function (event) {
//                    previewDiv.html("");
//                    load(id);
//                });
//            });
            setPreviewDiv(posts);
        },
        error: function (xhr) {
            printErrorMsg(xhr, "getAllPreviews");
        }
    });
}
;

function getAllApproved() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/post/approved",
        success: function (posts) {
            printSuccessMsg(posts, "getAllApproved");
//            $.each(posts, function (index, post) {
//                var title = post.title;
//                var id = post.postId;
//                var author = post.user.name;
//                var summary = post.summary;
//                var date = post.date;
//                console.log(post.date);
//
//                var preview = '<div class="postSelect" id="' + id + '">';
//                preview += '<h3>' + title + '</h3><br>';
//                preview += '<p>' + summary + '</p><br>';
//                preview += '<p>' + author + " " + date + '</p></div><hr>';
//
//                previewDiv.append(preview);
//                $("#" + id).click(function (event) {
//
//                    $(previewDiv).html("");
//                    load(id);
//                });
//            });
            setPreviewDiv(posts);
        },
        error: function (xhr) {
            printErrorMsg(xhr, "getAllApproved");
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

            previewDiv.append(blogPost);

            $("#next").click(function (event) {
                previewDiv.html("");
                load(id + 1);
            });

            $("#previous").click(function (event) {
                previewDiv.html("");
                load(id - 1);
            });

            // append tag buttons
            previewDiv.append(createTagButtons(data.tags));
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

function getAllCategories() {
    var categoriesDiv = $("#categorySection");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts",
        success: function (categories) {
            printSuccessMsg(categories, "getAllCategories");
            $.each(categories, function (index, category) {
                var name = category.name;
//                var categoryId = category.categoryId;
                var categoryLink = '<a>' + name + '</a><br>';

                categoriesDiv.append(categoryLink);
            });
        },
        error: function (xhr) {
            printErrorMsg(xhr, "getAllCategories");
        }
    });
}

// converts a list of tags to html buttons
function createTagButtons(tags) {
    var html = "";
    $.each(tags, function (i, tag) {
        var id = tag.tagId;
        var name = tag.name;
        // create a tag string
        html += "<button class='btn btn-default tag' value='" + id + "' name=" + name + ">" + name + "</button>";
    });
    return html;
}

function searchByTag(tagName) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts/tags/" + tagName,
        success: function (posts) {
            printSuccessMsg(posts, "searchByTag");
//            previewDiv.html("");
//
//            $.each(posts, function (index, post) {
//                var title = post.title;
//                var id = post.postId;
//                var author = post.user.name;
//                var summary = post.summary;
//                var date = post.date;
//                console.log(post.date);
//
//                var preview = '<div class="postSelect" id="' + id + '">';
//                preview += '<h3>' + title + '</h3><br>';
//                preview += '<p>' + summary + '</p><br>';
//                preview += '<p>' + author + " " + date + '</p></div><hr>';
//
//                previewDiv.append(preview);
//                $("#" + id).click(function (event) {
//                    previewDiv.html("");
//                    load(id);
//                });
//            });
            setPreviewDiv(posts);
        },
        error: function (xhr) {
            printErrorMsg(xhr, "searchByTag");
            previewDiv.html("<p>NO POSTS FOUND WITH TAGNAME: " + tagName + "</p>");
        }
    });
}