///* 
// * To change this license header, choose License Headers in Project Properties.
// * To change this template file, choose Tools | Templates
// * and open the template in the editor.
// */
////const basePath = "http://localhost:8080/CMSBlog/";
//
//$(document).ready(function () {
//    getAllTags();
//    $("#save").click(function () {
//        saveTags();
//    });
//    $("#edit").click(function () {
//        editTags();
//    });
//    $("#cancel").click(function () {
//        console.log("cancel edit");
//    });
//});
//
//// unused
////function getTag(id) {
////    $.ajax({
////        type: "GET",
////        url: basePath + "tag/" + id,
////        success: function (data) {
////            console.log(data);
////            $("#tags").html("<p>" + data.tagId + ":" + data.name + "</p>");
////        },
////        error: function (jqXHR, textStatus, errorThrown) {
////            $("#tags").html("<p>" + jqXHR.responseJSON.message + "</p>");
////        }
////    });
////}
//
//function getAllTags() {
//    $.ajax({
//        type: "GET",
//        url: basePath + "tags",
//        success: function (data) {
//            createTagButtons(data);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            $("#tags").html("<p>" + jqXHR.responseJSON.message + "</p>");
//        }
//    });
//}
//
//function save() {
//    // get list of tag buttons
//    var tags = $(".tag");
//    // convert tag buttons to a big JSON string
//    var jsonString = "[";
//    
//    $.each(tags, function (i, tag) {
//        jsonString += JSON.stringify({
//            tagId: new Number(tag.value), 
//            name: tag.name
//        });
//        if (i < tags.length-1) {
//            jsonString += ",";
//        }
//    });
//    
//    jsonString += "]";
//    // log
//    console.log("jsonstring = " + jsonString);
//    
//    // ajax start
//    $.ajax({
//        type: "PUT",
//        url: basePath + "tags",
//        data: jsonString,
//        headers: {
//            'Accept': "application/json",
//            'Content-Type': "application/json"
//        },
//        dataType: 'json',
//        success: function (data) {
//            createTagButtons(data);
//        },
//        error: function (jqXHR, textStatus, errorThrown) {
//            console.log("error saving tags");
//            console.log(errorThrown);
//            console.log(jqXHR);
//        }
//    });
//}
//
//function editTags() {
//    var tagsString = buttonsToString();
//    $("#inputContainer").css("display", "block");
//    $("#tagInput").val(tagsString);
//    $("#tagButtonContainer").css("display", "none");
//}
//
//function saveTags() {
//    var tagsString = $("#tagInput").val();
//    var buttonHtml = stringToHTMLButtons(tagsString);
//    $("#inputContainer").css("display", "none");
//    $("#tags").html(buttonHtml);
//    hookSearchToTagButtons();
//    $("#tagButtonContainer").css("display", "block");
//    
//    save();
//}
//
//function buttonsToString() {
//    var tags = $(".tag");
//    var tagsString = "";
//    $.each(tags, function (i, tag) {
//        tagsString += tag.name;
//        if(i < tags.length - 1){
//            tagsString += ", ";
//        }
//    });
//    // replace any delimiter groupings with just one
//    tagsString = tagsString.replace(/[ ,.]+/, ", ");
//    return tagsString;
//}
//
//function stringToHTMLButtons(tagsString) {
//    var html = "";
//    // match on 1 or more , . or ' '
//    $.each(tagsString.split(/[ ,.]+/), function (i, tagName) {
//        html += "<button class='tag' id=" + i + " name=" + tagName + ">" + tagName + "</button>";
//    });
//    return html;
//}
//
//function hookSearchToTagButtons() {
//    var tagButtons = $(".tag");
//    $.each(tagButtons, function (i, button) {
//        button.addEventListener("click", function () {
//            console.log("search for " + button.name);
//        });
//    });
//}
//
//// used for initial load from database
//function createTagButtons(tags) {
//    $("#tags").html("");
//    $.each(tags, function (i, tag) {
//        // create a tag string
//        $("#tags").append("<button class='tag' id=" + tag.tagId + " value='" + tag.tagId + "' name=" + tag.name + ">" + tag.name + "</button>");
//        $("#" + tag.tagId).click(function () {
//            console.log("search for " + tag.name);
//        });
//    });
//}