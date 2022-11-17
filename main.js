objects = [];
status ="";

function setup()
{
    canvas = createCanvas(480,300);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("if").innerHTML = "Status: Object Detected";
    value = document.getElementById("object_name").value;
}

function modelLoaded()
{
    console.log("Model Loaded");
    status = true;
}

function gotResult(error,results)
{
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(video,10,10,600,600);

    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video,gotResult);
        for ( i = 0; i < objects.length; i++) {
            if (objects == value) {
            
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%" + objects[i].x + 15 ,objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x + objects[i].y + objects[i].width + objects[i].height);
            }
            
        }
    }
}

