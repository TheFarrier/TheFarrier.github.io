const inquirer = require("inquirer");
const orm = require("./employeeRepo.js")

let employeeArray = []
let roleArray = []

const questions = [
  {
    message: "What would you like to do?",
    type: "list",
    name: "action",
    choices: ["View Employees","Update","Add", "Remove"]
  },
  {
    message: "Choose how they will be sorted.",
    type: "list",
    name: "sort",
    choices: ["first_name","last_name","department","manager"]
  }
];

async function init(){
  try{
    const {action} = await inquirer.prompt(questions[0])

    switch (action){
      case "View Employees": 
      const {sort} = await inquirer.prompt(questions[1])
        getEmployees(sort);
        break;
      case "Update":
        updateItem();
        break;
      case "Add":
        addItem();
        break;
      case "Remove":
        deleteItem();
        break;
      default:
        console.log(action);
        break;
    }
  }
  catch (err){
    console.log("Error: " + err)
  }

}
