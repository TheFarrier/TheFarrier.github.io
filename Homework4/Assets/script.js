var data = [
    {
        question : "This is Question 1?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer1",
    },
    {
        question : "This is Question 2?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer4",
    },
    {
        question : "This is Question 3?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer2",
    },
    {
        question : "This is Question 4?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer3",
    },
    {
        question : "This is Question 5?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer2",
    },
    {
        question : "This is Question 6?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer4",
    },
    {
        question : "This is Question 7?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer3",
    }
]

var score;

var counter = 0;
var time = 75;
var getQuestion = document.querySelector("#question");
var getOptions = document.querySelector("#answer");
var getTimer = document.querySelector("#timer");
var timerInterval;

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

if(localStorage.getItem("score") == null){
    score = [
        {
            name: "NKF",
            score: "20",
        }
    ];
    storeScore();
} else {
    score = localStorage.getItem("score")
}

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

    getOptions.innerHTML = "";
    getQuestion.innerHTML = "";

    console.log("Load Question");

    // Displays next question
    // var displayQuestion = document.createElement("h5");
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


function gameOver(){
    getOptions.innerHTML = "";
    clearInterval(timerInterval);

    displayQuestion.textContent = "Game Over";
    console.log("Game Over");
  }

function getScore(){
    document.querySelector("#initials").style.display = "block";
    document.querySelector("#initials").addEventListener("submit", function(event){
        event.preventDefault();
        var scoreText = document.querySelector("#score-text").value.trim();
        score.push({"name": scoreText, "score": time});
        storeScore();
    })
    console.log("Get Score");

}

function storeScore() {
    // Stringify and store the highScore array
    localStorage.setItem("scores", JSON.stringify(score));

    console.log(localStorage.getItem("scores"));
}

