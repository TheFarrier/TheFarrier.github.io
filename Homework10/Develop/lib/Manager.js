// Engineer
const Employee = require('./Employee.js')

class Manager extends Employee{
  constructor(name,id,email,num){

    super(name,id,email);
    this.officeNumber = num;
    this.role = "Manager"
  }

  getOfficeNumber(){
    return this.officeNumber;
  }
}

module.exports = Manager