// Get the current date
var rightNow = moment().format("MMMM Do, YYYY");

// Get city entered by user
var city="";
var getCity = function() {
city = document.getElementById("searchCity").value;
console.log(city);

// Call getCityCoord function to obtain coordinates of city
getCityCoord(city);
};

// getCityCoord function to get coordinates for the requested city to pass to the next api
function getCityCoord(city){
fetch(
    "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=7564c2bdba64a11de407d11468e95f3d"
    )
.then(
    function(res) {
    return res.json();
    })
      .then (function(data) {
            // extract the lat and lon coordinates
            const {coord} =data
            const { lon, lat} = coord
            console.log("getCityCoord",data)
            console.log(data.coord.lon,data.coord.lat);
        // call getWeather function passing the lat and lon coordinates
        getWeather (lat, lon);
    });
}
// getWeather function to get the temp, wind, humidity, uv index and 5-day forecast for the requested city
function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=7564c2bdba64a11de407d11468e95f3d`
        )
    .then(
        function(res) {
            return res.json();
        })
          .then (function(data) {
            // extract the current temp, wind, humidity and uv index  
            console.log("getWeather function",data);
            document.getElementById("cityDate").innerText=city + ", Current Weather " + rightNow;
            document.getElementById("temp").innerText="Temp: " + data.current.temp + "K";
            document.getElementById("wind").innerText="Wind: " + data.current.wind_speed + "MPH";
            document.getElementById("humidity").innerText="Humidity: " + data.current.humidity + "%";
            document.getElementById("uv").innerText="UV Index: " + data.current.uvi;
        // call the fiveDayForecast function
        fiveDayForecast (data);
        });   
}       
        // extract the current temp, wind, and humidity looping for 5 days
        var i=0;
        var fiveDayForecast = function(data) {
        document.getElementById("fiveTitle").innerText="Five Day Forecast";
        for (i=0; i<5; i++) {
        var fiveDay = (moment().add(i+1,'days').format("MMMM Do, YYYY"));
        console.log(fiveDay);
        
        document.getElementById("fiveDate").innerText=fiveDay;
        //document.getElementById("fiveIcon").innerText=data.daily[i].weather[i].icon;
        document.getElementById("fiveTemp").innerText="Temp: " + data.daily[i].temp.day + "K";
        document.getElementById("fiveWind").innerText="Wind: " + data.daily[i].wind_speed + "MPH";
        document.getElementById("fiveHumidity").innerText="Humidity: " + data.daily[i].humidity + "%";
        console.log(data.daily[i].temp.day);
        }
}

// Implement local storage for history.

