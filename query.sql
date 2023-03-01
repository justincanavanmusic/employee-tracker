SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department
ON role.department_id = department.id;


SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, role.salary AS salary, department.name AS department
FROM employee
JOIN role
ON employee.role_id = role.id
JOIN department
ON role.department_id = department.id