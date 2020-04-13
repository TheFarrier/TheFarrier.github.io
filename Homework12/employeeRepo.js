const mysql = require("mysql")
const inquirer = require("inquirer")

const connection = mysql.createConnection({
  host:"localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "employeeRepo_db"
});

connection.connect(function(err){
  if(err) throw err;
  console.log(`connected as id + ${connection.threadId}`);
});

//--- export functions in a class

connection.query = util.promisify(connection.query)

function getDepartments(){
  const data = await connection.query("SELECT * FROM department", function(err,result){
    if (err) throw err;
    return result;
  });
};

function getRoles(){
  const data = await connection.query("SELECT * FROM role", function(err,result){
    if (err) throw err;
    return result;
  });
}

function getEmployees(){
  const data = await connection.query("SELECT * FROM employee", function(err,result){
    if (err) throw err;
    return result;
  });
}

// for each employee, push employee.name into array. use that array for inquirer choices