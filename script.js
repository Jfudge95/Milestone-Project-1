document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  const character = document.createElement("div");
  let characterLeftSpace = 50;
  let characterBottomSpace = 250;
  let isGameOver = false;
  let platformCount = 5;
  let platforms = [];

  function createCharacter() {
    map.appendChild(character);
    character.classList.add("character");
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
      });
    }
  }

  function jump() {}

  function start() {
    if (isGameOver == false) {
      createCharacter();
      createPlatforms();
      setInterval(movePlatforms, 30);
      jump();
    }
  }
  //attach to button
  start();
});
