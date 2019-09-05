var description, company, date, title, topics, picfile, outcomes, outLink; 

function onload() {
    $("#bioLink").click(toBio);
    $("#resumeLink").click(toResume);
    $("#contactLink").click(toContact);
    $("#projectsLink").click(toProjects);
    $("#outcomesLink").click(toOutcomes);
    $(".toTop").click(toTop);

    canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;
    canvas.style.top = "0px"; 
    canvas.style.left =" 0px"; 
    var x = window.innerWidth * 3/4;
    var y = window.innerHeight / 2;
    tree = new Tree(new Point(x,window.innerHeight), window.innerHeight, 2, Math.PI/6);
    tree.draw_tree(); 

    //draw the ground 
    var array = new Array(51).join('0').split('').map(parseFloat); 
    random_koch(0, 49, 50, 0.75, array);
    ctx= document.getElementById("myCanvas").getContext("2d");
    ctx.beginPath();
    ctx.moveTo(0, window.innerHeight - 30);
    var x_inc = window.innerWidth/array.length;  
    for(var i=0; i<array.length; i++) {
       ctx.lineTo(x_inc * i, window.innerHeight - Math.abs(array[i] )- 30) 
    }  
    //complete the square
    ctx.lineTo(window.innerWidth, window.innerHeight);
    ctx.fillStyle="#ffffff"

    ctx.lineTo(0, window.innerHeight); 
    ctx.lineTo(0, window.innerHeight - 30); 
    ctx.closePath();
    ctx.fill();
    
    loadPics();
//    loadCAD();
}


/*------------------page elements-----------------*/
function loadPics() {
    var width = document.getElementById("contact").offsetWidth; 
    var numPics = 8; 

    var dim = width/numPics;
    var picBar = document.getElementById("pictures");
    var filenames = [
    'images/pic1.jpg', 
    'images/pic2.jpg', 
    'images/pic3.jpg', 
    'images/pic4.jpg',
    'images/pic5.jpg',
    'images/pic6.jpg',
    'images/pic7.jpg',
    'images/pic8.jpg'];

    for(var i=0; i<numPics; i++) {
        var img = new Image(dim, dim);
        img.src = filenames[i]; 
        picBar.appendChild(img); 
    }

}

function loadCAD() {
   description =  "During my REU internship at DePaul, I worked on reducing the cost in training a CADx system to recognize lung cancer with Dr. Raicu. Some relevant topics were:";
   title = "Computer-Aided Diagnosis (CADx) Systems";
   date = "May 2018 - Present";
   company = "DePaul University";
   topics = ["Active learning", "Noisy/imperfect labels", "Measuring uncertainty"
   , "Weakly supervised learning"];
   picfile = "images/CT.jpg";
   outcomes = ['SPIE Medical Imaging 2019'];
   outLink = ["https://spie.org/MI/conferencedetails/computer-aided-diagnosis#2512803"];
   insertProject();
}

function loadEco() {
   description =  "A food web may be modelled as a mathematical network. This property can be used to compare food webs between ecosystems and learn more about how they are structured and change over time. In my semester abroad at New Zealand, I worked with Dr. Stouffer and Bernat Bramon to explore this concept.";
   title = "Ecological Network Alignment";
   date = "Feb. 2018 - May 2018";
   company = "University of Canterbury";
   topics = ["Network alignment", "Ecological data"];
   picfile = "images/FOREST.jpeg";
   outcomes = ["Class final presentation"]; 
   insertProject();
}

function loadSmart() {
   description = "How do we make smart technology easy to use for everyone? In this project, I work with Dr. Silvestri to make smart home technology marketable by factoring user preferences into the ML system." 
   title = "Scalable smart outlets";
   date = "Dec. 2017 - Present";
   company = "University of Kentucky";
   topics = ["Stream-based active learning", "Social-behavioral modeling"];
   picfile = "images/HOME.jpg";
   outcomes = []; 
   insertProject();

}

