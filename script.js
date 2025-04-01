document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("loginBtn");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const loginContainer = document.getElementById("login-container");
    const dashboardContainer = document.getElementById("dashboard-container");
    const sidebar = document.getElementById("sidebar");

    const searchBtn = document.getElementById("searchBtn");
    const cityInput = document.getElementById("cityInput");
    const locationBtn = document.getElementById("locationBtn");

    const currentWeatherDiv = document.getElementById("current-weather");

    const validUser = { username: "user", password: "pass123" };

    loginBtn.addEventListener("click", function () {
        if (username.value === validUser.username && password.value === validUser.password) {
            loginContainer.style.display = "none";
            dashboardContainer.style.display = "flex";
            sidebar.style.display = "block";
        } else {
            alert("Invalid username or password");
        }
    });

    async function fetchWeather(city) {
        const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.cod === 200) {
                currentWeatherDiv.innerHTML = `
                    <h3>${data.name}</h3>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Wind Speed: ${data.wind.speed} m/s</p>
                    <p>Condition: ${data.weather[0].description}</p>
                `;
            } else {
                alert("City not found!");
            }
        } catch (error) {
            alert("Error fetching weather data.");
        }
    }

    searchBtn.addEventListener("click", function () {
        if (cityInput.value) {
            fetchWeather(cityInput.value);
        } else {
            alert("Please enter a city name.");
        }
    });

    locationBtn.addEventListener("click", function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

                try {
                    const response = await fetch(url);
                    const data = await response.json();
                    currentWeatherDiv.innerHTML = `
                        <h3>${data.name}</h3>
                        <p>Temperature: ${data.main.temp}°C</p>
                        <p>Wind Speed: ${data.wind.speed} m/s</p>
                        <p>Condition: ${data.weather[0].description}</p>
                    `;
                } catch (error) {
                    alert("Error fetching weather data.");
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    });
});
