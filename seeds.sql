USE employee_db;

INSERT INTO department (name)
  VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
  VALUES ("Sales Lead", 100000, 50), ("Salesperson", 80000, 51), ("Lead Engineer", 150000, 52), ("Software Engineer", 120000, 53), ("Account Manager", 160000, 54), ("Accountant", 125000, 55), ("Legal Team Lead", 250000, 56), ("Lawyer", 190000, 57);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", "Doe", "Doe"), ("Mike", "Chan", "Doe", "Doe"), ("Ashley", "Rodriguez", "Doe", "Doe"), ("Kevin", "Tupik", "Doe", "Doe"), ("Kunal", "Singh", "Doe", "Doe"), ("Malia", "Brown", "Doe", "Doe"), ("Sarah", "Lourd", "Doe", "Doe"), ("Tom", "Allen", "Doe", "Doe")