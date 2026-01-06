const apiKey = "d4dfac8bf71b53759dd76ebc1cf2a345";

document.addEventListener("DOMContentLoaded", function () {
  getWeather("Delhi");
});

function getWeather(cityName) {
  let city;

  if (cityName) {
    city = cityName;
  } else {
    const input = document.getElementById("cityInput").value.trim();
    city = input === "" ? "Delhi" : input;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {

      if (data.sys.country !== "IN") {
        throw new Error("Not an Indian city");
      }

      document.getElementById("city").innerText = data.name;
      document.getElementById("temp").innerText = Math.round(data.main.temp);
      document.getElementById("temp2").innerText = Math.round(data.main.temp);
      document.getElementById("humidity").innerText = data.main.humidity;
      document.getElementById("wind").innerText = data.wind.speed;

      document.getElementById("condition").innerText =
        data.weather[0].description;

      document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

      updateDate();
    })
    .catch(error => {
      alert("❌ Please enter a valid Indian city only!");
    });
}

function updateDate() {
  const now = new Date();

  document.getElementById("day").innerText =
    now.toLocaleDateString("en-US", { weekday: "long" });

  document.getElementById("date").innerText =
    now.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
}
