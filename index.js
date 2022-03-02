const firstScreen = document.querySelector("#first-screen");
const secondScreen = document.querySelector("#second-screen");
const thirdScreen = document.querySelector("#third-screen");
const gameOverScore = document.querySelector("#score");

//thirdScreen.style.display = 'none';
//VARIABLE INITIALIZATION
let gameIsOver = false;
let score = 0;
let laser;
let player;
let speed = 10;
let fallingSpeed = 4;
let speedBullet = 8;
let meteor;
let dropRate = 0;
let meteorIsHit;
//METEOR
class flamingMeteor {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.meteors = [];
  }
  draw() {
    dropRate++;
    //console.log(dropRate);
    if (dropRate % 80 === 0) {
      this.meteors.push(
        new flamingMeteor(random(600), 0, random(100, 150), random(100, 150))
      );
    }

    this.meteors.forEach((element) => {
      image(
        imgFlamingMeteor,
        element.x,
        element.y,
        element.width,
        element.height
      );
      element.y += fallingSpeed;
    });
  }
}
//PLAYER
class spaceShip {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  draw() {
    image(imgPlayer, this.x, this.y, this.width, this.height);
  }
  keyPressed() {
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += speed;
      this.x = max(1, this.x);
      this.x = min(this.x, width - this.width - 1);
    } else if (keyIsDown(LEFT_ARROW)) {
      this.x -= speed;
      this.x = max(1, this.x);
      this.x = min(this.x, width - this.width - 1);
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += speed;
      this.y = max(1, this.y);
      this.y = min(this.y, height - this.height - 1);
    } else if (keyIsDown(UP_ARROW)) {
      this.y -= speed;
      this.y = max(1, this.y);
      this.y = min(this.y, height - this.height - 1);
    }
  }
  checkPlayerToMeteorCollision() {
    return !!meteor.meteors.find((obstacle) => collision(obstacle, this));
  }
}

//CREATE BULLET
class Bullet {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.x = player.x + player.width / 2 - 33;
    this.y = player.y;
  }

  checkBulletToMeteorCollision() {
    meteorIsHit = meteor.meteors.findIndex((obstacle) =>
      collision(obstacle, this)
    );
    console.log(meteorIsHit);
    if (meteorIsHit >= 0) {
      meteor.meteors.splice(meteorIsHit, 1);
      return true;
    }
    return false;
  }
}

class Bullets {
  constructor() {
    this.bullets = [];
  }

  draw() {
    this.bullets.forEach((element) => {
      image(imgBullet, element.x, element.y, element.height, element.width);
      element.y -= speedBullet;
    });
  }
  mouse() {
    this.bullets.push(new Bullet(40, 70));
  }
  isAnyBulletsCollid() {
    this.bullets = this.bullets.filter((element) => {
      return !element.checkBulletToMeteorCollision();
    });
  }
}

//SHOOT BULLET
function mouseClicked() {
  laser.mouse();
}

function preload() {
  imgFlamingMeteor = loadImage("./images/Meteor.png");
  imgPlayer = loadImage("./images/Piskel.png");
  imgBullet = loadImage("./images/Bullet.png");
}

function setup() {
  const canvas = createCanvas(800, 770);
  canvas.parent("game-board");
  player = new spaceShip(300, 350, 100, 85);
  meteor = new flamingMeteor(
    random(600),
    0,
    random(100, 150),
    random(100, 150)
  );
  laser = new Bullets();
}

function draw() {
  background(0);
  player.draw();
  player.keyPressed();
  laser.draw();
  meteor.draw();

  if (laser.isAnyBulletsCollid()) {
    console.log("Target Hit");
  }

  if (player.checkPlayerToMeteorCollision()) {
    gameIsOver = true;
  }
  if (gameIsOver) {
    gameOver();
  }
}

//COLLISION
function collision(element1, element2) {
  return (
    element1.x < element2.x + element2.width &&
    element1.x + element1.width > element2.x &&
    element1.y < element2.y + element2.height &&
    element1.height + element1.y > element2.y
  );
}

//GAMEOVER
function gameOver() {
  console.log("Game is over");
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "block";
  gameOverScore.innerHTML = `Your score is : ${score}`;
  noLoop(); //stop the draw function
}
