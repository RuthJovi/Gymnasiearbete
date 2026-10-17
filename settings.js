// only for variables and functions that regard settings which are accessed in start.html

var colorButtons = document.querySelectorAll('input[name="colorScheme"]');

// Go through all the radio buttons
for (var i = 0; i < colorButtons.length; i++) {

    // Listen for when a radio button is selected
    colorButtons[i].addEventListener("change", function() {
        localStorage.setItem("colorScheme", this.value); //saves the variable "colorScheme" with the chosen scheme (eg. "forest") in LocalStorage
        location.reload(); // Reload the page 
    });

}
var savedColorScheme = localStorage.getItem("colorScheme");
// If no color scheme has been saved, use "seafloor"
if (savedColorScheme === null) {
    savedColorScheme = "seafloor";
    localStorage.setItem("colorScheme", savedColorScheme);
}
// Go through all the radio buttons
for (var i = 0; i < colorButtons.length; i++) {

    // Check the radio button that matches the saved scheme
    if (colorButtons[i].value === savedColorScheme) {
        colorButtons[i].checked = true;
    }

}

if (savedColorScheme === "seafloor") {
    document.body.style.backgroundColor = "#009ba0";
    document.getElementById("simulator").style.backgroundColor = "#F0E4C9";
    let color = "#c4c6ba"
    document.getElementById("bottom-info").style.backgroundColor = color;
    document.getElementById("infopanel").style.backgroundColor = color;

    //for all the buttons at once
    let greenButtons = document.getElementsByClassName('green-btn');
    for (let i = 0; i < greenButtons.length; i++) {
        greenButtons[i].style.backgroundColor = "#59c68a";
    }   
    let redButtons = document.getElementsByClassName('red-btn');
    for (let i = 0; i < redButtons.length; i++) {
        redButtons[i].style.backgroundColor = "#cc4c88";
    }  

    var color1 = "#0c9275";
    var color2 = "#29524A";
    var color3 = "#0bc5cb";
    var color4 = "#08a74d";
    var color5 = "#106bc5";
}
else if(savedColorScheme === "desert"){
    document.body.style.backgroundColor = "#c28b0c";
    document.getElementById("simulator").style.backgroundColor = "#dfbd6f";
    let color = "#532a17"
    let textColor = "#eaab5c"
    document.getElementById("bottom-info").style.backgroundColor = color;
    document.getElementById("infopanel").style.backgroundColor = color;
    document.getElementById("bottom-info").style.color = textColor;
    document.getElementById("infopanel").style.color = textColor;

    let greenButtons = document.getElementsByClassName('green-btn');
    for (let i = 0; i < greenButtons.length; i++) {
        greenButtons[i].style.backgroundColor = "#73940d";
    }   
    let redButtons = document.getElementsByClassName('red-btn');
    for (let i = 0; i < redButtons.length; i++) {
        redButtons[i].style.backgroundColor = "#b83408";
    } 

    var color5 = "#783000";
    var color3 = "#d46300";
    var color4 = "#ffb224";
    var color2 = "#9b7400";
    var color1 = "#4e3910";
}
else if(savedColorScheme === "rainbow"){
    document.body.style.backgroundColor = "#ea84c3";
    document.getElementById("simulator").style.backgroundColor = "#ffffff";
    let color = "#fee8f8"
    document.getElementById("bottom-info").style.backgroundColor = color;
    document.getElementById("infopanel").style.backgroundColor = color;

    let greenButtons = document.getElementsByClassName('green-btn');
    for (let i = 0; i < greenButtons.length; i++) {
        greenButtons[i].style.backgroundColor = "#6efa78";
    }   
    let redButtons = document.getElementsByClassName('red-btn');
    for (let i = 0; i < redButtons.length; i++) {
        redButtons[i].style.backgroundColor = "#fc5959";
    } 

    var color1 = "#fc5959";
    var color2 = "#f4a454";
    var color3 = "#f7f776";
    var color4 = "#6efa78";
    var color5 = "#5f5ff8";
}
else if(savedColorScheme === "forest"){
    document.body.style.backgroundColor = "#004b34";
    document.getElementById("simulator").style.backgroundColor = "#002e21";
    let color = "#39352a"
    let textColor = "#cfcfcf"
    document.getElementById("bottom-info").style.backgroundColor = color;
    document.getElementById("infopanel").style.backgroundColor = color;
    document.getElementById("bottom-info").style.color = textColor;
    document.getElementById("infopanel").style.color = textColor;

    let greenButtons = document.getElementsByClassName('green-btn');
    for (let i = 0; i < greenButtons.length; i++) {
        greenButtons[i].style.backgroundColor = "#20ae00";
    }   
    let redButtons = document.getElementsByClassName('red-btn');
    for (let i = 0; i < redButtons.length; i++) {
        redButtons[i].style.backgroundColor = "#dd451b";
    } 

    var color1 = "#006523";
    var color2 = "#20ae00";
    var color4 = "#58df3d";
    var color5 = "#673f18";
    var color3 = "#dd451b";
}


