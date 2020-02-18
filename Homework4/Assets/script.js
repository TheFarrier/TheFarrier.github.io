var data = [
    {
        question : "what is the question?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer1234",
    },
    {
        question : "what is the question?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer1234",
    }
]

var counter = 0;
var time = 75;
var getQuestion = document.querySelector("#question");
var getOptions = document.querySelector("#answer");
var getTimer = document.querySelector("#timer");

var displayQuestion = document.createElement("h5");
displayQuestion.setAttribute("class","card-title")
displayQuestion.textContent = data[counter].question;
getQuestion.appendChild(displayQuestion);

for (var i = 0; i < data[counter].options.length; i++){
    var displayOptions = document.createElement('button');
    displayOptions.setAttribute("class","btn btn-primary col-4 m-1");
    displayOptions.textContent = data[counter].options[i];
    getOptions.appendChild(displayOptions);

}

getOptions.

function timeTracker() {
    var timerInterval = setInterval(function() {
      time--;
      getTimer.textContent = time;
  
      if(time === 0) {
        clearInterval(timerInterval);
        gameOver();
      }
  
    }, 1000);
  }
  


