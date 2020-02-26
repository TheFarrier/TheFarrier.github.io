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

    array.forEach(hour => {
        var slot = $("<div>");
        $(".container").append(slot);
        
    });
    // for each hour in the schedule, create a div with the bootstrap class 'row'
    // append 3 divs with the bootstrap 'col' classes to the above row 
    // these keep hour, text, and save button
    // I color the text column depending on status
    $(".container").append($("<div>your row goes here<button class='save-btn'>save</button></div>"))
    // set on click handler for each save button
    $(".saveBtn").click(function(event) {
      // I have a data attribute called hour on each of my buttons
      // inside the click handler I navigate the tree using .parent() and .children to find my textarea
      // and I set the hour to the value of the textarea
      saveSchedule(schedule)
    })
  }

  function main() {
    let schedule = getSchedule()
    renderSchedule(schedule)
  }
  
  $(document).ready(main)