const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

// Inquirer question array
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
    const name = await inquirer.prompt(questions[0]);
    const email = await inquirer.prompt(questions[1]);
    const role = await inquirer.prompt(questions[2]);

    }
    
  catch (err) {
    console.log(err);
  }
};
// Inquirer loop that asks for employee information
// role
// name
// id
// email
// github if engineer
// office number if manager
// school if student

generateEmployee();