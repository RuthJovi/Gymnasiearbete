//environmental variables (food and temperature)
let temp = 20;
let food = 100;

// percentages for the NewMonth() function
// let reprChance = 20;
let reprEnergyLoss = 20;
// let findFoodChance = 60
let findFoodEnergy = 20;

let survivalChance = 85;

class Organism{
    constructor(x, y, id) {
    //independent variables
    this.x = x;
    this.y = y;
    this.id = id;

    this.color = Math.floor(Math.random() * 5) + 1; //randomly choose one of 5 colors and 3 sizes
    this.size = Math.floor(Math.random() * 3) + 1;
    
    this.iq = Math.floor(Math.random() * 20) + 1; //iq, stm, res, eff, can have values between 1 - 20
    this.stamina = Math.floor(Math.random() * 20) + 1;
    this.resistance = Math.floor(Math.random() * 20) + 1;
    this.efficiency = Math.floor(Math.random() * 20) + 1;

    //dependent variables
    this.energy = 50; // start off with 50 energy
    this.age = 0;

    }

    survive(){

        if(temp >= -50 && temp < -10){
            survivalChance = (81.25 + (1.625 * temp)) + ((2 * this.stamina) / 3) + (this.energy / 10);
        }
        else if(temp >= -10 && temp < 0){
            survivalChance = (75 + temp) + (this.stamina / 3) + (this.energy / 10);
        }
        else if(temp >= 0 && temp < 20){
            survivalChance = (75 + (0.5 * temp)) + (this.energy / 10);
        }
        else if(temp >= 20 && temp < 30){
            survivalChance = (95 - (0.5 * temp)) + (this.stamina / 3) + (this.energy / 10);
        }
        else if(temp >= 30 && temp <= 70){
            survivalChance = (140 - (2 * temp)) + ((2 * this.stamina) / 3) + (this.energy / 10);
        }


        let chance = Math.random() * 100;
        if (chance <= survivalChance) {
            return true; 
        }
        else{
            return false; 
        }

    }


    findFood(){

    }

    reproduce(parentColor, parentSize, parentIq, parentStm, parentRes, parentEff){
        let child = new Organism(
            Math.random() * 700,
            Math.random() * 400,
            nextId
        );
        //make the child inherit the parents stats
        child.color = parentColor;
        child.size = parentSize;
        //deviation of +-3
        child.iq = deviateStat(parentIq)
        child.stamina = deviateStat(parentStm);
        child.resistance = deviateStat(parentRes);
        child.efficiency = deviateStat(parentEff);

        nextId++;
        return child; // Return the new organism
    }
    
}

function deviateStat(parentStat){
    let deviation = Math.floor(Math.random() * 7 - 3); //random number between -3 and 3
    let childStat = parentStat + deviation; // add the deviation
    if(childStat > 20){
        childStat = 20;
    }
    if(childStat < 1){
        childStat = 1;
    }
    return childStat;
}



