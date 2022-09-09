// Write your JavaScript code here!
//import {addDestinationInfo, validateInput, formSubmission, pickPlanet, myFetch} from "./scriptHelper.js"
//require('./scriptHelper.js')

window.addEventListener("load", function() {
   let list = document.getElementById("faultyItems");
   list.style.visibility = "hidden";
   
    let scriptElement = window.document.createElement("script");
    scriptElement.src = "myBundle.js";
    window.document.head.appendChild(scriptElement);
   
   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
      listedPlanets = result;
      console.log(listedPlanets);
   }).then(function () {
      console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
      let pickedPlanet = pickPlanet(listedPlanets);

      addDestinationInfo(document, pickedPlanet.name, pickedPlanet.diameter, pickedPlanet.star, pickedPlanet.distance, pickedPlanet.moons, pickedPlanet.image);
   })
 
   
   let goodToSubmit = document.querySelector("form");
   goodToSubmit.addEventListener("submit", function(event){
    //Name elements for readability
    let pilotName = document.getElementsByName("pilotName")[0];
    let copilotName = document.getElementsByName("copilotName")[0];
    let fuelLevel = document.getElementsByName("fuelLevel")[0];
    let cargoMass = document.getElementsByName("cargoMass")[0];
    let formResponse = formSubmission(document, list, pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value);
    if(formResponse.needAlert){
      alert(formResponse.response);
    }
    event.preventDefault();
   });
});
