USE employee_db;

INSERT INTO department (name)
  VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
  VALUES ("Sales Lead", 100000, 4), ("Salesperson", 80000, 4), ("Lead Engineer", 150000, 5), ("Software Engineer", 120000, 5), ("Account Manager", 160000, 6), ("Accountant", 125000, 6), ("Legal Team Lead", 250000, 7), ("Lawyer", 190000, 7);

INSERT INTO employee (first_name, last_name, title, salary)
VALUES ("John", "Doe", "Sales Lead", 100000), ("Mike", "Chan", "Salesperson", 80000), ("Ashley", "Rodriguez", "Lead Engineer", 150000), ("Kevin", "Tupik", "Software Engineer", 120000), ("Kunal", "Singh", "Account Manager", 160000), ("Malia", "Brown", "Legal Team Lead", 250000), ("Sarah", "Lourd", "Accountant", 125000), ("Tom", "Allen", "Lawyer", 190000)