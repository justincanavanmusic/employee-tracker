INSERT INTO department (name)
  VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
  VALUES ("Sales Lead", 100000, 4), ("Salesperson", 80000, 4), ("Lead Engineer", 150000, 5), ("Software Engineer", 120000, 5), ("Account Manager", 160000, 6), ("Accountant", 125000, 6), ("Legal Team Lead", 250000, 7), ("Lawyer", 190000, 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Doe", 9), ("Mike", "Chan", 10), ("Ashley", "Rodriguez", 11), ("Kevin", "Tupik", 12), ("Kunal", "Singh", 13), ("Malia", "Brown", 14), ("Sarah", "Lourd", 15), ("Tom", "Allen", 16);