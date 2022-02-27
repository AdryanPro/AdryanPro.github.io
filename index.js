const splashScreen = document.querySelector('.RemoveDuringGame'); 
let img;
let player;
let speed = 10;
let fallingSpeed = 4;
let meteor1;
let fallingLoop;


class spaceShip{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){
        image(imgPlayer, this.x, this.y, this.width, this.height);
    }
    keyPressed(){
        if(keyIsDown(RIGHT_ARROW)){
            this.x += speed;
            this.x = max(1, this.x);
            this.x = min(this.x, width - this.width - 1);
        }else if(keyIsDown(LEFT_ARROW)){
            this.x -= speed;
            this.x = max(1, this.x);
            this.x = min(this.x, width - this.width - 1);
        }if(keyIsDown(DOWN_ARROW)){
            this.y += speed;
            this.y = max(1, this.y);
            this.y = min(this.y, height - this.height - 1);
        }else if(keyIsDown(UP_ARROW)){
            this.y -= speed;
            this.y = max(1, this.y);
            this.y = min(this.y, height - this.height - 1);
        }
    }
      
}  
class flamingMeteor{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){
        image(imgFlamingMeteor, this.x, this.y, this.width, this.height);
    }
        fall(){
            this.y += fallingSpeed;
        }
}


function preload(){
    imgFlamingMeteor = loadImage('./images/Meteor.png')
    imgPlayer = loadImage('./images/Piskel.png');
}

function setup(){
    const canvas = createCanvas(800, 770);
    canvas.parent('game-board')
    player = new spaceShip(300, 350, 100, 85);
    meteor1 = new flamingMeteor(random(600), 0, random(100, 150), random(100, 150));

}

function draw(){
    background(0);
    player.draw();
    player.keyPressed();
    meteor1.draw();
    meteor1.fall();
}

/*
    add(){
        const evry300Frame = frameCount % (60 * 5) === 0;
        if(this.array < 5 && evry300Frame){
            this.add();
        }
        this.array.forEach((obstacle, i) =>{
            obstacle.y += 5;
            if (obstacle.y - obstacle.h >= height) {
                // add to the score and delete the obstacle from the array
                this.score++;
                this.array.splice(index, 1);
                // also add back a new one at the top
                this.addObstacle();}
        })
    }
*/