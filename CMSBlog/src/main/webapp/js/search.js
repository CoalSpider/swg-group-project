/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () {
    getAllPreviews();
    getAllCategories();
});

function getAllPreviews() {

    var previewDiv = $("#postFeed");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/CMSBlog/posts",
        success: function (posts) {
            $.each(posts, function (index, post) {
                var title = post.title;
                var id = post.id;
                var author = post.user.name;
                var summary = post.summary;
                var date = "" + post.date.dayOfMonth + "/" + post.date.monthValue + "/" + post.date.year;
                console.log(post.date);

                var preview = '<div id="' + id + '"/">';
                preview += '<h3>' + title + '</h3><br>';
                preview += '<p>' + summary + '</p><br>';
                preview += '<p>' + author + " " + date + '</p></div><hr>';

                previewDiv.append(preview);

            });
        },
        error: function () {
            alert("Failure");
        }
    });
}
;

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
;