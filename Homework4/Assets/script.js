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
var getQuestion = document.querySelector("#question");
var getOptions = document.querySelector("#answer");

var displayQuestion = document.createElement("h5");
displayQuestion.setAttribute("class","card-title")
displayQuestion.textContent = data[counter].question;
getQuestion.appendChild(displayQuestion);

for (var i = 0; i < data[counter].options.length; i++){
    var displayOptions = document.createElement('button');
    displayOptions.setAttribute("class","btn btn-primary");
    displayOptions.textContent = data[counter].options[i];
    getOptions.appendChild(displayOptions);


}

