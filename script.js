document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  const character = document.createElement("div");
  let characterLeftSpace = 50;
  let startPoint = 150;
  let characterBottomSpace = startPoint;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];
  let upTimerId;
  let downTimerId;
  let isJumping = true;
  let isGoingLeft = false;
  let isGoingRight = false;
  let leftTimerID;
  let rightTimerId;

  function createCharacter() {
    map.appendChild(character);
    character.classList.add("character");
    characterLeftSpace = platforms[0].left;
    character.style.left = characterLeftSpace + "px";
    character.style.bottom = characterBottomSpace + "px";
  }

  class Platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom;
      this.left = Math.random() * 315;
      this.visual = document.createElement("div");

      const visual = this.visual;
      visual.classList.add("platform");
      visual.style.left = this.left + "px";
      visual.style.bottom = this.bottom + "px";
      map.appendChild(visual);
    }
  }

  function createPlatforms() {
    for (let i = 0; i < platformCount; i++) {
      let platformGap = 800 / platformCount;
      let newPlatBottom = 100 + i * platformGap;
      let newPlatform = new Platform(newPlatBottom);
      platforms.push(newPlatform);
    }
  }
  function movePlatforms() {
    if (characterBottomSpace > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4;
        let visual = platform.visual;
        visual.style.bottom = platform.bottom + "px";

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual;
          firstPlatform.classList.remove("platform");
          platforms.shift();
          console.log(platforms);
          let newPlatform = new Platform(800);
          platforms.push(newPlatform);
        }
      });
    }
  }

  function jump() {
    clearInterval(downTimerId);
    isJumping = true;
    upTimerId = setInterval(function () {
      characterBottomSpace += 20;
      character.style.bottom = characterBottomSpace + "px";
      if (characterBottomSpace > startPoint + 200) {
        fall();
      }
    }, 30);
  }

  function fall() {
    clearInterval(upTimerId);
    isJumping = false;
    downTimerId = setInterval(function () {
      characterBottomSpace -= 5;
      character.style.bottom = characterBottomSpace + "px";
      if (characterBottomSpace <= 0) {
        gameOver();
      }
      platforms.forEach((platform) => {
        if (
          characterBottomSpace >= platform.bottom &&
          characterBottomSpace <= platform.bottom + 22 &&
          characterLeftSpace + 85 >= platform.left &&
          characterLeftSpace <= platform.left + 85 &&
          !isJumping
        ) {
          console.log("landed");
          startPoint = characterBottomSpace;
          jump();
        }
      });
    }, 30);
  }
  function gameOver() {
    console.log("Game Over Chef!");
    isGameOver = true;
    clearInterval(upTimerId);
    clearInterval(downTimerId);
    clearInterval(leftTimerID);
    clearInterval(rightTimerId);
  }

  function control(e) {
    if (e.key === "ArrowLeft") {
      moveLeft();
    } else if (e.key === "ArrowRight") {
      moveRight();
    } else if (e.key === "ArrowUp") {
      moveStraight();
    }
  }

  function moveLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId);
      isGoingRight = false;
    }
    isGoingLeft = true;
    leftTimerID = setInterval(function () {
      if (characterLeftSpace >= 0) {
        characterLeftSpace -= 5;
        character.style.left = characterLeftSpace + "px";
      } else moveRight();
    }, 30);
  }

  function moveRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerID);
      isGoingLeft = false;
    }
    isGoingRight = true;
    rightTimerId = setInterval(function () {
      if (characterLeftSpace <= 515) {
        characterLeftSpace += 5;
        character.style.left = characterLeftSpace + "px";
      } else moveLeft();
    }, 30);
  }
  function moveStraight() {
    isGoingRight = false;
    isGoingLeft = false;
    clearInterval(rightTimerId);
    clearInterval(leftTimerID);
  }

  function start() {
    if (isGameOver == false) {
      createPlatforms();
      createCharacter();
      setInterval(movePlatforms, 30);
      jump();
      document.addEventListener("keyup", control);
    }
  }
  //attach to button
  start();
});
