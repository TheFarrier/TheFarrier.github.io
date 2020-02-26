var schedule = [
  {
      hour : "9am",
      description : "Haircut",
      current : "past",
      time: 9
  },
  {
    hour : "10am",
    description : "Haircut",
    current : "past",
    time: 10
},
{
  hour : "11am",
  description : "Haircut",
  current : "present",
  time: 11
},
{
  hour : "12pm",
  description : "Haircut",
  current : "future",
  time: 12
},
{
  hour : "1pm",
  description : "Haircut",
  current : "future",
  time: 13
},
{
  hour : "2pm",
  description : "Haircut",
  current : "future",
  time: 14
},
{
  hour : "3pm",
  description : "Haircut",
  current : "future",
  time: 15
},
{
  hour : "4pm",
  description : "Haircut",
  current : "future",
  time: 16
},
{
  hour : "5pm",
  description : "Haircut",
  current : "future",
  time: 17
},
]

var currentHour = moment()._d.getHours();
console.log(currentHour);

function getSchedule(){
  // use JSON.parse and localStorage.get to retrive schedule
  // create schedule if it doesn't exist already
  // (moment.js) for each item in schedule set the status to present, past, or future depending on time of day
  return schedule
}

function saveSchedule(schedule){
  // localStorage.setItem and JSON.stringify
}

function renderSchedule(schedule){
  $(".container").empty()

  schedule.forEach(el => {
    var slot = $("<div>").addClass("timeblock row");
    var hour = $("<div>").addClass("hour col-sm-1").text(el.hour);
    var description = $("<textarea>").addClass("description col-sm-10").text(el.description);
    var saveBtn = $("<button>").addClass("saveBtn col-sm-1").text("Save").attr("hour",el.hour);

    //Set past present or future for description block
    if (el.time == currentHour){
      description.addClass("present");
    }else if(el.time <= currentHour){
      description.addClass("past");
    }else if(el.time >= currentHour){
      description.addClass("future");
    };

    //set click handler for save button
    $(".saveBtn").click(function(event) {
      
      // I have a data attribute called hour on each of my buttons
      // inside the click handler I navigate the tree using .parent() and .children to find my textarea
      // and I set the hour to the value of the textarea
      saveSchedule(schedule)
    })


    slot.append(hour, description, saveBtn);
    $(".container").append(slot);
  });
  // for each hour in the schedule, create a div with the bootstrap class 'row'
  // append 3 divs with the bootstrap 'col' classes to the above row 
  // these keep hour, text, and save button
  // I color the text column depending on status
  // $(".container").append($("<div>your row goes here<button class='save-btn'>save</button></div>"))
  // set on click handler for each save button
  
}

function main() {
  let schedule = getSchedule()
  renderSchedule(schedule)
}
  
  

$(document).ready(main)