const inquirer = require('inquirer');
const fs=require('fs');
// const cTable = require('console.table');
// const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'test'
//   });

const questions = [    
    {
     type: 'list',
     message: 'What would you like to do?',
     choices: ['View All Employees', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
     name: 'option'
      },
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
    
    }
    },
                          //back to question 1 here
    {
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
          console.log (`Added ${userAnswer} to the database.`);
         
      } 
      else {
          return "Please give a response";
      }
      return true;
      //message 'added ${userAnswer}...' go back to question 1
  }
  },
  {
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
  },
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
          
  },

];

function changeThisFunctionName1(fileName, dataObject) {
    
    fs.writeFile(fileName, changeThisFunctionName2(dataObject) ,(errPlaceholder) => errPlaceholder ? console.error(errPlaceholder) : console.log('change this later')
    )
   
  }

  function runQuestions() {
    inquirer.prompt(questions)
  
      .then(answersObject=> {
     
          changeThisFunctionName1('', answersObject); 
          console.log(answersObject);
          })
        .catch(error => {
          console.log("An error occured!");
      })
      };
  
  //calling runQuestions function
  runQuestions();

