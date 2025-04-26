import "./styles.css";
// use promise syntax, then the async await syntax

function getWeather(queryLocation) {
  fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      queryLocation +
      "?unitGroup=us&key=URFNUWXMLEPCDM2TVLZSXF83X&contentType=json",
    { mode: "cors" },
  )
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      logWeatherData(response);
      loadBackgroundGif(response);
    });
}

function logWeatherData(json) {
  console.clear();
  console.log("Address: " + json.address);
  console.log("Resolved Address: " + json.resolvedAddress);
  console.log("Weather Condition: " + json.currentConditions.conditions);
  console.log("Weather Description: " + json.description);
}

async function loadBackgroundGif(json) {
  const weatherCondition = json.currentConditions.conditions;
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=tjiLsheAgbDRzY3EyzYWO0OkkzM9hp8G&s=weather ${weatherCondition}`,
    { mode: "cors" },
  );
  const gifJson = await response.json();
  const body = document.querySelector("body");
  body.style.backgroundImage = `url("${gifJson.data.images.original.url}")`;
}

const getWeatherButton = document.querySelector("button");
const locationInput = document.getElementById("location");
getWeatherButton.addEventListener("click", (e) => {
  e.preventDefault();
  getWeather(locationInput.value);
});
