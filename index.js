const inquirer = require('inquirer');
const fs=require('fs');

const question = [    
    {
     type: 'list',
     message: 'What would you like to do?',
     choices: ['View All Employees', "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"],
     name: 'choice'
      }
];

function changeThisFunctionName1(fileName, dataObject) {
    
    fs.writeFile(fileName, changeThisFunctionName2(dataObject) ,(errPlaceholder) => errPlaceholder ? console.error(errPlaceholder) : console.log('change this later')
    )
   
  }

  function runQuestion() {
    inquirer.prompt(question)
  
  
      .then(answersObject=> {
     
          changeThisFunctionName1('file.path', answersObject); 
          console.log(answersObject);
          })
        .catch(error => {
          console.log("An error occured!");
      })
      };
  
  //calling runQuestions function
  runQuestion();

