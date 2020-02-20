var data = [
    {
        question : "What does Allegro Moderato mean?",
        options : ["Moderately Loud", "Moderately Quiet", "Moderately Quick", "Moderately Slow"],
        answer : "Moderately Quick",
    },
    {
        question : "What does accel. mean?",
        options : ["Gradually Quicker", "Gradually Slower", "Gradually Louder", "Gradually Angrier"],
        answer : "Gradually Quicker",
    },
    {
        question : "The numbers at the begining of a peice of music respresent the:",
        options : ["Beat", "Measure", "Time Signature", "Key Signature"],
        answer : "Time Signature",
    },
    {
        question : "What is the standard tuning of a guitar?",
        options : ["D A D G B E", "E A D G B E", "D A D G A D", "D G D G B D"],
        answer : "E A D G B E",
    },
    {
        question : "The musical term used to describe differences in volume is?",
        options : ["Loudness", "Volume", "Dynamics", "Resonance"],
        answer : "Dynamics",
    },
    {
        question : "A note played one half step higher is called:",
        options : ["Flat", "Sharp", "Suspended", "Dull"],
        answer : "Sharp",
    },
    {
        question : "What grade am I getting on this homework?",
        options : ["A", "B", "C", "D"],
        answer : "A",
    }
]

var score = [];
var counter = 0;
var time = 75;
var getQuestion = document.querySelector("#question");
var getOptions = document.querySelector("#answer");
var getTimer = document.querySelector("#timer");
var timerInterval;

// Creates the card that will house start button and Questions
var displayQuestion = document.createElement("h5");
displayQuestion.setAttribute("class","card-title");
displayQuestion.textContent = "Press Button to Start Quiz";
getQuestion.appendChild(displayQuestion)

//Start Button for quiz
var startButton = document.createElement('button');
startButton.setAttribute("class","btn btn-primary col-4 m-1");
startButton.textContent = "Start Quiz";
getOptions.appendChild(startButton);

startButton.addEventListener("click",loadQuestion);
startButton.addEventListener("click",timeTracker);

loadScores();

// Click event to check for correct answers
function buttonClick(event){
    
    // If correct, button turns green and loads next question
    if (event.target.textContent === data[counter].answer) {
        event.target.setAttribute("class","btn btn-success col-4 m-1");
        counter++;
        console.log(counter);
        console.log(data.length);

        if(counter >= data.length){
            gameOver();
            getScore();
        }else{
            setTimeout(loadQuestion, 250);
        }
        
    
    // If wrong, button turns red and reduces timer by 5, does not load next question
    } else {
        event.target.setAttribute("class","btn btn-danger col-4 m-1");
        time -= 5;
        getTimer.textContent = time;
    }
};



function loadQuestion() {

    // Clear html of previous question
    getOptions.innerHTML = "";
    getQuestion.innerHTML = "";

    console.log("Load Question");

    // Displays next question
    displayQuestion.textContent = data[counter].question;
    getQuestion.appendChild(displayQuestion);

    // Generates the 4 answer buttons
    for (var i = 0; i < data[counter].options.length; i++){
        var displayOptions = document.createElement('button');
        displayOptions.setAttribute("class","btn btn-primary col-4 m-1");
        displayOptions.setAttribute("onclick", "event.stopPropagation()")
        displayOptions.textContent = data[counter].options[i];
        displayOptions.addEventListener("click",buttonClick)
        getOptions.appendChild(displayOptions);
    
    }
}

// Starts countdown and calls gameOver(); when countdown reaches 0
function timeTracker() {
    timerInterval = setInterval(function(){
    time--;
      getTimer.textContent = time;
  
      if(time <= 0) {
        gameOver();
      }
    }, 1000);
    
  }

// Stops timer and removes question html when called
function gameOver(){
    getOptions.innerHTML = "";
    clearInterval(timerInterval);

    displayQuestion.textContent = "Game Over";
    console.log("Game Over");
  }

// Replaces Game Over card with high score form if all questions were answered
function getScore(){
    document.querySelector("#initials").style.display = "block";
    document.querySelector("#initials").addEventListener("submit", function(event){
        event.preventDefault();
        var scoreText = document.querySelector("#score-text").value.trim();
        score.push({"name": scoreText, "score": time});
        storeScore();
        document.location.href = "highscore.html";
    })

    console.log("Get Score");
}

// Stringify and store the highScore array
function storeScore() {
    localStorage.setItem("scores", JSON.stringify(score));

    console.log(localStorage.getItem("scores"));
}

// Loads scores from local storage if there are any
function loadScores() {
    var storedScores = JSON.parse(localStorage.getItem("scores"))

    if(storedScores !== null) {
        score = storedScores;
    }
}

