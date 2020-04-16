INSERT INTO departments (department) VALUES ("Sales");
INSERT INTO departments (department) VALUES ("Logistics");
INSERT INTO departments (department) VALUES ("Service");

INSERT INTO role (title, salary, department_id) VALUES ("Manager", 120000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Salesman", 40000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Processor", 50000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Offloader", 30000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Supervisor", 50000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Representative", 30000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Mike","Rugnetta", 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Adam","Neely", 5, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alec","Castillo", 3, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Tyler","Larson", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ben","Levin", 6, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Harry","Brewis", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lindsay","Ellis", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("George","Boothby", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jason","Paradise", 4, 3);
