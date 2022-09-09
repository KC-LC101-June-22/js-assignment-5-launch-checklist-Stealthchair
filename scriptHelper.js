// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
                document.getElementById("missionTarget").innerHTML = `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}"></img>`;
}

function validateInput(testInput) {
   if(!testInput && testInput !== 0){  // Nothing for field value
    return "Empty"
   } else if(isNaN(testInput)){
    return "Not a Number"
   } else {
    return "Is a Number"
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let returnObject = { needAlert: true,
                        response: ""
                        }

   //Test if empty
    let pilotEntry = validateInput(pilot);
    let copilotEntry = validateInput(copilot);
    let fuelLevelEntry = validateInput(fuelLevel);
    let cargoMassEntry = validateInput(cargoLevel);
     //Alert if empty
    if (pilotEntry !== "Not a Number" || copilotEntry !== "Not a Number" || fuelLevelEntry !== "Is a Number" || cargoMassEntry !== "Is a Number") {

        //Modify message based on failed validation
        let alertMessage = "";
        //Pilot validation
        if (pilotEntry === "Empty") {
            alertMessage += "Pilot Name cannot be empty\n";
        } else if (pilotEntry === "Is a Number") {
            alertMessage += "Pilot Name cannot contain numbers\n";
        }

        //Co-Pilot validation
        if (copilotEntry === "Empty") {
            alertMessage += "Co-Pilot Name cannot be empty\n";
        } else if (copilotEntry === "Is a Number") {
            alertMessage += "Co-Pilot Name cannot contain numbers\n";
        }

        //Fuel validation
        if (fuelLevelEntry === "Empty") {
            alertMessage += "Fuel Level cannot be empty\n";
        } else if (fuelLevelEntry === "Not a Number") {
            alertMessage += "Fuel Level must be a number\n";
        }

          //Cargo validation
        if (cargoMassEntry === "Empty") {
            alertMessage += "Cargo Mass cannot be empty\n";
        } else if (fuelLevelEntry === "Not a Number") {
            alertMessage += "Fuel Level must be a number\n";
        }
      
        returnObject.response = alertMessage;
        return returnObject;
    }
   
    //Update visibility
    list.style.visibility = "visible";
    //document.getElementById("faultyItems").style.visibility = "visible";

    //Update Pilot name in launch information box
    document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready for launch`;

    //Update Pilot name in launch information box
    document.getElementById("copilotStatus").textContent = `Co-pilot ${copilot} is ready for launch`;

    //Update Fuel Level in launch information box
    fuelGreenLight = false;
    //Fuel too low
    if(fuelLevel < 10000){
        document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        document.getElementById("fuelStatus").textContent = "Fuel level too low for launch";
        //Fuel good to go
    } else {
        document.getElementById("fuelStatus").textContent = "Fuel level high enough for launch";
        fuelGreenLight = true;
        //Invalid fuel input
    }

    //Update Cargo Mass in launch information box, cargoMass -> cargoLevel
    cargoGreenLight = false;
    //Cargo Mass too high
    if (cargoLevel > 10000) {
        document.getElementById("launchStatus").textContent = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(199, 37, 78)";
        document.getElementById("cargoStatus").textContent = "Cargo mass too heavy for launch";
        //Cargo Mass good to do
    } else {
        document.getElementById("cargoStatus").textContent = "Cargo mass low enough for launch";
        cargoGreenLight = true;
        //Invalid Cargo Mass input
    }

    //Update if all fields are ready for launch
    if(fuelGreenLight && cargoGreenLight){
        document.getElementById("launchStatus").textContent = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "rgb(65, 159, 106)";
    } 
    returnObject.needAlert = false;
    return returnObject;
}

/*
async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
      return response.json();
    });

    return planetsReturned;
}
*/

async function myFetch(){
   //let planetsReturned;
   
   //Below code from https://javascript.plainenglish.io/comparing-different-ways-to-make-http-requests-in-javascript-39ab0f090788
   var req = new XMLHttpRequest();
//The onreadystatechange property
//specifies a function to be 
//executed every time the status
//of the XMLHttpRequest changes
req.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       //The responseText property
       //returns a text string           
       console.log(xhttp.responseText)
       //Do some stuff
    }
};
req.open("GET", "https://handlers.education.launchcode.org/static/planets.json", true);
req.send();
   
 return req.response;
   
}

function pickPlanet(planets) {
    let chosenPlanet = planets[Math.floor(Math.random() * planets.length)];
    return chosenPlanet;
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
