function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Estatus: detectando objectos";
    video.hide();
}
status = "";
img = "";
objects = [];
function preload(){
    img = loadImage('dog_cat.jpg');
}
function draw(){
    image(video, 0,0, 380,380);
    if(status !=""){
        r= random(255);
        g = random(255);
        b = random(255);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Estatus: Objeto detectado";
            document.getElementById("numero_objetos").innerHTML = "Numero de objetos detectados: "+objects.length;
            fill(r,g.b);
            percent = floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
    /*fill('#DF0101');
    text("Perro", 45,75);
    noFill();
    stroke("#DF0101");
    rect(30, 60, 450, 350);
    fill("#FF00000");
    text("gato", 320,120);
    noFill();
    stroke("FF00000");
    rect(300,100,300,300);*/
}
function modelLoaded(){
    console.log("Modelo cargado");
    status = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}