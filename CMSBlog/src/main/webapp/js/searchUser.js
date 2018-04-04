/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var previewDiv = $("#postFeedUser");
var dateDiv = $("#postByDate");


$(document).ready(function () {
    getAllPreviews();
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
    getAllPreviews();
});

$("#unapprovedFilter").click(function (event) {
    $(previewDiv).html("");
    getAllUnapproved();
});

function getAllPreviews() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts",
        success: function (posts) {
            $.each(posts, function (index, post) {
                console.log("posts");
                console.log(posts); 
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
                    loadEdit(id);
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
        url: "http://localhost:8080/CMSBlog/posts/approved",
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

function getAllUnapproved() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/post/notApproved",
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

const basePath = "http://localhost:8080/CMSBlog/";



function loadEdit(postId) {
    console.log("hello edit");
    $.when(createCategoryCheckboxes()).done(function () {
        $.ajax({
            type: "GET",
            url: basePath + "post/" + postId,
            success: function (data) {
                console.log("success");
                previewDiv.load("edit.html");
                $("#id").val(data.postId);
                $("#titleInput").val(data.title);
                $("#summaryInput").val(data.summary);
                $("#dateInput").val(data.date);
                // fill tiny mce with post content
                $("#tinyMCEInput").val(data.content);
                // check categories assosiated with this post
                $.each(data.categories, function (i, category) {
                    $("#" + category.categoryId).attr("checked", true);
                });
                $("#tagInput").val(tagsToString(data.tags));
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $("body").html("<p>404 not found</p>");
            }
        });
    }).fail(function () {
        // handle failures
    });

}

function createCategoryCheckboxes() {
    return $.ajax({
        type: "GET",
        url: basePath + "categories",
        success: function (data) {
            var html = "";
            $.each(data, function (t, category) {
                html += "<input class=category type=checkbox id=" + category.categoryId + " value=" + category.name + " >" + category.name + "</input>";
            });
            $("#categoryCheckboxes").html(html);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#categoryCheckboxes").html("<p>categories not found</p>");
        }
    });
}

function tagsToString(tags) {
    var tagsString = "";
    $.each(tags, function (i, tag) {
        tagsString += tag.name;
        if (i < tags.length - 1) {
            tagsString += ", ";
        }
    });
    // replace any delimiter groupings with just one
    return tagsString.replace(/[ ,.]+/, ", ");
}

function hookCategoryButton() {
    $("#createCategory").click(function () {
        $.ajax({
            type: "POST",
            url: basePath + "category",
            data: JSON.stringify({
                name: $("#categoryInput").val()
            }),
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            dataType: 'json',
            success: function (data) {
                $("#categoryCheckboxes").append("<input class=category type=checkbox id=" + data.categoryId + " value=" + data.name + " checked>" + data.name + "</input>");
                $("#categoryInput").val("");
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("category already exists");
                $("#categoryInput").val("");
            }
        });
    });
}

function categoriesToJson() {
    var jsonString = "[";

    // list of checkbox inputs for category
    var categories = $(".category");

    // extract checked boxes into array
    var checked = [];
    $.each(categories, function (i, category) {
        if (category.checked) {
            checked.push(category);
        }

    });
    // construct string object
    $.each(checked, function (i, category) {
        jsonString += JSON.stringify({
            categoryId: category.id,
            name: category.value
        });
        if (i < checked.length - 1) {
            jsonString += ",";
        }
    });

    jsonString += "]";
    return jsonString;
}

function createTagsThatDontExist() {
    // split on tag names, group multiple ,. or ' ' as one
    var tags = $("#tagInput").val().split(/[ ,.]+/);

    // convert tag buttons to a big JSON string
    var jsonString = "[";

    $.each(tags, function (i, tag) {
        jsonString += JSON.stringify({
            tagId: 0, // no ids present
            name: tag
        });
        if (i < tags.length - 1) {
            jsonString += ",";
        }
    });

    jsonString += "]";

    return $.ajax({
        type: "PUT",
        url: basePath + "tags",
        data: jsonString,
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        dataType: 'json',
        success: function (data) {
            console.log("Created some tags");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error saving tags");
            console.log(errorThrown);
            console.log(jqXHR);
            return "";
        }
    });
}

function hookSaveButton() {
    $("#saveButton").click(function () {
        $.when(createTagsThatDontExist()).done(function (resultA) {
            $.ajax({
                type: "PUT",
                url: basePath + "post/" + $("#id").val(),
                data: JSON.stringify({
                    postId: $("#id").val(),
                    title: $("#titleInput").val(),
                    summary: $("#summaryInput").val(),
                    content: $("#tinyMCEInput").val(),
                    date: $("#dateInput").val(),
                    tags: resultA,
                    user: {
                        userId: 1,
                        name: "root",
                        password: "root",
                        roles: [
                            {
                                roleId: 1,
                                name: "admin"
                            }
                        ]
                    },
                    categories: JSON.parse(categoriesToJson())
                }),
                headers: {
                    'Accept': "application/json",
                    'Content-Type': "application/json"
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log("error saving post");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }).fail(function () {
            // TODO: handle errors
        });
    });
}