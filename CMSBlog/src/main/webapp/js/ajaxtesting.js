/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const basePath = "http://localhost:8080/CMSBlog/";

$(document).ready(function () {
    $("#ajaxButton").click(function () {
        getTag(1);
    });
});

function getTag(id) {
    $.ajax({
        type: "GET",
        url: basePath + "tag/" + id,
        success: function (data) {
            if (!$.trim(data)) {
                console.log("data is null");
            } else {
                console.log("succuss get tag " + id);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("error get tag");
        }
    });
}

function getAllTags(){
    $.ajax({
        type: "GET",
        url: basePath + "tags",
        success: function(data){
            console.log("succus get all tags");
        },
        error: function(jqxHR, textStatus, errorThrown){
            console.log("error get all tags");
        }
    });
}

function updateTags(tagString){
    // TODO spring split + loop
    var id = 1;
    $.ajax({
        type: "PUT",
        url: basePath + "tag" + id,
        success: function(data){
            console.log("update tag");
        },
        error: function(jqxHR, textStatus, errorThrown){
            console.log("error updating tag");
        }
    });
}