SELECT role.id, role.title, role.salary, department.name AS department
FROM role
JOIN department
ON role.department_id = department.id;
