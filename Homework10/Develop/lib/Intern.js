// Intern
const Employee = require('./Employee.js')

class Intern extends Employee{
  constructor(){

    super();
    this.school = school;
  }
  
  getSchool(){

  }

  getRole(){
    return 'Intern'
  }
}

module.exports = Intern