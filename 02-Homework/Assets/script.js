var currentHour = moment()._d.getHours();
var currentDay = moment()._d.getDay();
console.log(moment()._d.toDateString());

$(".clearBtn").click(function(event){
  localStorage.clear();
  renderSchedule(getSchedule());
})

function getSchedule(){
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  var currentDay = localStorage.getItem("date");
  $("#currentDay").text(moment()._d.toDateString());
  
  if (currentDay != moment()._d.toDateString()){
    //clear the schedule because it is not the same day as the stored schedule
    localStorage.clear();
    localStorage.setItem("date", moment()._d.toDateString());
  }

  // Use stored Schedule if one exists
  if (schedule != null){
    return schedule;
  } else {
    // Create empty schedule from 9am to midnight
    schedule = [];
    for(i=9; i<=24; i++){
      if(i <= 11){
        schedule.push({"hour": i + "am", "description": "", "time": i});
      } else if (i == 12){
        schedule.push({"hour": i + "pm", "description": "", "time": i});
      } else if (12 < i < 23){
        schedule.push({"hour": (i-12) + "pm", "description": "", "time": i});
      } else if (i == 24){
        schedule.push({"hour": (i-12) + "am", "description": "", "time": i});
      };
    };
    console.log(schedule);
    return schedule;
  }
}

function saveSchedule(schedule){
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
  renderSchedule(getSchedule());
}
  
  

$(document).ready(main)