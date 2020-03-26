// Engineer
const Employee = require('./Employee.js')

class Manager extends Employee{
  constructor(){

    super();
    this.officeNumber = num;
  }
  
  getRole(){
    return 'Manager'
  }
}

module.exports = Manager