function loadMedicine() {
   description = "Atrial fibrillation is the most common sustained arrythmia. In this project with Dr. Loewe, we created a simulation of AF on a computational model of the heart."; 
   title = "Modelling Atrial Fibrillation (AF)";
   date = "May 2016 - August 2018";
   company = "Karlsruhe Institute of Technology";
   topics = ["Computational modelling", "Wave propogation (eikonal equation)"];
   picfile = "images/HEART.jpeg";
   outcomes = ["1st Place Kentucky Academy of Sciences 2016"]; 
   outLink = ["files/Atrial Fibrillation 2016.pdf"];
   insertProject();

}

function insertProject() {
   document.getElementById("projectTitle").innerHTML = title; 
   document.getElementById("projectText").innerHTML = description; 
   document.getElementById("projectCompany").innerHTML = company; 
   document.getElementById("projectDates").innerHTML = date; 
   document.getElementById("projectTable").style.backgroundImage = "url('" + picfile + "')"; 
   $("#topics").empty();
   for(var i=0; i<topics.length; i++) {
      $("#topics").append('<li>' + topics[i] + '</li>');
   }
    
   $("#projectOutcomes").empty();
   $("#projectOutcomes").append('<p style="font-style:italic; font-size: 25px; color:white;"> Outcomes </p>');
   for(var i=0; i<outcomes.length; i++) {
       $("#projectOutcomes").append('<a href="' + outLink[i] + '"> <div class="outcome">' + outcomes[i] + '</div></a>'); 
   }
}

function toProjects() {
    $('html,body').animate({
           scrollTop: $("#projects").offset().top
    });
}

function toOutcomes() {
    $('html,body').animate({
           scrollTop: $("#outcomes").offset().top
    });
}

function toResume() {
    $('html,body').animate({
           scrollTop: $("#resume").offset().top
    });
}

function toContact() {
    $('html,body').animate({
           scrollTop: $("#contact").offset().top
    });
}

function toBio() {
    $('html,body').animate({
           scrollTop: $("#bio").offset().top
    });
}

function toTop() {
    $('html,body').animate({
           scrollTop: 0
    });
}



/*-----------------------TOOLBOX-----------------------------*/
function randInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function Point(x, y) {
    this.x = x,
    this.y = y
}

//returns randomized koch curve
function random_koch(left, right, displacement, roughness, array){
    if((left + 1) == right) {
        return;
    }

    var mid = Math.floor((left + right)/2);
    var change  = ((Math.random() * 2) - 1) * displacement;
    array[mid] = ((array[left] + array[right])/2 + change); 
    displacement = displacement * roughness
   
    random_koch(left, mid, displacement, roughness, array); 
    random_koch(mid, right, displacement, roughness, array); 

}

function drawline(ctx, p1, p2) {
    ctx= document.getElementById("myCanvas").getContext("2d");
    ctx.strokeStyle = "#ffffff"
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); 
    ctx.lineTo(p2.x, p2.y); 
    ctx.stroke();
}

function draw_flower_line(ctx, p1, p2) {
    ctx= document.getElementById("myCanvas").getContext("2d");
    ctx.strokeStyle = "#ffccff"
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); 
    ctx.lineTo(p2.x, p2.y); 
    ctx.stroke();
}

/*----------------------TREE DRAWING-------------------------------*/
function Tree(center, length, thickness, theta) {
    this.center = center, 
    this.length= length, 
    this.thickness= thickness, 
    this.theta= theta,
    this.trunk_length=  length * randInt(30,50)/ 100, 
    this.screen= document.getElementById("myCanvas").getContext("2d"), 

    //functions
    this.draw_flower= draw_flower,
    this.random_flower= random_flower,
    this.draw_tree= draw_tree
     
}

