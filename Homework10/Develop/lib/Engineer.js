// Engineer
const Employee = require('./Employee.js')

class Engineer extends Employee{
  constructor(){

    super();
    this.github = github;
  }
  
  getGithub(){

  }

  getRole(){
    return 'Engineer'
  }
}

module.exports = Engineer