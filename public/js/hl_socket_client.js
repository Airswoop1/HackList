/**
 * Created by airswoop1 on 5/4/14.
 */
var socket = io.connect('http://localhost:1337');

setTimeout(function(){
    socket.emit('get_projects',{"user":""});
},300);

socket.on('load_projects', function (data) {
    console.log(data);
    updateProjectsContainer(data);

});

function buyer_interested(hack_title, buyer_email){
    socket.emit('buyer_interested', {
        "hack_title": hack_title,
        "buyer_email":buyer_email
    });
}

function updateProjectsContainer(data){
    data = data.projects;
    var project_container = $("#projects_container");


    for(var hack in data) {

        if(data[hack].title === null){
            break;
        }
        var hack_image=""
        if(data[hack].image_location == null){
            hack_image = "https://drupal.org/files/profile_default.jpg"
        }
        else{
            hack_image = data[hack].image_location;
        }

        var first = "<div class='col-sm-4 col-md-4 col-lg-4'> <div class='photo'> <div class='pic'> <a href='#'> <center><img class='pic img-responsive' src='"+ hack_image + "' height='150px!important' style='height:200px;border-radius: 3px;' alt=''></center> <img id='"+data[hack].title+"'class='see_more' src='http://imgur.com/MB0rAtE.png' /> </a> </div> <h3><a href='#'>"+data[hack].title+"</a></h3> <p class='box-1'><b>Description:</b>"+data[hack].description+"</p> <p class='box-1'><b>Industry:</b> <span class='mini-button'>"+data[hack].industry+"</span></p>";

        var second ="<p class='box-1'><b>APIs:</b>";

        for(var a in data[hack].apis){
            second += "<span class='mini-button'>" + data[hack].apis[a] + "</span>"
        }

        second += "</p>";

        var third = "<p class='box-1'><b>Framework:</b>";

        for(var b in data[hack].fameworks){
            third += "<span class='mini-button'>" + data[hack].frameworks[b] + "</span>";
        }
        third += "</p>"

        var p = data[hack].ask_price;
        var range = ":-)";
        if(p<1000){
            range = "0 - $999";
        }
        else if(p>=1000 && p<2000){
            range = "$1,000 - $2,000";
        }
        else if(p>=2000 && p<5000){
            range = "$2,001 - $5,000"
        }
        else if(p>=5000 && p<10000){
            range = "$5,001 - $10,0000";
        }
        else{
            range = "Inquire with Seller";
        }


        var fourth = "<p class='box-1'><b>Price Range:</b> <span class='mini-button'>"+range+"</span></p> </div> </div>"

        var whole_hack = first + second + third + fourth;

        project_container.append(whole_hack);

        console.log("div appended!");

        }

    console.log("done appending divs");

    $(".see_more").click(function(){
        var buyer_email = prompt("Please enter your email:", "user@gmail.com");
        buyer_interested($(this).attr("id"),buyer_email);
    })

}


