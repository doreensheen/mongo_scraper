// Grab the articles as a json
console.log("top of app.js");


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

    $.getJSON("/articles", function(data) {
    for (var i = 0; i < 10; i++) {
        console.log(data[i].title)
        $("#articles").append(`
            <div class="jumbotron">
                <p>${data[i].title}</p>
                <button class='btn btn-dark btn-dark-save' data-id='${data[i]._id}'>Save</button>
            </div>
            `);
        }

        $(".btn-dark-save").on("click", function(e) {
            e.preventDefault();
            console.log("btn-dark clicked");
            var dataId = $(this).attr("data-id");
            console.log(dataId);
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/save/" + dataId
            }).then(function(response) {
                console.log(response);
            }).catch(function(err) {
                console.log(err);
            })
        })
    
    });



})


$(".btn-dark-allSaved").on("click", function(e) {
    e.preventDefault();
    // $.ajax({
    //     type: "GET",
    //     // dataType: "json",
    //     url: "http://localhost:3000/articles/saved"
    // }).then(function(response) {
    //     console.log(response);
    // }).catch(function(err) {
    //     console.log(err);
    // })

    $.getJSON("/articlessaved", function(data) {
        for (var j = 0; j < data.length; j++) {
            $("#saved").append(`
            <div class="jumbotron">
                <p>${data[j].title}</p>
                <button class='btn btn-dark btn-dark-remove' data-id='${data[j]._id}'>Remove</button>
            </div>
            `)
        }

        $(".btn-dark-remove").on("click", function(e) {
            e.preventDefault();
            var dataId = $(this).attr("data-id");
            console.log(dataId);
            $.ajax({
                type: "GET",
                url: "http://localhost:3000/remove"
            }).then(function(response) {
                console.log(response);
            }).catch(function(err) {
                console.log(err);
            })
        })
    })

});




