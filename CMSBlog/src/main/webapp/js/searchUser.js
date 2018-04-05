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
    hookSearchForm();
    hookCreatePostButton();
});

$("#header").click(function (event) {
    previewDiv.html("");
    getAllPreviews();
});

$("#unapprovedFilter").click(function (event) {
    previewDiv.html("");
    getAllUnapproved();
});

function hookSearchForm() {
    $("#searchForm").submit(function (e) {
        var text = $("#searchValue").val();
        if (text.length > 0) {
            searchByTag(text);
        }
//        e.preventDefault(); save button should refresh
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
//        load(this.id);
        loadEdit(this.id);
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
    console.log("start");
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
//                    loadEdit(id);
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

function getAllUnapproved() {

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/post/notApproved",
        success: function (posts) {
            printSuccessMsg(posts, "getAllApproved");
//            $.each(posts, function (index, post) {
//                var title = post.title;
//                var id = post.postId;
//                var author = post.user.name;
//                var summary = post.summary;
//                var date = post.date;
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
                    '<p>' + data.content + '</p>';
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

function loadEdit(postId) {
    // load post --> load edit div --> load categories --> fill data
    loadPostEdit(postId).then(function (data) {
        previewDiv.load("edit.html", function () {
            createCategoryCheckboxes().then(function () {
                fillFormData(data);
            });
        });
    });
}

function loadPostEdit(postId) {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/post/" + postId,
        success: function (data) {
            printSuccessMsg(data, "loadPostEdit");
        },
        error: function (xhr) {
            printErrorMsg(xhr, "loadPostEdit");
        }
    });
}

function createCategoryCheckboxes() {
    return $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/categories",
        success: function (data) {
            printSuccessMsg(data, "createCategoryCheckboxes");
            var html = "";
            $.each(data, function (t, category) {
                html += "<input class=category type=checkbox id=category" + category.categoryId + " value=" + category.name + " >" + category.name + "</input>";
            });
            $("#categoryCheckboxes").html(html);
        },
        error: function (xhr) {
            printErrorMsg(xhr, "createCategoryCheckboxes");
        }
    });
}

function fillFormData(data) {
    hookSaveButton();
    hookApproveButton(data.postId);
    $("#id").val(data.postId);
    $("#username").val(data.user.name);
    $("#titleInput").val(data.title);
    $("#summaryInput").val(data.summary);
    $("#dateInput").val(data.date);
    // fill tiny mce with post content
    $("#tinyMCEInput").val(data.content);
    // check categories assosiated with this post
    $.each(data.categories, function (i, category) {
        $("#category" + category.categoryId).attr("checked", true);
    });
    $("#tagInput").val(tagsToString(data.tags));
}

function createPost() {
    $.when(createCategoryCheckboxes()).done(function () {
        printSuccessMsg("none", "createPost");
        previewDiv.html("");
        // hook save button when edit.htnml is complete
        previewDiv.load("edit.html", function () {
            hookNewSaveButton();
        });
    }).fail(function (xhr) {
        printErrorMsg(xhr, "createCategoryCheckboxes createPost");
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
    $("#createCategory").click(function (e) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/CMSBlog/category",
            data: JSON.stringify({
                name: $("#categoryInput").val()
            }),
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            dataType: 'json',
            success: function (data) {
                printSuccessMsg(data, "searchByTag");
                $("#categoryCheckboxes").append("<input class=category type=checkbox id=" + data.categoryId + " value=" + data.name + " checked>" + data.name + "</input>");
                $("#categoryInput").val("");
            },
            error: function (xhr) {
                printErrorMsg(xhr, "createCategory");
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
            categoryId: category.id.replace("category", ""),
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
        url: "http://localhost:8080/CMSBlog/tags",
        data: jsonString,
        headers: {
            'Accept': "application/json",
            'Content-Type': "application/json"
        },
        dataType: 'json',
        success: function (data) {
            printSuccessMsg(data, "createTagsThatDontExist");
        },
        error: function (xhr) {
            printErrorMsg(xhr, "createTagsThatDontExist");
        }
    });
}

function hookSaveButton() {
    $("#saveButton").click(function () {
        $.when(createTagsThatDontExist()).done(function (resultA) {
            console.log($("#id").val());
            $.ajax({
                type: "PUT",
                url: "http://localhost:8080/CMSBlog/post/" + $("#id").val() + "/" + $("#username").val(),
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
                        password: "$2a$10$ripEHdQgSOsxJtx15WZNi.l8l6yxGM9ky.a46Gz0auoNdrLFGgjUi",
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
                    printSuccessMsg(data, "hookSaveButton");
                },
                error: function (xhr) {
                    printErrorMsg(xhr, "hookSaveButton");
                }
            });
        }).fail(function (xhr) {
            printErrorMsg(xhr, "hookSaveButton");
        });
    });
}

function hookNewSaveButton() {
    $("#saveNewButton").click(function () {
        $.when(createTagsThatDontExist()).done(function (resultA) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/CMSBlog/post",
                data: JSON.stringify({
                    title: $("#titleInput").val(),
                    summary: $("#summaryInput").val(),
                    content: $("#tinyMCEInput").val(),
                    date: $("#dateInput").val(),
                    tags: resultA,
                    user: {
                        userId: 1,
                        name: "root",
                        password: "$2a$10$ripEHdQgSOsxJtx15WZNi.l8l6yxGM9ky.a46Gz0auoNdrLFGgjUi",
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
                    printSuccessMsg(data, "hookNewSaveButton");
                    // reload the page
                    location.reload();
                },
                error: function (xhr) {
                    printErrorMsg(xhr, "hookNewSaveButton");
                }
            });
        }).fail(function (xhr) {
            printErrorMsg(xhr, "hookNewSaveButton");
        });
    });
}

function hookApproveButton(postId) {
    $("#approveButton").click(function () {
        $.ajax({
            type: "PUT",
            url: "http://localhost:8080/CMSBlog/post/approve/" + postId,
            success: function (data) {
                printSuccessMsg(data, "hookApproveButton");
                // reload the page
                location.reload();
            },
            error: function (xhr) {
                printErrorMsg(xhr, "hookApproveButton");
            }
        });
    });
}

function hookCreatePostButton(){
    $("#createPost").click(function(){
        createPost();
    });
}