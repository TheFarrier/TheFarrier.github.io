const fs = require("fs");
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
  for (var i =0; i<2; i++) { 
    try {
      var newEmp = {};
      const name = await inquirer.prompt(questions[0]);
      const email = await inquirer.prompt(questions[1]);
      const role = await inquirer.prompt(questions[2]);
      id++;
  
      switch (role.role){
        case "Manager":
          const office = await inquirer.prompt(questions[4])
          newEmp = new Manager(name,id,email,office)
          break;
  
        case "Engineer":
          const github = await inquirer.prompt(questions[3])
          newEmp = new Engineer(name,id,email,github)
          break;
        case "Intern":
          const school = await inquirer.prompt(questions[5])
          newEmp = new Intern(name,id,email,school)
          break;
        default:
          console.log("Role invalid");
      }
      
      // async function assignRole(role) {
      //   console.log(role)
      //   if(role == "Engineer"){
      //     const github = await inquirer.prompt(questions[3])
      //     return new Engineer(name, id, email,github);
      //   }
      //   if(role == "Manager"){
      //     const office = await inquirer.prompt(questions[4])
      //     return new Manager(name, id, email,office);
      //   }
      //   if(role == "Intern"){
      //     const school = await inquirer.prompt(questions[5])
      //     return new Intern(name, id, email,school);
      //   } else {
      //     console.log("Role invalid");
      //   }
      // }
      for (var key in newEmp){
        console.log(newEmp[key]);
      }
      employees.push(newEmp);
      }
      
    catch (err) {
      console.log(err);
    }
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
generateEmployee().then(()=> console.log(employees));