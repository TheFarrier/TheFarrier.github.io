$(document).ready(function() {
    
    // data stores the JSON object returned from daily weather API call
    var data = [];
    // uvData stores UV index number from UV index API call
    var uvData = 0;
    // Used as the search term for API call
    var cityName = "san antonio";

    // Submit event for the search bar and button
    $("#searchCity").submit(event =>{
    
        event.stopPropagation();
        event.preventDefault();
        // Gets city name from the the search bar
        cityName = $("#search-term").val();
        // Passes new city name for API call and re-renders information
        callAjax(cityName).then(function(){
            callUV(data).then(function(){
                renderCurrent();
                render5day();
                addHistory(cityName);
            }); 
        });
    });

    // Click event to reuse cities saved in history
    $(".list-group-item").click(function(event){
    
        event.stopPropagation();
        event.preventDefault();
        // Gets city name from the button's text
        cityName = $(this).text();
        // Passes new city name for API call and re-renders information
        callAjax(cityName).then(function(){
            callUV(data).then(function(){
                renderCurrent();
                render5day();
                addHistory(cityName);
            });
        });
    })


    function addHistory(city){
        // Adds most recent search to history bar, if not already on there.
        var newBtn = $("<button type=\"button\" class=\"list-group-item list-group-item-action\">");
        
        newBtn.text(city);
        newBtn.attr("data", city);
        
        $("#history").prepend(newBtn);
    };

    // Renders jumbotron with current weather info
    function renderCurrent(){
        
        $("#city").text(data.city.name);
        $("#weather").attr("src", "http://openweathermap.org/img/wn/"+ data.list[0].weather[0].icon +"@2x.png");
        $("#temp").text("Temperature: " + data.list[0].main.temp + " *F");
        $("#humidity").text("Humidity: " + data.list[0].main.humidity +"%");
        $("#windspeed").text("Wind Speed: " + data.list[0].main.humidity +" MPH");
        $("#index").text("UV Index: ");
        
        var uv = $("<span class=\"badge\" >").text("uvData");
        
        // Checks UV index and colors the badge based on its intensity
        if(uvData < 3){
            uv.addClass("badge-primary").text(uvData);
        } else if (3 <= uvData && uvData < 6) {
            uv.addClass("badge-success").text(uvData);
        } else if (6 <= uvData && uvData < 8) {
            uv.addClass("badge-warning").text(uvData);
        } else if (7 < uvData) {
            uv.addClass("badge-danger").text(uvData);
        };
        
        // Adds UV index badge to the same line as its label
        $("#index").append(uv);
    };

    // Renders the 5 day forcast as cards below the current day forecast
    function render5day (){
    
        $("#5day").empty();

        // The Weather API delivers data for 3 hour increments over 5 days, so this loop skips by 8 to render the same time of day for each of the 5 days
        for(var i = 0; i<40; i+=8){
            
            var newCard = $("<div class= \"card text-center\" style=\"width: 14rem; margin: 1rem;\">");
            var newBody = $("<div class= \"card-body\">");
            var cardDate =$("<h5 class= \"card-title\">").text(data.list[i].dt_txt);
            var cardIcon = $("<img src= \"http://openweathermap.org/img/wn/"+ data.list[i].weather[0].icon +"@2x.png\">");
            var cardTemp = $("<p class = \"card-text\">").text("Temp: " + data.list[i].main.temp +"*F");
            var cardHumid = $("<p class = \"card-text\">").text("Humidity: " + data.list[i].main.humidity + "%"); 

            $("#5day").append(newCard.append(newBody.append(cardDate, cardIcon, cardTemp, cardHumid)));
        };
    };

    // Function to call daily weather API, passing in city name from search bar or history buttons
    function callAjax(city){
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=b9a139b4b9cb18b6bfa3c4eb318e8ce0";
        return $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(response =>{
                data = response;
            });
    };


    // The ajax call for UV Index API requires the coordinate data from the Daily Weather API
    function callUV(data) {
        return $.ajax({
            url: "https://api.openweathermap.org/data/2.5/uvi?lat=" + data.city.coord.lat +"&lon=" + data.city.coord.lon + "&appid=b9a139b4b9cb18b6bfa3c4eb318e8ce0",
            method: "GET"
        })
            .then(response =>{
                uvData = response.value;
            });
    };

    // Initializes page with default city name
    callAjax(cityName).then(function(){
        callUV(data).then(function(){
            render5day();
            renderCurrent();
        });
    });

   
});


