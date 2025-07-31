const apikey = "562b9e1bd45cace370810ce35f6371ed";

async function checkweather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    console.log(data);

    document.querySelector("#cityname").innerText = data.name;
    document.querySelector("#temp").innerText = Math.floor(data.main.temp) + "°C";
    document.querySelector("#humidity").innerText = data.main.humidity + "%";
    document.querySelector("#speed").innerText = Math.floor(data.wind.speed) + " Km/h";

    const weatherMain = data.weather[0].main;
    const image = document.querySelector('#image');

    if (weatherMain === "Clouds") {
      image.src = "/Images/clouds.png";
    } else if (weatherMain === "Clear") {
      image.src = "/Images/clear.png";
    } else if (weatherMain === "Rain") {
      image.src = "/Images/rain.png";
    } else if (weatherMain === "Drizzle") {
      image.src = "/Images/drizzle.png";
    } else if (weatherMain === "Mist") {
      image.src = "/Images/mist.png";
    } else {
      image.src = "Images/default.png"; // fallback image
    }

  } catch (error) {
    alert(error.message);
  }
}

const search = document.querySelector("#search");
const searchbtn = document.querySelector("#search-btn");

searchbtn.addEventListener("click", () => {
  if (search.value.trim() !== "") {
    checkweather(search.value.trim());
  } else {
    alert("Please enter a city name");
  }
});

// Default load
checkweather("London");
