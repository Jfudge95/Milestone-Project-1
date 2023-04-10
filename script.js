document.addEventListener("DOMContentLoaded", () => {
  const map = document.querySelector(".map");
  const character = document.createElement("div");
  let characterLeftSpace = 50;
  let characterBottomSpace = 150;

  function createCharacter() {
    map.appendChild(character);
    character.classList.add("character");
    character.style.left = characterLeftSpace + "px";
    character.style.bottom = characterBottomSpace + "px";
  }

  function start() {
    if (isGameOver == false) {
      createCharacter();
    }
  }
  //attach to button
  start();
});
