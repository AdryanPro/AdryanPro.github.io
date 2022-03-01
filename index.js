const splashScreen = document.querySelector('.RemoveDuringGame'); 

let laser;
let player;
let speed = 10;
let fallingSpeed = 4;
let speedBullet = 8;
let meteor;
let dropRate = 0;


class flamingMeteor{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.meteors = [];
    }
    draw(){
        dropRate++;
        console.log(dropRate);
        if(dropRate % 80 === 0){
            this.meteors.push(new flamingMeteor(random(600), 0, random(100, 150), random(100, 150)));
        }

        this.meteors.forEach((element) =>{
            image(imgFlamingMeteor, element.x, element.y, element.width, element.height);
            element.y += fallingSpeed;
        })
    }
}

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

class bullet{
    constructor(width, height){
    this.x = player.x + player.width/2 -33;
    this.y = player.y
    this.width = width;
    this.height = height;
    this.bullets = []
    }

    draw(){
        this.bullets.forEach((element) =>{
            image(imgBullet, element.x, element.y, element.height, element.width);
            element.y -= speedBullet;
        }) 
    }
    mouse(){
        this.bullets.push(new bullet(40, 70));
    }
}

function preload(){
    imgFlamingMeteor = loadImage('./images/Meteor.png');
    imgPlayer = loadImage('./images/Piskel.png');
    imgBullet = loadImage('./images/Bullet.png');
}

function setup(){
    const canvas = createCanvas(800, 770);
    canvas.parent('game-board')
    player = new spaceShip(300, 350, 100, 85);
    meteor = new flamingMeteor(random(600), 0, random(100, 150), random(100, 150));
    laser = new bullet(20, 50);

}

function mouseClicked(){
    laser.mouse();
}
function draw(){
    background(0);
    player.draw();
    player.keyPressed();
    laser.draw();
    meteor.draw();
}