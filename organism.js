let survivalChance = 90;
// percentages for the NewMonth() function
// let reprChance = 20;
let reprEnergyLoss = 20;


class Organism{
    constructor(x, y, id) {
    //independent variables
    this.x = x;
    this.y = y;
    this.id = id;

    this.color = Math.floor(Math.random() * 5) + 1; //randomly choose one of 5 colors and 3 sizes
    this.size = Math.floor(Math.random() * 3) + 1;

    this.iq = Math.floor(Math.random() * 20) + 1;
    this.stamina = Math.floor(Math.random() * 20) + 1;
    this.resistance = Math.floor(Math.random() * 20) + 1;
    this.efficiency = Math.floor(Math.random() * 20) + 1;

    //dependent variables
    this.energy = 50; // start every organism off with 50 energy
    this.age = 0;

    }

    survive(){
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

    reproduce(){
        let child = new Organism(
            Math.random() * 700,
            Math.random() * 400,
            nextId
        );

        nextId++;
        return child; // Return the new organism
    }
    
}
