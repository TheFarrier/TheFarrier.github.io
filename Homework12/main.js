const inquirer = require("inquirer");
const orm = require("./employeeRepo.js")

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
        await orm.getEmployees(sort);
        break;
      case "Update":
        await orm.updateItem();
        break;
      case "Add":
        await orm.addItem();
        break;
      case "Remove":
        await orm.deleteItem();
        break;
      case "Close":
        await orm.endConnection();
      default:
        console.log(action);
        break;
    }
  }
  catch (err){
    console.log("Error: " + err)
  }

}

init();