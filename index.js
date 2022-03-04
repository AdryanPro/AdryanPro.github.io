const firstScreen = document.querySelector("#first-screen");
const secondScreen = document.querySelector("#second-screen");
const thirdScreen = document.querySelector("#third-screen");
const gameOverscore = document.querySelector(".score");
const startBtn = document.querySelector("#startGameBtn");
const restartBtn = document.querySelector("#restart");
const finalScore = document.querySelector(".gameScore");

//VARIABLE INITIALIZATION
let gameIsOver = false;
let currentScore = 0;
let laser;
let player;
let speed = 10;
let fallingSpeed = 5;
let speedBullet = 8;
let meteor;
let dropRate = 0;
let meteorIsHit;
let timeScore = 1;

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
    if (dropRate % 45 === 0) {
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
      if (element.y >= 1000) {
        gameIsOver = true;
      }
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
    // console.log(meteorIsHit);
    if (meteorIsHit >= 0) {
      meteor.meteors.splice(meteorIsHit, 1);
      currentScore++;
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
  bg = loadImage("images/spaceBackground.png");
  imgFlamingMeteor = loadImage("images/Meteor.png");
  imgPlayer = loadImage("images/Piskel.png");
  imgBullet = loadImage("images/Bullet.png");
}

function setup() {
  const canvas = createCanvas(800, 1000);
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
  background(bg);
  player.draw();
  player.keyPressed();
  laser.draw();
  meteor.draw();

  console.log(currentScore);
  gameOverscore.innerText = currentScore;
  laser.isAnyBulletsCollid();

  if (player.checkPlayerToMeteorCollision()) {
    gameIsOver = true;
  }
  if (gameIsOver) {
    gameOver();
  }
  timeScore++;
  console.log(timeScore);
  // increaseSpeed();
  if (timeScore % 300 == 0) {
    fallingSpeed++;
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
  // console.log("Game is over");
  finalScore.innerText = currentScore;
  firstScreen.style.display = "none";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "flex";
  noLoop(); //stop the draw function
}

function increaseSpeed() {
  if (currentScore % 10 == 0 && currentScore != 0) {
    fallingSpeed++;
  }
}

window.addEventListener("load", () => {
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";
  noLoop();

  startBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    loop();
  });

  restartBtn.addEventListener("click", () => {
    firstScreen.style.display = "none";
    secondScreen.style.display = "flex";
    thirdScreen.style.display = "none";
    gameIsOver = false;
    player.x = 300;
    player.y = 350;
    meteor.meteors = [];
    currentScore = 0;
    fallingSpeed = 5;
    laser.bullets = [];
    loop();
  });
});
