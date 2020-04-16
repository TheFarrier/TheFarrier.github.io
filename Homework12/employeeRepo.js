const mysql = require("mysql")
const inquirer = require("inquirer")
const cTable = require("console.table")
const util = require("util")

let testArray = [1];

const connection = mysql.createConnection({
  host:"localhost",
  port: 3306,
  user: "root",
  password: "tetris56",
  database: "employeeRepo_db"
});

connection.connect(function(err){
  if(err) throw err;
  console.log(`connected as id + ${connection.threadId}`);
});

//--- export functions in a class

connection.query = util.promisify(connection.query)

var orm = {
  getEmployees: async function(sort){
    try{
      const result = await connection.query(
        `SELECT e1.id, e1.first_name, e1.last_name, title, salary, department, CONCAT(e2.first_name, " ", e2.last_name) AS manager
          FROM employee as e1
            LEFT JOIN employee as e2
              ON e1.manager_id = e2.id
            INNER JOIN role AS r
              ON e1.role_id = r.id
            INNER JOIN departments AS d
              ON r.department_id = d.id 
            ORDER BY ${sort}`);
          const table = cTable.getTable(result);
          console.log(table);
    }
    catch (err){
      console.log (err);
    }
  },
  getTable: async function(tbl){
    try{
      const result = await connection.query(
        `SELECT * FROM ${tbl}`);
          const table = cTable.getTable(result);
          console.log(table);
          return result;
    }
    catch (err){
      console.log (err);
    }
  },
  addItem: async function(){
    try{
      const {addTable} = await inquirer.prompt([
        {
          name: 'addTable',
          type: "list",
          message: "What table would you like add to?",
          choices:["employee","departments","role"]
        }
      ])
    
        switch (addTable){
          case "employee": 
            addEmployee();
            break;
          case "departments":
            addDepartment();
            break;
          case "role":
            addRole();
            break;
          default:
            console.log(addTable);
            break;
        }
    }
    catch (err){
      console.log (err);
    }
  },
  addEmployee: async function(){
    try{
      let data = await getTable("employee");

      let questions = [
        {
          name: 'firstName',
          message: "Enter employee\'s first name: ",
        },
        {
          name: 'lastName',
          message: 'Enter employee\'s last name: ',
        },
        {
          name: 'roleId',
          message: 'Select employee role ID:',
        },
        {
          name: 'managerId',
          message: 'Select employee manager ID',
        }
      ]
      
      const {firstName} = await inquirer.prompt(questions[0]);
      const {lastName} = await inquirer.prompt(questions[1]);
      await getTable("role");
      const {roleId} = await inquirer.prompt(questions[2]);
      await getTable("employee");
      const {managerId} = await inquirer.prompt(questions[3]);
      
      await connection.query(
        "INSERT INTO employee set ?",
        {
          first_name: firstName,
          last_name: lastName,
          role_id: roleId,
          manager_id: managerId
        },
        function(err,res) {
          if (err) throw err;
          console.log(res.affectedRows + " item inserted!\n");
        }
      )
    }
    catch (err){
      console.log (err);
    }
  },
  addRole: async function(){
    try{
      let data = await getTable("departments");
      let depChoices = data.map(x => x.id);
      await getTable("role")
    
      let questions = [
        {
          name: 'title',
          message: "Enter role title: ",
        },
        {
          name: 'salary',
          message: 'Enter role salary: ',
        },
        {
          name: 'departmentId',
          type: "list",
          message: 'Under which department is this role?',
          choices: depChoices
        }
      ]
      
      const {title} = await inquirer.prompt(questions[0]);
      const {salary} = await inquirer.prompt(questions[1]);
      await getTable("departments");
      const {departmentId} = await inquirer.prompt(questions[2]);
      
      await connection.query(
        "INSERT INTO role set ?",
        {
          title: title,
          salary: salary,
          department_id: departmentId
        },
        function(err,res) {
          if (err) throw err;
          console.log(res.affectedRows + " item inserted!\n");
        }
      )
    }
    catch (err){
      console.log (err);
    }
  },
  addDepartment: async function(){
    try{
      let data = await getTable("departments");
  
      const {department} = await inquirer.prompt([
        {
          name: 'department',
          message: "Enter name of department: ",
        }
      ]);
      
      await connection.query(
        "INSERT INTO departments set ?",
        {
          department: department,
        },
        function(err,res) {
          if (err) throw err;
          console.log(res.affectedRows + " item inserted!\n");
        }
      )
    }
    catch (err){
      console.log (err);
    }
  },
  deleteItem: async function(){
    try{
      let {toBeDeleted} = await inquirer.prompt([
        {
          name: 'toBeDeleted',
          type: "list",
          message: "What table would you like delete from?",
          choices:["employee","departments","role"]
        }
      ]);
    
      let data = await getTable(toBeDeleted);
      let idChoices = await data.map(x => x.id)
    
      let {id} = await inquirer.prompt([
        {
          name: "id",
          type: "list",
          message: "Choose an item by ID",
          choices: idChoices
        }
      ]);
    
      await connection.query(`DELETE FROM ${toBeDeleted} WHERE id = ${id}`)
    
    }
    catch (err){
      console.log (err);
    }
  },
  updateItem: async function(){
    try{
      let {toBeUpdated} = await inquirer.prompt([
        {
          name: 'toBeUpdated',
          type: "list",
          message: "What would you like to update?",
          choices:["employee","departments","role"]
        }
      ]);
    
      let data = await getTable(toBeUpdated);
      let idChoices = await data.map(x => x.id);
    
      let questions = [
        {
          name: "id",
          type: "list",
          message: "Choose an item by ID",
          choices: idChoices
        },
        {
          name: 'colToUpdate',
          type: "list",
          message: 'Select column to update',
          choices: function(){
            switch (toBeUpdated){
              case "employee":
                return ["first_name","last_name","role_id","manager_id"]
              case "departments":
                return ["department"]
              case "role":
                return ["title","salary","department_id"]
            }
          }
        },
        {
          name: 'newValue',
          message: 'Enter new value',
        },
      ]
      
      let {id} = await inquirer.prompt(questions[0]);
      let {colToUpdate} = await inquirer.prompt(questions[1]);
      let {newValue} = await inquirer.prompt(questions[2]);
      await connection.query(`UPDATE ${toBeUpdated} SET ${colToUpdate} = '${newValue}' WHERE id = ${id}`)
    }
    catch (err){
      console.log (err);
    }
  }
}

