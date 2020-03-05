$(document).ready(function() {
    
    var data = [];
var cityName = "san-antonio";



$("#searchCity").submit(event =>{
    event.stopPropagation();
    event.preventDefault();
    cityName = $("#search-term").val();
    console.log(cityName);
    callAjax(cityName);
    renderCurrent();
    render5day();
    addHistory();
    console.log(data);
});

function addHistory(){
    // Adds most recent search to history bar, if not already on there.
};

function renderCurrent(){
    // Renders jumbotron with current weather info
    console.log("renderCurrent")
    $("#city").text(data.city.name);
    $("#temp").text("Temperature:" + ((data.list[0].main.temp - 237.15) * 1.8 + 32).toFixed(2)+" *F");
    $("#humidity").text("Humidity: " + data.list[0].main.humidity +"%");
    $("#windspeed").text("Wind Speed: " + data.list[0].main.humidity +" MPH");
    $("#index").text("UV Index: ");

};

function render5day (){
    // Renders the 5 day forcast as cards below the current day forecast
    console.log(data);
    
        for(var i = 0; i<5; i++){
            console.log("New card");
            var newCard = $("<div class= \"card text-center\" style=\"width: 14rem; margin: 1rem;\">");
            var newBody = $("<div class= \"card-body\">");
            var cardDate =$("<h5 class= \"card-title\">").text(data.list[i].dt_txt);
            var cardIcon = $("<img src= \"http://openweathermap.org/img/wn/10d@2x.png\">");
            var cardTemp = $("<p class = \"card-text\">").text("Temp: " + ((data.list[i].main.temp - 237.15) * 1.8 + 32).toFixed(2));
            var cardHumid = $("<p class = \"card-text\">").text("Humidity: " + data.list[i].main.humidity + "%"); 
    
            newCard.append(newBody.append(cardDate, cardIcon, cardTemp, cardHumid));
            $("#5day").append(newCard);
    
    };

    
};

function callAjax(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=b9a139b4b9cb18b6bfa3c4eb318e8ce0";
    return $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response =>{
        data = response;
    });
}

callAjax(cityName).then(response =>{
    render5day();
    renderCurrent();
});

   
   });


