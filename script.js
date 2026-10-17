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
    document.getElementById("population-counter").textContent = "Befolkning: " + organisms.length;
    if(popChange){ //when there is a change in population, display it
        document.getElementById("population-counter").textContent = "Befolkning: " + organisms.length + "   Förändring: " + (organisms.length - popChange);
    }

    document.getElementById("month-counter").textContent = "Månad: " + currentMonth;  

    let avgStamina = calculateAverage(organisms, "stamina");
    document.getElementById("stamina-counter").textContent = "Genomsnittlig uthållighet: " + avgStamina;

}

function calculateAverage(array, parameter){
    let sum = 0;
    for (let i = 0; i < array.length; i++){
        sum += array[i][parameter]; //if "stamina", it becomes array[i].stamina
    }
    return sum / array.length
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

        let action = Math.random() * 100;

        if (action < 20) { // 20% chance to do nothing
            organism.energy -= 15; // Decrease energy
            if (organism.energy < 0) {organism.energy = 0;} // Cap energy at 0
            console.log("Organism #" + organism.id + " did nothing. Age: " 
                + organism.age + " Energy: " + organism.energy + " Stamina: " 
                + organism.stamina + " Survival chance: " + survivalChance)
        }
        else if (action < 80) { // 60% chance to find food
            organism.energy += findFoodEnergy; // Increase energy 
            if (organism.energy > 100) {organism.energy = 100;} // Cap energy at 100
            console.log("Organism #" + organism.id + " found food. Age: "
                 + organism.age + " Energy: " + organism.energy)
        }
        else { // 20% chance to reproduce
            let child = organism.reproduce(organism.color, organism.size, organism.iq, organism.stamina, organism.resistance, organism.efficiency);
            newOrganisms.push(child);
            organism.energy -= reprEnergyLoss; // Decrease energy 
            console.log("Organism #" + organism.id + " reproduced. Age: " + organism.age + " Energy: " + organism.energy +
                "   Parent stamina: " + organism.stamina + " Child stamina: " + child.stamina
            )
        }
    }

    organisms = survivingOrganisms.concat(newOrganisms); // Add new organisms to the surviving ones
    
    console.log("Month: ", currentMonth);
    console.log("Population: ", organisms.length);
    
    drawOrganisms(); 
    saveGame();
    updateInfo(previousPopulation); //update written info on screen

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

        if(organism.color === 1){ctx.fillStyle = color1}
        else if (organism.color === 2){ctx.fillStyle = color2}
        else if (organism.color === 3){ctx.fillStyle = color3}
        else if (organism.color === 4){ctx.fillStyle = color4}
        else{ctx.fillStyle = color5}
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
    localStorage.setItem("temp", temp);
    localStorage.setItem("food", food);
}

function loadGame() { 

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
        temp = Number(localStorage.getItem("temp"));
        food = Number(localStorage.getItem("food"));
        document.getElementById("temp-count").innerText = temp + " C";
        document.getElementById("food-count").innerText = food + "%";

        return true;
    }

    return false; //if there is no saved data, return false
}

function resetGame() {

    if (!confirm(`Är du säker på att du vill börja om?`)){ // ask for confirmation before reseting
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
    temp = 20;
    food = 100;

    // Create 10 new organisms
    createStartingOrganisms();
    // Save the new starting game
    saveGame();
    // Draw the new organisms
    drawOrganisms();
    // Update information on screen
    updateInfo(0);
    document.getElementById("temp-count").innerText = temp + ' C';
    document.getElementById("food-count").innerText = food + '%';
}

//changes and saves the environmental variables in local storage
function increaseTemp(){ 
    for(let i = 0; i < 2; i++){
        temp++;  
        if(temp < -50){temp = -50}; if(temp > 70){temp = 70};
    }
    document.getElementById("temp-count").innerText = temp + ' C';
    localStorage.setItem("temp", temp);
}
function decreaseTemp(){
    for(let i = 0; i < 2; i++){
        temp--;  
        if(temp < -50){temp = -50}; if(temp > 70){temp = 70};
    }
    document.getElementById("temp-count").innerText = temp + ' C';
    localStorage.setItem("temp", temp);
}
function increaseFood(){
    for(let i = 0; i < 5; i++){
        food++;
        if(food < 0){food = 0}; if(food > 200){food = 200};
    }
    document.getElementById("food-count").innerText = food + '%';
    localStorage.setItem("food", food);
}
function decreaseFood(){
    for(let i = 0; i < 5; i++){
        food--;
        if(food < 0){food = 0}; if(food > 200){food = 200};
    }
    document.getElementById("food-count").innerText = food + '%';
    localStorage.setItem("food", food);
}



