$(document).ready(function() {
    
var data = [];
var uvData = 0;
var cityName = "san-antonio";



$("#searchCity").submit(event =>{
    event.stopPropagation();
    event.preventDefault();
    cityName = $("#search-term").val();
    console.log(cityName);
    callAjax(cityName).then(response=>{
        callUV(data).then(response =>{
            renderCurrent();
            render5day();
            addHistory(cityName);
        });
        
    });
    
});

$(".list-group-item").click(function(event){
    event.stopPropagation();
    event.preventDefault();
    cityName = $(this).text();
    console.log(cityName);
    callAjax(cityName).then(response=>{
        callUV(data).then(response =>{
            renderCurrent();
            render5day();
            addHistory(cityName);
        });
    });
})

function addHistory(city){
    // Adds most recent search to history bar, if not already on there.
    console.log("History");
    var newBtn = $("<button type=\"button\" class=\"list-group-item list-group-item-action\">");
    newBtn.text(city);
    newBtn.attr("data", city.trim());
    $("#history").prepend(newBtn);

};

function renderCurrent(){
    // Renders jumbotron with current weather info
    console.log("renderCurrent")
    $("#city").text(data.city.name);
    $("#weather").attr("src", "http://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon +"@2x.png");
    $("#temp").text("Temperature: " + data.list[0].main.temp + " *F");
    $("#humidity").text("Humidity: " + data.list[0].main.humidity +"%");
    $("#windspeed").text("Wind Speed: " + data.list[0].main.humidity +" MPH");
    $("#index").text("UV Index: ");
    
    var uv = $("<span class=\"badge\" >").text("uvData");

    if(uvData < 3){
        uv.addClass("badge-primary").text(uvData);
    } else if (3 <= uvData && uvData < 6) {
        uv.addClass("badge-success").text(uvData);
    } else if (6 <= uvData && uvData < 8) {
        uv.addClass("badge-warning").text(uvData);
    } else if (7 < uvData) {
        uv.addClass("badge-danger").text(uvData);
    }
    
    $("#index").append(uv);
};

function render5day (){
    // Renders the 5 day forcast as cards below the current day forecast
    console.log(data);
    $("#5day").empty();
        for(var i = 0; i<40; i+=8){
            console.log("New card");
            var newCard = $("<div class= \"card text-center\" style=\"width: 14rem; margin: 1rem;\">");
            var newBody = $("<div class= \"card-body\">");
            var cardDate =$("<h5 class= \"card-title\">").text(data.list[i].dt_txt);
            var cardIcon = $("<img src= \"http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +"@2x.png\">");
            var cardTemp = $("<p class = \"card-text\">").text("Temp: " + data.list[i].main.temp +"*F");
            var cardHumid = $("<p class = \"card-text\">").text("Humidity: " + data.list[i].main.humidity + "%"); 
    
            newCard.append(newBody.append(cardDate, cardIcon, cardTemp, cardHumid));
            $("#5day").append(newCard);
    
    };

    
};

function callAjax(city){
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=b9a139b4b9cb18b6bfa3c4eb318e8ce0";
    return $.ajax({
        url: queryURL,
        method: "GET"
    }).then(response =>{
        data = response;
    
    });

}

function callUV(data) {
    return $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + data.city.coord.lat +"&lon=" + data.city.coord.lon + "&appid=b9a139b4b9cb18b6bfa3c4eb318e8ce0",
        method: "GET"
    }).then(response =>{
        uvData = response.value;
        console.log(response);
    });
}


callAjax(cityName).then(function(){
    callUV(data).then(function(){
        render5day();
        renderCurrent();
    });
    
});

   
   });


