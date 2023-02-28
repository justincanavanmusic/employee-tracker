const inquirer = require('inquirer');
const fs=require('fs');
// const cTable = require('console.table');
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
     message: 'What is the name of the role?',
     name: 'name'
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
                                //back to first question
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
  connection.query('select * from role', function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}
// function addDepartment() {
//   inquirer.prompt(departmentQuestions)
//   .then(answers=>{
//     connection.query('select * from department', function(err, data){ 
//       if (err) throw err
//   console.table(data);
//   runQuestion();
//     })
//   })
// }


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

