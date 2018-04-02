/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const basePath = "http://localhost:8080/CMSBlog/";

$(document).ready(function () {
    $("#search").submit(function(event){
        var text = $("#searchValue").val();
        if(text.size() > 0){
            searchByTag(text);
        }
    });
});

function searchByTag(tagName) {
    $.ajax({
        type: "GET",
        url: basePath + "posts/" + tagName,
        success: function (data) {
            $("#").html("");
            console.log("success");
            console.log(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("failure could not find any posts with tag");
            console.log(tagName);
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
        }
    });
}