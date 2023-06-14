const apikey = "5cf3d691367d8a048f5a4a722eeaf393";

const weatherData = document.getElementById("weather-data");
const cityInput = document.getElementById("city-input");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cityValue = cityInput.value;
  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apikey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const tempereture = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const details = [
      `Feels like: ${Math.round(data.main.feels_like)}`,
      `Humidity: ${data.main.humidity}%`,
      `Winds Speed: ${data.wind.speed} m/s`,
    ];

    weatherData.querySelector(
      ".icon"
    ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather Icon" />`;

    weatherData.querySelector(".temperature").textContent = `${tempereture}℃`;
    weatherData.querySelector(".description").textContent = description;

    weatherData.querySelector(".details").innerHTML = details
      .map((detail) => `<div>${detail}</div>`)
      .join("");
  } catch (error) {
    weatherData.querySelector(".icon").innerHTML = "";

    weatherData.querySelector(".temperature").textContent = "";
    weatherData.querySelector(".description").textContent =
      "An error happend, please try again later";

    weatherData.querySelector(".details").innerHTML = "";
  }
}
