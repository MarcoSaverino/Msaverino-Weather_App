//My weather Application
function addResult(){

    inputCity = document.getElementById("my-Input").value;  
    historyInfo = getInfo();
    var citySearch =$("<div>") 
    citySearch.attr('id',inputCity) 
    citySearch.text(inputCity) 
    citySearch.addClass("h4")

    
    if (historyInfo.includes(inputCity) === false){
        $(".history").append(citySearch)
    }
    $(".subtitle").attr("style","display:inline")
    addInfo(inputCity);
    
}; 

//add click to search history items
$(".history").on('click', function(event){
    event.preventDefault();
    $(".subtitle").attr("style","display:inline")
     document.getElementById("my-Input").value =  event.target.id;
    getResult(); 
});

//Event listner for search buttons
document.getElementById("search-Btn").addEventListener("click", addResult);
document.getElementById("search-Btn").addEventListener('click', getResult);

//Weather forecast items
function getResult(){   

    $(".five_day").empty();
    $(".city").empty()

   inputCity = document.getElementById("my-Input").value;   
    var countryCode='US';    
    var cityCode=inputCity;       
    
    var geoLongitude;   
    var geoLatitude;
    
    var cityName =$("<h>")    
    cityName.addClass("h3")  
    var temp = $("<div>")    
    var wind = $("<div>")    
    var humidity = $("<div>")   
    var icon =$("<img>")
    icon.addClass("icon");    
    var dateTime = $("<div>")

    $(".city").addClass("list-group")
    $(".city").append(cityName)    
    $(".city").append(dateTime)    
    $(".city").append(icon)    
    $(".city").append(temp)    
    $(".city").append(wind)    
    $(".city").append(humidity)    
 
    
    
    var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityCode + "," + countryCode + "&limit=5&appid=49cc8c821cd2aff9af04c9f98c36eb74"
        
 
      fetch(geoUrl)
    

        .then(function (response) {
          return response.json();
        })
    
        .then(function (data) {
          geoLongitude = data[0].lon;
          geoLatitude = data[0].lat;
    
          //use Lattitude and Longitude to fetch weather
          var weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + geoLatitude + "&lon="+ geoLongitude + "&exclude=minutely,hourly,alerts&units=metric&appid=49cc8c821cd2aff9af04c9f98c36eb74";
            
          fetch(weatherUrl)

          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
 
            
            weatherIcon= data.current.weather[0].icon;
            imgSrc = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";
            icon.attr('src',imgSrc)
        
            cityName.text(cityCode);

            var date = new Date(data.current.dt * 1000);
            dateTime.text("("+ (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + ")");

            temp.text("Temperature: "+ data.current.temp + " C");
            humidity.text("Humidity: " + data.current.humidity + " %");
            wind.text("Wind Speed: " + data.current.wind_speed + " MPH");


            // Five day weather forecast
            for (var i=1;i<6;i++){

                var blueContainer = $("<div>")
                this["futureDate"+i] = $("<h>")
                this["futureIcon"+i] = $("<img>")
                this["futureTemp"+i] = $("<div>")
                this["futureWind"+i] = $("<div>")
                this["futureHumidity"+i] = $("<div>")
                //translate utc to date
                this["forecastDay"+i] = new Date(data.daily[i].dt * 1000);     
     
                (this["futureDate"+i]).text(((this["forecastDay"+i]).getMonth()+1) + "/" + (this["forecastDay"+i]).getDate() + "/" + (this["forecastDay"+i]).getFullYear());
                (this["futureTemp"+i]).text("Temperature: "+ data.daily[i].temp.day + " C");
                (this["futureWind"+i]).text("Wind: "+ data.daily[i].wind_speed+ " MPH");
                (this["futureHumidity"+i]).text("Humidity: " + data.daily[i].humidity + " %");
                (this["weatherIcon"+i])= data.daily[i].weather[0].icon;
        
                DateimgSrc = "https://openweathermap.org/img/wn/" + (this["weatherIcon"+i]) + ".png";  
                (this["futureIcon"+i]).attr('src',DateimgSrc)

                $(".five_day").append(blueContainer)
                blueContainer.append((this["futureDate"+i]));
                blueContainer.append((this["futureIcon"+i]));
                blueContainer.append((this["futureTemp"+i]));
                blueContainer.append((this["futureWind"+i]));
                blueContainer.append((this["futureHumidity"+i]));

                blueContainer.addClass("weather-card")
            }

          })
    })
}

//Search history local storage
function getInfo() {
    var currentList =localStorage.getItem("city");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
}

function addInfo (n) {
    var addedList = getInfo();

    if (historyInfo.includes(inputCity) === false){
        addedList.push(n);
    }
   
    localStorage.setItem("city", JSON.stringify(addedList));
};

function renderInfo () {
    var historyInfo = getInfo();
    for (var i = 0; i < historyInfo.length; i++) {
        var inputCity = historyInfo[i];
        var citySearch =$("<div>") 
        citySearch.attr('id',inputCity) 
        citySearch.text(inputCity) 
        citySearch.addClass("h4")

        $(".history").append(citySearch)
    }
};

renderInfo();
