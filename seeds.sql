INSERT INTO department (name)
  VALUES ("Engineering"), ("Finance"), ("Legal"), ("Sales");

INSERT INTO role (title, salary, department_id)
  VALUES ("Sales Lead", 100000, 4), ("Salesperson", 80000, 4), ("Lead Engineer", 150000, 5), ("Software Engineer", 120000, 5), ("Account Manager", 160000, 6), ("Accountant", 125000, 6), ("Legal Team Lead", 250000, 7), ("Lawyer", 190000, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 9, null), ("Mike", "Chan", 10, 9), ("Ashley", "Rodriguez", 11, null), ("Kevin", "Tupik", 12, 11), ("Kunal", "Singh", 13, null), ("Malia", "Brown", 14, 13), ("Sarah", "Lourd", 15, null), ("Tom", "Allen", 16, 15);