function draw_flower(center, length, angle, color) {
    var ll = length/2;
    var sl = length/8;
    var part1 = new Array();
    var part2 = new Array(); 
    part1.push(new Point(center.x + ll*Math.cos(angle), center.y + ll*Math.sin(angle))); 
    part1.push(new Point(center.x + sl*Math.cos(angle + Math.PI/2), center.y +sl*Math.sin(angle + Math.PI/2))); 
    part1.push(new Point(center.x + ll*Math.cos(angle + Math.PI), center.y + ll*Math.sin(angle + Math.PI))); 
    part1.push(new Point(center.x + sl*Math.cos(angle + Math.PI*3/2), center.y + sl*Math.sin(angle + Math.PI*3/2))); 
    part2.push(new Point (center.x + sl*Math.cos(angle), center.y + sl*Math.sin(angle)));
    part2.push(new Point(center.x + ll*Math.cos(angle + Math.PI/2), center.y + ll*Math.sin(angle + Math.PI/2)));
    part2.push(new Point(center.x + sl*Math.cos(angle + Math.PI), center.y + sl*Math.sin(angle + Math.PI)));
    part2.push(new Point(center.x + ll*Math.cos(angle + Math.PI*3/2), center.y + ll*Math.sin(angle + Math.PI*3/2)));

    for(var i=0; i<3; i++) {
        draw_flower_line(this.screen, part1[i], part1[i+1], 1);
        draw_flower_line(this.screen, part2[i], part2[i+1], 1); 
    }
}


function random_flower(center, olength, thickness, start_theta, color){ //the start theta defines the current planes rotation
    thickness = thickness * 0.8;
    var num_branch = randInt(0,5); 
    if(num_branch > 0) 
        interval = olength/(num_branch);
    else
        interval = 0;
    var spot =interval;

    //make the top branch off many times
    for(var i=0; i<randInt(1,3); i++) { 
        var theta = (randInt(50,100)/100) *  (Math.PI/4);
        if(olength > 8){ //stop branching
            var length = olength * randInt(50, 70)/ 100;
            var random_bin = randInt(0, 2);
            var new_theta; 
            if(random_bin == 1)  
                new_theta = start_theta - theta; 
            else
                new_theta = start_theta + theta;
            
            //draw branch
            var new_point = new Point(center.x + (length * Math.cos(new_theta)), center.y - (length * Math.sin(new_theta)));
            if(length > 30) {
                var array = new Array(31).join('0').split('').map(parseFloat); 
                random_koch(0, 29, 5, 0.5, array);
                draw_lines(array, this.screen, this.color, center, new_point, thickness);
            }
            else {
                drawline(this.screen, center, new_point);
            }
            
            //continue branch left and right
            this.random_flower(new_point, length, thickness, new_theta, color);  
        }
    }
    
    for(var i=0; i<num_branch-1; i++) { //randomize the number of branches 
        theta = randInt(50,100)/100 *  Math.PI/4; 
        if(olength < 2){ //stop branching, flower
            this.draw_flower(center, 4, theta, color);
        }
        else { 
            var current_center = new Point(center.x - (spot*Math.cos(start_theta)), center.y +( spot*Math.sin(start_theta)));
            spot = spot + interval;
            length = olength * randInt(50, 70) / 100;
            random_bin = randInt(0, 2); 
            if(random_bin == 1) 
                new_theta = start_theta - theta;
            else
                new_theta = start_theta + theta;
            
            //draw branch
            new_point = new Point(current_center.x + length * Math.cos(new_theta), current_center.y - length * Math.sin(new_theta)); 
            if(length > 30) {
                var array = new Array(31).join('0').split('').map(parseFloat); 
                random_koch(0, 29, 5, 0.5, array);
                draw_lines(array, this.screen, this.color, current_center, new_point, thickness)
            }
            else
                drawline(this.screen, current_center, new_point); 
            
                    //continue branch left and right
            this.random_flower(new_point, length, thickness, new_theta, color); 
        }
    }
}


