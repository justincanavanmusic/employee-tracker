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
    }
//     {
//     type: 'list',
//     message: 'Which department does the role belong to?',
//     choices: ['Engineering', "Finance", "Legal", "Sales", "Service"],
//     name: 'deptrole',
//     validate: function (userAnswer) {
//       if (userAnswer.length>0) {
//         console.log (`
// Added "${userAnswer}" to the database.`);

//       } 
//       else {
//           return "Please give a response";
//       }
//   }
//   }
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
  // {
  // type: 'list',
  // message: `Who is the employee's manager?`,
  // choices: ['None', "John Doe", "Mike Chan", "Ashley Rodriguez", "Kevin Tupik", "Kunal Singh", "Malia Brown", "Sarah Lourd", "Tom Allen"],
  // name: 'manager'
  // }
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

function displayEmployees() {
  connection.query('select * from employee', function(err, data){ 
    if (err) throw err
console.table(data);
runQuestion();
  })
}
function addDepartment() {
  inquirer.prompt(departmentQuestions)
  .then(answersObj=>{
    // connection.query('select * from department', function(err, dataObj){ 
    //   if (err) throw err
    connection.query(`insert into department(name) values("${answersObj.name}")`, function (err){
      if(err) throw err;
      console.log("dept added");
    

    // const addedDeptObj = {
    //   id: dataObj.length+1,
    //   name: answersObj.dept
    // }
    // dataObj.push(addedDeptObj);
  
  // dataObj.push(JSON.parse(answersObject.dept))
  // console.log(answersObject.dept)

  // console.table(dataObj); //contains all info
  // console.log(typeof answersObject) //prints {dept: Justin}   //typeof object
  // console.log(dataObj[0]);

  runQuestion();
    })
  })
}
function addRoles() {
  inquirer.prompt(roleQuestions)
  .then(answersObj=>{
  //   connection.query('select * from role', function(err, dataObj){ 
  //     if (err) throw err

  //   const addedRoleObj={
  //     id: dataObj.length+1,
  //     title: answersObj.title,
  //     salary: answersObj.salary
  //   }
  //   dataObj.push(addedRoleObj)
  

  // console.table(dataObj);

  // runQuestion();
  //   })
  connection.query(`insert into role(title, salary) values("${answersObj.title}",${answersObj.salary})`, function (err){
    if(err) throw err;
    console.log("role added");
  })
  })
}
function addEmployees() {
  inquirer.prompt(employeeQuestions)
  .then(answersObj=>{
    connection.query('select * from employee', function(err, dataObj){ 
      if (err) throw err
  
  const addEmployeeObj={
    id: dataObj.length+1,
    first_name: answersObj.firstname,
    last_name: answersObj.lastname,
    title: answersObj.employeerole,
    salary: function () {
      if(answersObj.employeerole==="Sales Lead") {
      return 100000
    } if(answersObj.employeerole==="Salesperson") {
      return 80000
    } if(answersObj.employeerole==="Lead Engineer") {
      return 150000
    } if(answersObj.employeerole==="Software Engineer") {
      return 120000
    } if(answersObj.employeerole==="Account Manager") {
      return 160000
    } if(answersObj.employeerole==="Legal Team Lead") {
      return 250000
    } if(answersObj.employeerole==="Accountant") {
      return 125000
    } if(answersObj.employeerole==="Lawyer") {
      return 190000
    } else {
      console.log("somethings wrong");
    }
  } ()
  };
  dataObj.push(addEmployeeObj)
  console.table(dataObj);

  runQuestion();
    })
  })
}
// function addEmployees() {
//   inquirer.prompt(employeeQuestions)
//   .then(answersObj=>{
//     connection.query(`INSERT INTO employee (first_name, last_name) VALUES ('${answersObj.firstname}', '${answersObj.lastname}')`,
    
//     function(err, dataObj){ 
//       if (err) throw err;
  
//   const addEmployeeObj={
//     id: dataObj.length+1,
//     first_name: answersObj.firstname,
//     last_name: answersObj.lastname
//   }
//   console.table(dataObj);

//   runQuestion();
//     })
//   })
// }
    // employee.push(answersObject.firstname)
  // data.push(answersObject.lastname)
  // data.push(answersObject.employeerole);
  // data.push(answersObject.manager);
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

