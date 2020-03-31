const fs = require("fs");
const html = require("./lib/htmlRenderer")
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// Inquirer question array
let id = 0
const employees = [];
const questions = [
  {
    message: "Employee's name:",
    name: "name"
  },
  {
    message: "Email address:",
    name: "email"
  },
  {
    message: "Role:",
    type: "list",
    name: "role",
    choices: ["Manager","Engineer","Intern"]
  },
  {
    message: "Engineer's Github username:",
    name: "github"
  },
  {
    message: "Mangager's office number:",
    name: "office"
  },
  {
    message: "Intern's school:",
    name: "school"
  },
];


// Use inquirer to ask how many employees you need to add
async function generateEmployee(){ 
  try {
    var newEmp = {};
    const {name} = await inquirer.prompt(questions[0]);
    const {email} = await inquirer.prompt(questions[1]);
    const {role} = await inquirer.prompt(questions[2]);
    id++;

    switch (role){
      case "Manager":
        const {office} = await inquirer.prompt(questions[4])
        newEmp = new Manager(name,id,email,office)
        break;

      case "Engineer":
        const {github} = await inquirer.prompt(questions[3])
        newEmp = new Engineer(name,id,email,github)
        break;
      case "Intern":
        const {school} = await inquirer.prompt(questions[5])
        newEmp = new Intern(name,id,email,school)
        break;
      default:
        console.log("Role invalid");
    }
    employees.push(newEmp);
    await init();
  }
    
  catch (err) {
    console.log(err);
  }
};

async function generateHtml(){
  console.log(employees);
  html(employees);
  console.log("Employee HTML created!");
}

async function init(){
  const {run} = await inquirer.prompt([
    {
      message:"Add new employee?",
      type:"list",
      choices:["Yes","No"],
      name: "run"
    }
  ])

  switch (run){
    case "Yes":
      generateEmployee();
      break;
    case "No":
      if(employees[0] !== undefined){
        generateHtml();
      } else {
        console.log("No employees to list")
      };
      break;
    default:
      console.log("Please make a decision")
  }
};

init();