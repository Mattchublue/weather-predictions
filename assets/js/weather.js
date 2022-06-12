$("#add-city").on("click", function(){
    var cityValue=$("#city-input").val()
    console.log(cityValue)
getCity(cityValue)

})

function getCity(cityValue){
    $.ajax({
        type:"GET" , 
        url: "https://api.openweathermap.org/data/2.5/forecast?q="+cityValue+"&appid=7ebc3a88ffa7e70c04212f79bdad7b06"
    }).then(
        response=>{
            console.log(response)
            getWeather(response.city.coord.lat,response.city.coord.lon)
            getForecast(response.city.coord.lat,response.city.coord.lon)
        }
    )
}


function getWeather(lat, lon){
    $.ajax({
        type:"GET" , 
        url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&units=imperial&appid=7ebc3a88ffa7e70c04212f79bdad7b06"
    }).then(
        response=>{
            console.log(response)

            // cityTitle = $("<h3>").text(response.name + " "+ FormatDay());
            // $("#today-weather").append(cityTitle);
            var cityTemperature = $("<p>").text("Temperature: "+ response.current.temp + " °F");
            $("#today-weather").append(cityTemperature);
            var cityHumidity = $("<p>").text("Humidity: "+ response.current.humidity + " %");
            $("#today-weather").append(cityHumidity);
            var cityWindSpeed = $("<p>").text("Wind Speed: "+ response.current.wind_speed + " MPH");
            $("#today-weather").append(cityWindSpeed);
        }
    )
}

function getForecast(lat, lon){
    $.ajax({
        type:"GET" , 
        url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=7ebc3a88ffa7e70c04212f79bdad7b06"
    }).then(
        response=>{
            console.log(response)
            for(var i=0; i<response.daily.length-3; i++){
                var FivedayDiv = $("<div>");
                    FivedayDiv.attr("class","col-3 m-2 bg-primary")
                var TemperatureK = response.daily[i].temp.day;
                    var TemperatureToNum = parseInt((TemperatureK)* 9/5 - 459);
                    var Temperature = $("<p>").text("Temperature: "+ TemperatureToNum + " °F");
                    var Humidity = $("<p>").text("Humidity: "+ response.daily[i].humidity + " %");
                    // FivedayDiv.append(Fivedayh4);
                    // FivedayDiv.append(imgtag);
                    FivedayDiv.append(Temperature);
                    FivedayDiv.append(Humidity);
                    $("#boxes").append(FivedayDiv);
            }
        }
    )
}