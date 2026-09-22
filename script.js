let organisms = []; // Array to hold all organisms
let nextId = 1; //global id variable
let currentMonth = 0;

let canvas = document.getElementById("simulator");
let ctx = canvas.getContext("2d");
canvas.width = 700;
canvas.height = 400;

//Check if there is a saved game, if there isnt, add 10 random organisms
if (!loadGame()){
    createStartingOrganisms();
}
//draw the  organisms (saved or new ones)
drawOrganisms();
//using the saved data, display the current population and month
updateInfo(0); //when reloading, do not showcase the change in population

document.getElementById("forward-btn").addEventListener("click", newMonth);

function createStartingOrganisms(){
    for (let i = 0; i < 10; i++) {
        let organism = new Organism(
            Math.random() * 700,
            Math.random() * 400,
            nextId
        );
        
        nextId++;
        organisms.push(organism);
    }
}

function updateInfo(popChange){
    document.getElementById("population-counter").textContent = "Population: " + organisms.length;
    if(popChange){ //when there is a population change, display it
        document.getElementById("population-counter").textContent = "Population: " + organisms.length + "   Change: " + (organisms.length - popChange);
    }
    document.getElementById("month-counter").textContent = "Months passed: " + currentMonth;  
}

function newMonth(){ // updates stats for all organisms
    currentMonth++;

    let previousPopulation = organisms.length;
    let survivingOrganisms = []; // Array to hold all organisms that survive the month
    let newOrganisms = []; // Array to hold new organisms for this month

    for (let organism of organisms) { //run loop for each organism in the array
        organism.age++; // Increase age by 1 month

        if (!organism.survive() || organism.energy <= 0) { //if survive() returns false or energy is less than 1, stop loop for that organism
            console.log("Organism #" + organism.id + " died")
            continue;
        }

        //surviving organisms get added, therefore automatically removing the dead ones
        survivingOrganisms.push(organism);

        // Action
        let action = Math.random() * 100;

        if (action < 20) { // 20% chance to do nothing
            organism.energy -= 10; // Decrease energy
            console.log("Organism #" + organism.id + " did nothing. Age: " + organism.age + " Energy: " + organism.energy)
        }
        else if (action < 80) { // 60% chance to find food
            organism.energy += 20; // Increase energy 
            if (organism.energy > 100) {organism.energy = 100;} // Cap energy at 100
            console.log("Organism #" + organism.id + " found food. Age: " + organism.age + " Energy: " + organism.energy)
        }
        else { // 20% chance to reproduce
            let child = organism.reproduce();
            newOrganisms.push(child);
            organism.energy -= reprEnergyLoss; // Decrease energy 
            console.log("Organism #" + organism.id + " reproduced. Age: " + organism.age + " Energy: " + organism.energy)
        }
    }

    organisms = survivingOrganisms.concat(newOrganisms); // Add new organisms to the surviving ones
    
    console.log("Month: ", currentMonth);
    console.log("Population: ", organisms.length);
    
    drawOrganisms(); 
    saveGame();
    //update written info on screen
    updateInfo(previousPopulation);

}

function drawOrganisms(){
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let organism of organisms) {

        ctx.beginPath();
        ctx.arc( //create the circle
            organism.x,
            organism.y,
            organism.size * 5, // size n = radius 5n
            0,
            Math.PI * 2
        );

       /*
        if(organism.color === 1){ctx.fillStyle = "#ff00dd"}
        else if (organism.color === 2){ctx.fillStyle = "#ff69e8"}
        else if (organism.color === 3){ctx.fillStyle = "#ee00ff"}
        else if (organism.color === 4){ctx.fillStyle = "#7700b8"}
        else{ctx.fillStyle = "#cf126a"}
        ctx.fill();
        */

        if(organism.color === 1){ctx.fillStyle = "#0c9275"}
        else if (organism.color === 2){ctx.fillStyle = "#29524A"}
        else if (organism.color === 3){ctx.fillStyle = "#0bc5cb"}
        else if (organism.color === 4){ctx.fillStyle = "#08a742"}
        else{ctx.fillStyle = "#106bc5"}
        ctx.fill();
    }
}

function saveGame(){
    console.log("Saving game...")

    // save object array using stringify
    localStorage.setItem("organisms", JSON.stringify(organisms));
    // save global variables that shouldnt reset when the page is reloaded
    localStorage.setItem("currentMonth", currentMonth);
    localStorage.setItem("nextId", nextId);
}

function loadGame() { //function 

    let savedOrganisms = localStorage.getItem("organisms");

    if (savedOrganisms) { // if there exists saved data (which happens after NextMonth() runs), load that data back into the correct objects

        let savedData = JSON.parse(savedOrganisms);
        organisms = [];

        for (let data of savedData) { //for every stringified object in the saved data, make a real object (Organism) out of it

            let organism = new Organism(
                data.x, data.y, data.id
            );

            organism.color = data.color;
            organism.size = data.size;
            organism.iq = data.iq;
            organism.stamina = data.stamina;
            organism.resistance = data.resistance;
            organism.efficiency = data.efficiency;
            organism.energy = data.energy;
            organism.age = data.age;

            organisms.push(organism);
        }

        currentMonth = Number(localStorage.getItem("currentMonth"));
        nextId = Number(localStorage.getItem("nextId"));

        return true;
    }

    return false; //if there is no saved data, return false
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

function resetGame() {

    if (!confirm(`Are you sure you want to reset the game?`)){ // ask for confirmation before reseting
        return; //stop the function if no
    }

    // Delete the old saved game
    localStorage.removeItem("organisms");
    localStorage.removeItem("currentMonth");
    localStorage.removeItem("nextId");

    // Reset variables
    organisms = [];
    currentMonth = 0;
    nextId = 1;

    // Create 10 new organisms
    createStartingOrganisms();
    // Save the new starting game
    saveGame();
    // Draw the new organisms
    drawOrganisms();
    // Update information on screen
    updateInfo(0);
}



