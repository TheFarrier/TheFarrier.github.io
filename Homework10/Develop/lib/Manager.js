// Engineer
const Employee = require('./Employee.js')

class Manager extends Employee{
  constructor(name,id,email,num){

    super(name,id,email);
    this.officeNumber = num;
  }

  getOfficeNumber(){
    return this.officeNumber;
  }
  
  getRole(){
    return 'Manager'
  }
}

module.exports = Manager