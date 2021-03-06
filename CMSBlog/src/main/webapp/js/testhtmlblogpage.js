///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
////const basePath = "http://localhost:8080/CMSBlog/";
//
//$(document).ready(function () {
//    load(1);
//    hookCategoryButton();
//    hookSaveButton();
//});
//
//function load(postId) {
//    $.when(createCategoryCheckboxes()).done(function () {
//        $.ajax({
//            type: "GET",
//            url: "http://localhost:8080/CMSBlog/post/" + postId,
//            success: function (data) {
//                $("#id").val(data.postId);
//                $("#titleInput").val(data.title);
//                $("#summaryInput").val(data.summary);
//                $("#dateInput").val(data.date);
//                // fill tiny mce with post content
//                $("#tinyMCEInput").val(data.content);
//                // check categories assosiated with this post
//                $.each(data.categories, function (i, category) {
//                    $("#category" + category.categoryId).attr("checked", true);
//                });
//                $("#tagInput").val(tagsToString(data.tags));
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                $("body").html("<p>404 not found</p>");
//            }
//        });
//    }).fail(function(){
//        // handle failures
//    });
//
//}
//
//function createCategoryCheckboxes() {
//    return $.ajax({
//        type: "GET",
//        url: "http://localhost:8080/CMSBlog/categories",
//        success: function (data) {
//            var html = "";
//            $.each(data, function (t, category) {
//                html += "<input class=category type=checkbox id=category" + category.categoryId + " value=" + category.name + " >" + category.name + "</input>";
//            });
//            $("#categoryCheckboxes").html(html);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            $("#categoryCheckboxes").html("<p>categories not found</p>");
//        }
//    });
//}
//
//function tagsToString(tags) {
//    var tagsString = "";
//    $.each(tags, function (i, tag) {
//        tagsString += tag.name;
//        if (i < tags.length - 1) {
//            tagsString += ", ";
//        }
//    });
//    // replace any delimiter groupings with just one
//    return tagsString.replace(/[ ,.]+/, ", ");
//}
//
//function hookCategoryButton() {
//    $("#createCategory").click(function () {
//        $.ajax({
//            type: "POST",
//            url: "http://localhost:8080/CMSBlog/category",
//            data: JSON.stringify({
//                name: $("#categoryInput").val()
//            }),
//            headers: {
//                'Accept': "application/json",
//                'Content-Type': "application/json"
//            },
//            dataType: 'json',
//            success: function (data) {
//                $("#categoryCheckboxes").append("<input class=category type=checkbox id=" + data.categoryId + " value=" + data.name + " checked>" + data.name + "</input>");
//                $("#categoryInput").val("");
//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                console.log("category already exists");
//                $("#categoryInput").val("");
//            }
//        });
//    });
//}
//
//function categoriesToJson() {
//    var jsonString = "[";
//
//    // list of checkbox inputs for category
//    var categories = $(".category");
//
//    // extract checked boxes into array
//    var checked = [];
//    $.each(categories, function (i, category) {
//        if (category.checked) {
//            checked.push(category);
//        }
//
//    });
//    // construct string object
//    $.each(checked, function (i, category) {
//        jsonString += JSON.stringify({
//            categoryId: category.id.replace("category",""),
//            name: category.value
//        });
//        if (i < checked.length - 1) {
//            jsonString += ",";
//        }
//    });
//
//    jsonString += "]";
//    console.log(jsonString);
//    return jsonString;
//}
//
//function createTagsThatDontExist() {
//    // split on tag names, group multiple ,. or ' ' as one
//    var tags = $("#tagInput").val().split(/[ ,.]+/);
//
//    // convert tag buttons to a big JSON string
//    var jsonString = "[";
//
//    $.each(tags, function (i, tag) {
//        jsonString += JSON.stringify({
//            tagId: 0, // no ids present
//            name: tag
//        });
//        if (i < tags.length - 1) {
//            jsonString += ",";
//        }
//    });
//
//    jsonString += "]";
//
//    return $.ajax({
//        type: "PUT",
//        url: basePath + "tags",
//        data: jsonString,
//        headers: {
//            'Accept': "application/json",
//            'Content-Type': "application/json"
//        },
//        dataType: 'json',
//        success: function (data) {
//            console.log("Created some tags");
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.log("error saving tags");
//            console.log(errorThrown);
//            console.log(jqXHR);
//            return "";
//        }
//    });
//}
//
//function hookSaveButton() {
//    $("#saveButton").click(function () {
//        $.when(createTagsThatDontExist()).done(function (resultA) {
//            $.ajax({
//                type: "PUT",
//                url: "http://localhost:8080/CMSBlog/post/" + $("#id").val(),
//                data: JSON.stringify({
//                    postId: $("#id").val(),
//                    title: $("#titleInput").val(),
//                    summary: $("#summaryInput").val(),
//                    content: $("#tinyMCEInput").val(),
//                    date: $("#dateInput").val(),
//                    tags: resultA,
//                    user: {
//                        userId: 1,
//                        name: "root",
//                        password: "$2a$10$ripEHdQgSOsxJtx15WZNi.l8l6yxGM9ky.a46Gz0auoNdrLFGgjUi",
//                        roles: [
//                            {
//                                roleId: 1,
//                                name: "admin"
//                            }
//                        ]
//                    },
//                    categories: JSON.parse(categoriesToJson())
//                }),
//                headers: {
//                    'Accept': "application/json",
//                    'Content-Type': "application/json"
//                },
//                dataType: 'json',
//                success: function (data) {
//                    console.log(data);
//                },
//                error: function (jqXHR, textStatus, errorThrown) {
//                    console.log("error saving post");
//                    console.log(jqXHR);
//                    console.log(textStatus);
//                    console.log(errorThrown);
//                }
//            });
//        }).fail(function () {
//            // TODO: handle errors
//        });
//    });
//}