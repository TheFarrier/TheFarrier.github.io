    // This is our API key. Add your own API key between the ""
    var APIKey = "b9a139b4b9cb18b6bfa3c4eb318e8ce0";

    // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=Bujumbura,Burundi&appid=" + APIKey;

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      // Create CODE HERE to Log the queryURL
      console.log(queryURL);
      // Create CODE HERE to log the resulting object
      console.log(response);
      // Create CODE HERE to transfer content to HTML
      $("#city").text(response.name);
      $(".wind").text(response.wind.speed);
      $(".humidity").text(response.main.humidity);
      $(".temp").text(response.main.temp);
      // Create CODE HERE to calculate the temperature (converted from Kelvin)
      // Hint: To convert from Kelvin to Fahrenheit: F = (K - 273.15) * 1.80 + 32
      var temperature = (response.main.temp - 273.15) * 1.8 + 32;
      // Create CODE HERE to dump the temperature content into HTML
      $(".temp").text(temperature.toFixed(2));
    });

    $("#srchBtn").on("click,", event =>{
        renderCurrent();
        render5day();
        addHistory();
    })

    function addHistory(){
        // Adds most recent search to history bar, if not already on there.
    };

    function renderCurrent(){
        // Renders jumbotron with current weather info
    };

    function render5day (){
        // Renders the 5 day forcast as cards below the current day forecast
    };