async function getEmployees(sort){
  try{
    const result = await connection.query(
      `SELECT e1.id, e1.first_name, e1.last_name, title, salary, department, CONCAT(e2.first_name, " ", e2.last_name) AS manager
        FROM employee as e1
          LEFT JOIN employee as e2
            ON e1.manager_id = e2.id
          INNER JOIN role AS r
            ON e1.role_id = r.id
          INNER JOIN departments AS d
            ON r.department_id = d.id 
          ORDER BY ${sort}`);
        const table = cTable.getTable(result);
        console.log(table);
  }
  catch (err){
    console.log (err);
  }
  
};

async function getTable(tbl){
  try{
    const result = await connection.query(
      `SELECT * FROM ${tbl}`);
        const table = cTable.getTable(result);
        console.log(table);
        return result;
  }
  catch (err){
    console.log (err);
  }
};

async function addItem(){
  const {addTable} = await inquirer.prompt([
    {
      name: 'addTable',
      type: "list",
      message: "What table would you like add to?",
      choices:["employee","departments","role"]
    }
  ])

    switch (addTable){
      case "employee": 
        addEmployee();
        break;
      case "departments":
        addDepartment();
        break;
      case "role":
        addRole();
        break;
      default:
        console.log(addTable);
        break;
    }
  
};

