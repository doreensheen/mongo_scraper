// Grab the articles as a json
console.log("top of app.js");
$.getJSON("/articles", function(data) {
    for (var i = 0; i < data.length; i++) {
        $("#articles").append(`
            <div class="jumbotron">
                <p>${data[i].title}</p>
                <button class='btn btn-dark' data-id='${data[i]._id}'>Save</button>
            </div>
        `);
    }
});

$(".btn-success").on("click", function(e) {
    e.preventDefault();
    console.log("success btn clicked");
    $.ajax({
        type: "GET",
        // dataType: "json",
        url: "http://localhost:3000/scrape"
    }).then(function(response) {
        console.log(response);
    }).catch(function(err) {
        console.log(err);
    })
})

$(".btn-dark").on("click", function() {
    var dataId = $(this).attr("data-id");
})



