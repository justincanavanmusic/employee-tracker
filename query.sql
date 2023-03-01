SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department
ON role.department_id = department.id;


SELECT employee.id, employee.first_name, employee.last_name, role.title AS title
FROM employee
JOIN role
ON role_id = role.id;