async function addEmployee(){
  let data = await getTable("employee");

  let questions = [
    {
      name: 'firstName',
      message: "Enter employee\'s first name: ",
    },
    {
      name: 'lastName',
      message: 'Enter employee\'s last name: ',
    },
    {
      name: 'roleId',
      message: 'Select employee role ID:',
    },
    {
      name: 'managerId',
      message: 'Select employee manager ID',
    }
  ]
  
  const {firstName} = await inquirer.prompt(questions[0]);
  const {lastName} = await inquirer.prompt(questions[1]);
  await getTable("role");
  const {roleId} = await inquirer.prompt(questions[2]);
  await getTable("employee");
  const {managerId} = await inquirer.prompt(questions[3]);
  
  await connection.query(
    "INSERT INTO employee set ?",
    {
      first_name: firstName,
      last_name: lastName,
      role_id: roleId,
      manager_id: managerId
    },
    function(err,res) {
      if (err) throw err;
      console.log(res.affectedRows + " item inserted!\n");
    }
  )
};

async function addRole(){
  let data = await getTable("departments");
  let depChoices = data.map(x => x.id);
  await getTable("role")

  let questions = [
    {
      name: 'title',
      message: "Enter role title: ",
    },
    {
      name: 'salary',
      message: 'Enter role salary: ',
    },
    {
      name: 'departmentId',
      type: "list",
      message: 'Under which department is this role?',
      choices: depChoices
    }
  ]
  
  const {title} = await inquirer.prompt(questions[0]);
  const {salary} = await inquirer.prompt(questions[1]);
  await getTable("departments");
  const {departmentId} = await inquirer.prompt(questions[2]);
  
  await connection.query(
    "INSERT INTO role set ?",
    {
      title: title,
      salary: salary,
      department_id: departmentId
    },
    function(err,res) {
      if (err) throw err;
      console.log(res.affectedRows + " item inserted!\n");
    }
  )
};

async function addDepartment(){
  let data = await getTable("departments");
  
  const {department} = await inquirer.prompt([
    {
      name: 'department',
      message: "Enter name of department: ",
    }
  ]);
  
  await connection.query(
    "INSERT INTO departments set ?",
    {
      department: department,
    },
    function(err,res) {
      if (err) throw err;
      console.log(res.affectedRows + " item inserted!\n");
    }
  )
};

async function deleteItem(){
  let {toBeDeleted} = await inquirer.prompt([
    {
      name: 'toBeDeleted',
      type: "list",
      message: "What table would you like delete from?",
      choices:["employee","departments","role"]
    }
  ]);

  let data = await getTable(toBeDeleted);
  let idChoices = await data.map(x => x.id)

  let {id} = await inquirer.prompt([
    {
      name: "id",
      type: "list",
      message: "Choose an item by ID",
      choices: idChoices
    }
  ]);

  await connection.query(`DELETE FROM ${toBeDeleted} WHERE id = ${id}`)

};

async function updateItem(){
  let {toBeUpdated} = await inquirer.prompt([
    {
      name: 'toBeUpdated',
      type: "list",
      message: "What would you like to update?",
      choices:["employee","departments","role"]
    }
  ]);

  let data = await getTable(toBeUpdated);
  let idChoices = await data.map(x => x.id);

  let questions = [
    {
      name: "id",
      type: "list",
      message: "Choose an item by ID",
      choices: idChoices
    },
    {
      name: 'colToUpdate',
      type: "list",
      message: 'Select column to update',
      choices: function(){
        switch (toBeUpdated){
          case "employee":
            return ["first_name","last_name","role_id","manager_id"]
          case "departments":
            return ["department"]
          case "role":
            return ["title","salary","department_id"]
        }
      }
    },
    {
      name: 'newValue',
      message: 'Enter new value',
    },
  ]

  
  
  let {id} = await inquirer.prompt(questions[0]);
  let {colToUpdate} = await inquirer.prompt(questions[1]);
  let {newValue} = await inquirer.prompt(questions[2]);
  await connection.query(`UPDATE ${toBeUpdated} SET ${colToUpdate} = '${newValue}' WHERE id = ${id}`)
};
// for each employee, push employee.name into array. use that array for inquirer choices 
// use map 

module.exports = orm;


