status = "";
objects = [];
function preload(){
}
function setup(){
canvas = createCanvas(600,450);
canvas.center();
video = createCapture(VIDEO);
video.hide();
}
function draw(){
    image(video, 0, 0, 600, 450);
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length ; i++){
        document.getElementById("status").innerHTML = "Objects Detected";
        fill("red");
        percentage = floor(objects[i].confidence * 100);
        text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y);
        noFill();
        stroke("red")
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        if(objects[i].label == textInput){
            video.stop()
            objectDetector.detect(gotResults);
            document.getElementById("final_results").innerHTML = "Objects Has Been Found";
        }
        else{
            document.getElementById("final_results").innerHTML = "Objects Has Not Been Found";  
        }
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("result").innerHTML = "Detecting Objects";
    textInput = document.getElementById("text_input1").value;
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}