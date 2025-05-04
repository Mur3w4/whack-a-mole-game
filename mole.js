let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let pause;

let moleInterval;
let plantInterval;

window.onload = function () {
    setgame();
};

function setgame() {
    // Set up the grid of 9 tiles (3x3)
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString(); // Corrected toString()
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }

    moleInterval = setInterval(setMole, 1000); // 1 second
    plantInterval = setInterval(setPlant, 2000); // 2 seconds
}

function getRandomTile() {
    // Pick a random number from 0 to 8
    let num = Math.floor(Math.random() * 9);
    return num.toString();
}

function setMole() {
    if (gameOver) {
        return;
    }

    if (currMoleTile) {
        currMoleTile.innerHTML = "";
    }

    let num;
    do {
        num = getRandomTile();
    } while (currPlantTile && currPlantTile.id === num); // Avoid plant tile

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png"; // Ensure this image is in the same folder

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) {
        return;
    }

    if (currPlantTile) {
        currPlantTile.innerHTML = "";
    }

    let num;
    do {
        num = getRandomTile();
    } while (currMoleTile && currMoleTile.id === num); // Avoid mole tile

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png"; // Ensure this image is in the same folder

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver || pause) {
        return;
    }

    if (this === currMoleTile) {
        score += 10;
        document.getElementById("score").innerText = score.toString();
    } else if (this === currPlantTile) {
        document.getElementById("score").innerText = "GAME OVER: " + score.toString();
        gameOver = true;

        // Stop spawning moles and plants
        clearInterval(moleInterval);
        clearInterval(plantInterval);
    }
}

function togglePause() {
    if (gameOver)return;
    pause = !pause;

    if (pause){
        clearInterval(moleInterval)
        clearInterval(plantInterval)
        document.getElementById("controls").children[0].innerText = "Resume";
    }
    else{
        moleInterval = setInterval(setMole, 1000);
        plantInterval = setInterval(setPlant, 2000);
        document.getElementById("controls").children[0].innerText = "Pause";
    }
}

function restartGame() {
    score = 0;
    gameOver = false;
    document.getElementById("score").innerText = score.toString();

    for (let i = 0; 1 < 9; i++) {
        document.getElementById(i.toString()).innerHTML = "";}

        clearInterval(moleInterval);
        clearInterval(plantInterval);
        moleInterval = setInterval(setMole, 1000);
        plantInterval = setInterval(setPlant, 2000);

        document.getElementById("controls").children[0].innerText = pause;
}
