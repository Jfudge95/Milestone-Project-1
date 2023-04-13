document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  const character = document.createElement("div");
  let characterLeftSpace = 50;
  let characterBottomSpace = 150;
  let isGameOver = false;
  let platformCount = 5;

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
    }
  }

  function start() {
    if (isGameOver == false) {
      createCharacter();
      createPlatforms();
    }
  }
  //attach to button
  start();
});