function draw_tree() {
        var two_variation = (Math.floor((Math.random() * 50)) + 70)/100 * 2;
        var branch_trunk = this.trunk_length/ two_variation; //branches along top half of trunk
        var branchless_trunk = this.trunk_length - branch_trunk;
        var num_branch = randInt(2,6);
        var increment = branch_trunk / num_branch; //place branches along trunk on this increment

        var percent; 
        var placement;
        var branch_center;  
        for(var i=1; i<num_branch; i++) { 
            //50% to 100% of placement
            percent = randInt(50,100)/100;
            placement = branchless_trunk + (increment * i * percent);
            //place random branching along spot on trunk
            branch_center = new Point(this.center.x, this.center.y - placement);
            this.random_flower(branch_center, placement * 0.7, 10, (Math.PI/2));
        }
    
        //top of the tree
    var new_center = new Point(this.center.x, this.center.y - this.trunk_length);

    //draw a rickety trunk
    var array = new Array(31).join('0').split('').map(parseFloat); 
    random_koch(0, 29, 5, 0.5, array);
    draw_lines(array, this.screen, this.color, this.center, new_center, this.thickness); 
    this.random_flower(new_center, branch_trunk, this.thickness, (Math.PI/2)); 

}

function draw_lines(array, screen, color, point1, point2, thickness){
        //solve line equation
        var unit_vector;
        if(point1.x == point2.x) //vertical line
            unit_vector = new Point(1, 0);
        else { 
            var m = (point1.y - point2.y)/(point1.x - point2.x);
            var b = (point1.y - (m * point1.x))
            if(m == 0) //horizontal line
                unit_vector = new Point(0, 1);
            else{ //avoid divide by zero 
                //solve for perpendicular line equation
                var pm = -1/m; 
                var pb = point1.y - (pm * point1.x); 
                //find another point on perpendicular line
                var x2 = 2; 
                var y2 = (pm * x2) + pb; 
                //find the unit vector
                var vector = new Point(point1.x - x2, point1.y - y2);
                var vector_length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
                var unit_vector = new Point(vector.x/vector_length, vector.y/vector_length);
            }
        }

        //draw line between two points
        var length; 
        if(point1.x == point2.x || m == 0) //vert or hor
            length = Math.sqrt(Math.pow((point2.x - point1.x), 2) + Math.pow((point2.y - point1.y), 2));
        else
            length = Math.abs(point2.x - point1.x);
        
        var increment = length / array.length;

        var point_arr = new Array();
        for(i=0; i<array.length; i++) {
            point_arr.push(new Point(0,0));
        }

        var x, y, x2, y2; 
        for(i=0; i<array.length - 1; i++) {
            if(point1.x == point2.x){ //vertical
                if(point1.y > point2.y){ //point 1 is lower
                    x =  point1.x; 
                    y = (i * increment) + point2.y;
                    x2 = point2.x;  
                    y2 = (i+1) * increment + point2.y;
                }
                else{
                    x =  point1.x;
                    y = (i * increment) + point1.y;
                    x2 = point2.x;
                    y2 = (i+1) * increment + point1.y;
                }
            }

            else{
                if(point1.x < point2.x){
                    x = (i * increment) + point1.x; 
                    y = (m * x) + b; 
                    x2 = (i+1) * increment + point1.x; 
                    y2 = m * x2 + b; 
                }
                else{ 
                    x = -((i * increment) - point1.x); 
                    y = ((m * x) + b); 
                    x2 = -((i+1) * increment - point1.x); 
                    y2 = (m * x2 + b); 
                }
            }
        

            //the array is the displacement perpendicular from the line
            var scaled_v = new Point(unit_vector.x * array[i], unit_vector.y * array[i]);
            var scaled_v2 = new Point(unit_vector.x * array[i+1], unit_vector.y * array[i+1]);
            var xn = x + scaled_v.x; 
            var yn = y + scaled_v.y;
            var xn2 = x2 + scaled_v2.x; 
            var yn2 = y2 + scaled_v2.y;

            point_arr[i].x = xn;
            point_arr[i].y = yn;
            point_arr[i+1].x = xn2;
            point_arr[i+1].y = yn2;

            drawline(screen, new Point(xn, yn), new Point(xn2, yn2));
            
        }

        return(point_arr);
}


