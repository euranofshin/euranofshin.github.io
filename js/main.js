//screen dimensinos
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
     
var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var dx = [ -1,  1, 0,0];
var dy = [ 0,  0, -1, 1];

function onLoad() {
    var canvas = document.getElementById("myCanvas");
    canvas.width = width - 400; 
    canvas.height = height;
    //document.body.style.backgroundImage = "url('image.jpg')";
    $.ajax({
        type: "POST",
        url: "../Final/for_web.py", 
    }).done(function( o ) {
        alert("DID");
    });
   /* 
    var ctx = canvas.getContext("2d");
    var image = new Image(); 
    image.src = "background.jpg";
    image.onload = function() {
        ctx.imageSmoothingEnabled = false; 
        ctx.drawImage(image, 50, 50, image.width, image.height, 50, 50, canvas.width, canvas.height);
        canvas.addEventListener('click', fill_space);

    }
    */
}

