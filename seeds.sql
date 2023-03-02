INSERT INTO department (name)
  VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
  VALUES 
  ("Sales Lead", 100000, 1), 
  ("Salesperson", 80000, 1), 
  ("Lead Engineer", 150000, 2), 
  ("Software Engineer", 120000, 2), 
  ("Account Manager", 160000, 3), 
  ("Accountant", 125000, 3), 
  ("Legal Team Lead", 250000, 4), 
  ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
  ("John", "Doe", 1, null), 
  ("Mike", "Chan", 2, 1),
  ("Ashley", "Rodriguez", 3, null), 
  ("Kevin", "Tupik", 4, 3),
  ("Kunal", "Singh", 5, null), 
  ("Malia", "Brown", 6, 5),
  ("Sarah", "Lourd", 7, null), 
  ("Tom", "Allen", 8, 7);

SELECT 
  tbl1.id, 
  tbl1.first_name, 
  tbl1.last_name, 
  tbl1.title, 
  tbl1.salary, 
  tbl1.department,
  CONCAT(employee.first_name, ' ', employee.last_name) AS manager
   FROM (SELECT employee.id, employee.first_name, employee.last_name, employee.manager_id, role.title AS title, role.salary AS salary, department.name AS department
  FROM employee
  JOIN role
  ON employee.role_id = role.id
  JOIN department
  ON role.department_id = department.id) as tbl1
  LEFT JOIN employee
  ON tbl1.manager_id = employee.id;