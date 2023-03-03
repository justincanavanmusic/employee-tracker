const inquirer = require('inquirer');
const fs=require('fs');
const cTable = require('console.table');
const mysql = require('mysql2');

//connection for 
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'rootroot',
    database: 'employee_db',
    port: 3306
  });
//first prompt question
const mainQuestion = [    
    {
     type: 'list',
     message: 'What would you like to do?',
     choices: ['View All Employees', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
     name: 'option'
      }
]
//prompts for department questions
const departmentQuestions= [   
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
      //prompts for role questions
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
]    //prompts for employee questions
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
  //prompts to update employee role, didn't complete
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
] //selects all columns from department table, console.table displays the table with all columns and values in the terminal
function displayDepartments() {
  connection.query('SELECT * from department', function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}
//SELECT statement selects the desired columns from roles and then also pulls department.name from the department table and is re-named (alias) "department"
//FROM tells us which table to get the data from
//the JOIN statement tells us to use the department table when role.department_id = department.id
function displayRoles() {
  connection.query(`SELECT role.id, role.title, role.salary, department.name AS department
  FROM role
  JOIN department ON role.department_id = department.id`, function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}
//uses two separate tables to display data.. selecting the options that i want to be displayed from tbl1
//concat creates a new column called "manager" that concatenates first_name and last_name from the employee table
//the 2nd select statement (select employee.id ..) selects data from all 3 tables and joins them together to create tbl1
//left join employee... joins tbl1 with employee table if tbl1.manager_id=employee.id      the left join makes it so they are all viewed as one table
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
  ON tbl1.manager_id = employee.id`, function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}
//inserts the userinput as the value into the department name column
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
//SELECT returns the values that will be inserted into the table some of which are entered by the user, lastly selecting the id column from the department table
//FROM tells us that the "department" table is supplying data for the query
//WHERE tells us that if the answersObj.deptrole matches department.name to use the department table
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

//inserts user input as values in the employee table 
//FROM statement joins role and employee tables if condition matches
//WHERE statement gives the conditions stating that the user input for employeerole has to match a title column in the role table and the manager prompt answer has to match one of the employees(managers) full name, hence the concatenation

function addEmployees() {
  inquirer.prompt(employeeQuestions)
  .then(answersObj=>{

      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
  SELECT "${answersObj.firstname}", "${answersObj.lastname}", role.id, employee.id
  FROM role JOIN employee ON employee.role_id = role.id
  WHERE role.title = "${answersObj.employeerole}" AND CONCAT(employee.first_name,' ', employee.last_name) = "${answersObj.manager}"`, 
  function (err) {
  if (err) throw err
  console.log("Employee Added");
  
  runQuestion();
    })
  })
}
function updateEmployeeRole() {
  inquirer.prompt(updateEmpRole)
  .then(answersObj=>{
    connection.query(`UPDATE employee SET title='${answersObj.roleupdate}' WHERE CONCAT(employee.first_name, ' ', employee.last_name)="${answersObj.employeerole}"`, function(err, dataObj){ 
      if (err) throw err;
      console.log("Employee Role Updated")
      runQuestion();
    })
  })
}
 
//runs main question and then runs the other functions with other prompts depending on the users reesponse to "mainQuestion"
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

            case "Update Employee Role":
              updateEmployeeRole()
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

