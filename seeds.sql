USE employee_db;

INSERT INTO department (name)
  VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary)
  VALUES ("Sales Lead", 100000), ("Salesperson", 80000), ("Lead Engineer", 150000), ("Software Engineer", 120000), ("Account Manager", 160000), ("Accountant", 125000), ("Legal Team Lead", 250000), ("Lawyer", 190000);

INSERT INTO employee (first_name, last_name, title, salary)
VALUES ("John", "Doe", "Sales Lead", 100000), ("Mike", "Chan", "Salesperson", 80000), ("Ashley", "Rodriguez", "Lead Engineer", 150000), ("Kevin", "Tupik", "Software Engineer", 120000), ("Kunal", "Singh", "Account Manager", 160000), ("Malia", "Brown", "Legal Team Lead", 250000), ("Sarah", "Lourd", "Accountant", 125000), ("Tom", "Allen", "Lawyer", 190000)