var data = [
    {
        question : "what is the question?",
        options : ["answer1", "answer2", "answer3", "answer4"],
        answer : "answer1",
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

// Click event to check for correct answers
getOptions.addEventListener("click",function(event){

    // If correct, button turns green and loads next question
    if (event.target.textContent === data[counter].answer) {
        event.target.setAttribute("class","btn btn-success col-4 m-1");
    
    // If wrong, button turns red and reduces timer by 5, does not load next question
    } else {
        event.target.setAttribute("class","btn btn-danger col-4 m-1");
        time -= 5;
        getTimer.textContent = time;
    }
});

// Starts countdown and calls gameOver(); when countdown reaches 0
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

  function gameOver(){
      
  }
  
timeTracker();

