var currentHour = moment()._d.getHours();
var todaysDate = moment()._d.toDateString();
console.log(todaysDate);

$(".clearBtn").click(function(event){
  localStorage.clear();
  renderSchedule(getSchedule());
})

function getSchedule(){
  var schedule = JSON.parse(localStorage.getItem("schedule"));
  var currentDay = localStorage.getItem("date");
  $("#currentDay").text(todaysDate);
  
  if (currentDay != todaysDate){
    //clear the schedule because it is not the same day as the stored schedule
    localStorage.clear();
    localStorage.setItem("date", todaysDate);
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

  // For each hour in schedule, create a new div row
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

    //set click handler for each save button
    saveBtn.click(function(event) {
      var getNewText = $(this).siblings("textarea").val();
      var getThisButton = $(this).attr("hour");
      // Only changes the description for the hour that matches the button's hour data element
      schedule.forEach(el => {
        if(el.time == getThisButton)
        el.description = getNewText;
      })
      
      event.stopPropagation();
      renderSchedule(schedule);
      saveSchedule(schedule);
    })


    slot.append(hour, text, saveBtn);
    $(".container").append(slot);
  });
  
}

function main() {
  renderSchedule(getSchedule());
}
  
  

$(document).ready(main)