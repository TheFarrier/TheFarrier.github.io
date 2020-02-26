// var schedule = [
//   {
//       hour : "9am",
//       description : "Haircut",
//       time: 9
//   },
//   {
//     hour : "10am",
//     description : "Haircut",
//     time: 10
//   },
//   {
//     hour : "11am",
//     description : "Haircut",
//     time: 11
//   },
//   {
//     hour : "12pm",
//     description : "Haircut",
//     time: 12
//   },
//   {
//     hour : "1pm",
//     description : "Haircut",
//     time: 13
//   },
//   {
//     hour : "2pm",
//     description : "Haircut",
//     time: 14
//   },
//   {
//     hour : "3pm",
//     description : "Haircut",
//     time: 15
//   },
//   {
//     hour : "4pm",
//     description : "Haircut",
//     time: 16
//   },
//   {
//     hour : "5pm",
//     description : "Haircut",
//     time: 17
//   },
// ]

var currentHour = moment()._d.getHours();
console.log(currentHour);

function getSchedule(){
  var schedule = [];
  schedule = JSON.parse(localStorage.getItem("schedule"));

  if (schedule != null){
    return schedule;
  } else {
    schedule = [];
    for(i=9; i<=25; i++){
      if(i <= 11){
        schedule.push({"hour": i + "am", "description": "", "time": i});
      } else if (i == 12){
        schedule.push({"hour": i + "pm", "description": "", "time": i});
      } else if (i >= 12){
        schedule.push({"hour": (i-12) + "pm", "description": "", "time": i});
      };
    };
    console.log(schedule);
    return schedule;
  }
  // use JSON.parse and localStorage.get to retrive schedule
  // create schedule if it doesn't exist already
  // (moment.js) for each item in schedule set the status to present, past, or future depending on time of day
}

function saveSchedule(schedule){
  // localStorage.setItem and JSON.stringify
  localStorage.setItem("schedule", JSON.stringify(schedule))
}



function renderSchedule(schedule){
  $(".container").empty()

  schedule.forEach(el => {
    var slot = $("<div>").addClass("timeblock row");
    var hour = $("<div>").addClass("hour col-sm-1").text(el.hour);
    var text = $("<textarea>").addClass("description col-sm-10").text(el.description);
    var saveBtn = $("<button>").addClass("saveBtn col-sm-1").text("Save").attr("hour",el.time);

    //Set past present or future for description block
    if (el.time == currentHour){
      text.addClass("present");
    }else if(el.time <= currentHour){
      text.addClass("past");
    }else if(el.time >= currentHour){
      text.addClass("future");
    };

    //set click handler for save button
    saveBtn.click(function(event) {
      var getNewText = $(this).siblings("textarea").val();
      console.log(getNewText);
      var getThisButton = $(this).attr("hour");
      console.log(getThisButton);
      schedule.forEach(el => {
        if(el.time == getThisButton)
        el.description = getNewText;
      })
      event.stopPropagation();
      console.log(el.description);
      // I have a data attribute called hour on each of my buttons
      // inside the click handler I navigate the tree using .parent() and .children to find my textarea
      // and I set the hour to the value of the textarea
      renderSchedule(schedule)
      saveSchedule(schedule)
    })


    slot.append(hour, text, saveBtn);
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