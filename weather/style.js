document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "6ba02bb9a274d0b313e5a869ec32faa1";
  const searchBtn = document.getElementById("searchBtn");

  function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then(data => {
        document.getElementById("errorMsg").classList.add("hidden");
        document.getElementById("weatherResult").classList.remove("hidden");

        document.getElementById("cityName").textContent = data.name;
        document.getElementById("temp").textContent = data.main.temp;
        document.getElementById("description").textContent = data.weather[0].description;
        document.getElementById("humidity").textContent = data.main.humidity;
        document.getElementById("wind").textContent = data.wind.speed;
        document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        updateBackground(data.weather[0].main);
      })
      .catch(error => {
        document.getElementById("weatherResult").classList.add("hidden");
        document.getElementById("errorMsg").classList.remove("hidden");
        document.getElementById("errorMsg").textContent = error.message;
      });
  }

  function updateBackground(condition) {
    let bg;
    let message;
    switch (condition.toLowerCase()) {
      case 'clear':
        bg = 'linear-gradient(to top, #fceabb, #f8b500)';
        message = 'It\'s a bright and sunny day!';
        break;
      case 'clouds':
        bg = 'linear-gradient(to top, #d7d2cc, #304352)';
        message = 'It\'s cloudy outside. Might need a light jacket.';
        break;
      case 'rain':
      case 'drizzle':
        bg = 'linear-gradient(to top, #4e54c8, #8f94fb)';
        message = 'Don\'t forget your umbrella, it\'s raining!';
        break;
      case 'thunderstorm':
        bg = 'linear-gradient(to top, #373B44, #4286f4)';
        message = 'There\'s a thunderstorm. Stay safe indoors!';
        break;
      case 'snow':
        bg = 'linear-gradient(to top, #e6dada, #274046)';
        message = 'Snow is falling. Time for warm clothes!';
        break;
      case 'mist':
      case 'fog':
        bg = 'linear-gradient(to top, #abbaab, #ffffff)';
        message = 'It\'s foggy. Drive carefully!';
        break;
      default:
        bg = '#f0f4f8';
        message = '';
    }
    document.body.style.background = bg;
    document.getElementById("weatherMessage").textContent = message;
  }

  searchBtn.addEventListener("click", getWeather);
});
