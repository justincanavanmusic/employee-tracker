const inquirer = require('inquirer');
const fs=require('fs');
const cTable = require('console.table');
const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_db',
    port: 3306
  });

const mainQuestion = [    
    {
     type: 'list',
     message: 'What would you like to do?',
     choices: ['View All Employees', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
     name: 'option'
      }
]
const departmentQuestions= [   ///add department
  {
     type: 'input',
     message: 'What is the name of the department?',
     name: 'dept',
     validate: function (userAnswer) {
        if (userAnswer.length>0) {
        console.log (`
  Added "${userAnswer}" to the database.`);
          
        } 
        else {
            return "Please give a response";
        }
        return true
    },
    }
  ]
                //back to question 1 here
  const roleQuestions=
   [             {
     type: 'input',
     message: 'What is the title of the role?',
     name: 'title'
    },
    {
    type: 'input',
    message: 'What is the salary of the role?',
    name: 'salary'
    },
    {
    type: 'list',
    message: 'Which department does the role belong to?',
    choices: ['Engineering', "Finance", "Legal", "Sales", "Service"],
    name: 'deptrole',
    validate: function (userAnswer) {
      if (userAnswer.length>0) {
        console.log (`
Added "${userAnswer}" to the database.`);

      } 
      else {
          return "Please give a response";
      }
  }
  }
]
const employeeQuestions=
 [ {
    type: 'input',
    message: `What is the employee's first name?`,
    name: 'firstname'
  },
  {
    type: 'input',
    message: `What is the employee's last name?`,
    name: 'lastname'
  },
  {
  type: 'list',
  message: `What is the employee's role?`,
  choices: ['Sales Lead', "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
  name: 'employeerole'
  },
  {
  type: 'list',
  message: `Who is the employee's manager?`,
  choices: ['None', "John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown", "Sarah Lourd", "Tom Allen"],
  name: 'manager'
  }
]
  const updateEmpRole =
[ 
  {
  type: 'list',
  message: `Which employee's role do you want to update?`,
  choices: ['Malia Brown', "Sarah Lourd", "Tom Allen", "Sam Kash", "John Doe", "Mike Chan", "Ashley Rodriguez"],
  name: 'roleupdate' 
  },
  {
  type: 'list',
  message: `Which role do you want to assign the selected employee?`,
  choices: ['Sales Lead', "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
  name: 'employeerole'
          
  }
]
function displayDepartments() {
  connection.query('select * from department', function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}

function displayRoles() {
  connection.query(`SELECT role.id, role.title, role.salary, department.name AS department
  FROM role
  JOIN department
  ON role.department_id = department.id`, function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}

// function displayEmployees() {
//   connection.query(`SELECT tbl1.f_name, employee.manager_id, employee.first_name from (SELECT employee.id, employee.first_name as f_name, employee.last_name as l_name, role.title AS title, role.salary AS salary
//   FROM employee
//   JOIN role
//   ON employee.role_id = role.id) as tbl1
//   JOIN employee
//   ON employee.id = tbl1.id`,
//   // JOIN department
//   // ON role.department_id = department.id`,
//   // department.name AS department,
//   function(err, data){ 
//     if (err) throw err
// console.table(data);
// runQuestion();
//   })
// }
function displayEmployees() {
  connection.query(`SELECT 
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
  ON tbl1.manager_id = employee.id;`, function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}
function addDepartment() {
  inquirer.prompt(departmentQuestions)
  .then(answersObj=>{
    connection.query(`INSERT INTO department(name) values("${answersObj.dept}")`, function (err){
      if(err) throw err;
      console.log("Department Added");

  runQuestion();
    })
  })
}

//INSERT INTO inserts a row into "role" table and sets the column names (title, salary, depart...)
//SELECT returns the results that will be inserted into the table some of which are entered by the user, lastly selecting the id column from the department table
//FROM tells us that the "department" table is supplying data for the query
//WHERE tells us that if the usersAns.deptrole matches department.name to use that corresponding department_id
function addRoles() {
  inquirer.prompt(roleQuestions)
  .then(answersObj=>{
 
  connection.query(`INSERT INTO role (title, salary, department_id)
  SELECT "${answersObj.title}", ${answersObj.salary}, department.id
  FROM department
  WHERE department.name = "${answersObj.deptrole}"`, 
  
  function (err){
    if(err) throw err;
    console.log("Role Added");
    runQuestion()
  })
  })
}
function addEmployees() {
  inquirer.prompt(employeeQuestions)
  .then(answersObj=>{

      connection.query(`
  INSERT INTO employee (first_name, last_name, role_id, manager_id)
  SELECT "${answersObj.firstname}", "${answersObj.lastname}", role.id, employee.id
  FROM role
  JOIN employee ON employee.role_id = role.id
  WHERE role.title = "${answersObj.employeerole}" AND CONCAT(employee.first_name,' ', employee.last_name) = "${answersObj.manager}"`, 
  function (err) {
  if (err) throw err
  console.log("Employee Added");
  
  runQuestion();
    })
  })
}
// function updateEmpRole() {
//   inquirer.prompt(updateEmpRole)
//   .then(answersObj=>{
//     connection.query(`UPDATE employee`, function(err, dataObj){ 
//       if (err) throw err;
//       console.log("Employee Role Updated")
//       runQuestion();
//     })
//   })
// }
// function addEmployees() {
//   inquirer.prompt(employeeQuestions)
//   .then(answersObj=>{
//     connection.query(`INSERT INTO employee (first_name, last_name) VALUES ('${answersObj.firstname}', '${answersObj.lastname}')`,
    
//     function(err, dataObj){ 
//       if (err) throw err;
  
  function runQuestion() {
    inquirer.prompt(mainQuestion)
  
      .then(answersObject=> {
     
          switch (answersObject.option) {
            case "View All Departments":
                displayDepartments()
                break;

            case "View All Roles":
              displayRoles()
              break;

            case "View All Employees":
              displayEmployees()
              break;
            
            case "Add Department":
            addDepartment()
            break;

            case "Add Role":
              addRoles()
              break;

            case "Add Employee":
              addEmployees()
            break;
      
          default:
              break;
        }
          })
        .catch(error => {
          console.log("An error occured!");
      })
      };
  
  //calling runQuestions function
  runQuestion();
  //connection.connect(runQuestions)
  //do this later

