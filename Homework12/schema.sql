DROP DATABASE IF EXISTS employeeRepo_db;
CREATE DATABASE employeeRepo_db;
USE employeeRepo_db;


CREATE TABLE departments (
  id int AUTO_INCREMENT PRIMARY KEY,
  department varchar(30) NOT NULL
);

CREATE TABLE role (
  id int AUTO_INCREMENT PRIMARY KEY,
  title varchar(30) NOT NULL,
  salary dec(10,2) NOT NULL,
  department_id int NOT NULL,
  constraint fk_role_department foreign key(department_id) references departments(id)
);

CREATE TABLE employee (
  id int AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int,
  constraint fk_employee_manager foreign key(manager_id) references employee(id),
  constraint fk_employee_role foreign key(role_id) references role(id)
);




--SELECT tests 
SELECT first_name, last_name, title, salary, department 
  FROM employee 
  INNER JOIN department USING (id)
  INNER JOIN role USING (id) 
  ORDER BY title;

SELECT *
  FROM role
  INNER JOIN departments USING (department_id)
  INNER JOIN employee USING (role_id) 
  ORDER BY department;

SELECT e1.first_name, e1.last_name, title, salary, department, CONCAT(e2.first_name, " ", e2.last_name) AS manager
	FROM employee as e1
    LEFT JOIN employee as e2
		ON e1.manager_id = e2.id
	INNER JOIN role AS r
		ON e1.role_id = r.id
    INNER JOIN departments AS d
		ON r.department_id = d.id