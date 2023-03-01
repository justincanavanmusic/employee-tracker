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
  ("John", "Doe", 9, null), 
  ("Mike", "Chan", 10, 17), 
  ("Ashley", "Rodriguez", 11, null), 
  ("Kevin", "Tupik", 12, 19), 
  ("Kunal", "Singh", 13, null), 
  ("Malia", "Brown", 14, 21), 
  ("Sarah", "Lourd", 15, null), 
  ("Tom", "Allen", 16, 23);