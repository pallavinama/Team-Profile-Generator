const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

var roles = ['Manager','Engineer','Intern'];

// array of question objects
var questions = [
    {
        "type": "input",
        "name": "name",
        "message": "Enter Employee name"
    },
    {
        "type": "input",
        "name": "id",
        "message": "Enter Employee id"
    },
    {
        "type": "input",
        "name": "email",
        "message": "Enter Employee Email"
    },
    {
        "type": "list",
        "name": "role",        
        "message": "Select the role",
        "choices": roles
    },
    {
        "type": "input",
        "name": "roleInfo",
        "message": function(answers){
            //console.log(answers);
            var roleAnswer = answers.role;
            var roleInfoMsg;
            if (roleAnswer == roles[0]){
                roleInfoMsg = "What is your office number";
            }else if (roleAnswer == roles[1]){
                roleInfoMsg = "What is your github profile name";
            }else if (roleAnswer == roles[2]){
                roleInfoMsg = "What is your school name";
            }
            
            return roleInfoMsg;
        }
    },
    {
        "type": "list",
        "name": "addMember",
        "message": "would you like to add more members?",
        "choices": ["Yes","No"]
    }
];

//var emp = new Manager("1234");
//emp.setName("Pati");
//emp.setId(1);
//emp.setEmail("email");
//var employees = [emp];
var employees = [];

function addMember(){
    // prompt for questions
    var name = "";
    var id = 0;
    var email = "";
    var role = "";
    var roleInfo = "";
    var employee;
    inquirer.prompt(questions).then(response => {
        for(var question in response) {
            if(question == "name") {
                name = response[question];
            } else if(question == "id") {
                id = response[question];
            } else if(question == "email") {
                email = response[question];
            } else if(question == "role") {
                role = response[question];
            } else if(question == "roleInfo") {
                roleInfo = response[question];
            } else if(question == "addMember") {
                // construct corresponding employee object
                if(role == roles[0]) {
                    employee = new Manager(roleInfo);
                } else if(role == roles[1]) {
                    employee = new Engineer(roleInfo);
                } else if(role == roles[2]) {
                    employee = new Intern(roleInfo);    
                }

                // set employee variables
                employee.setName(name);
                employee.setId(id);
                employee.setEmail(email);
                employee.setRole(role);

                // add employee to employees array
                employees.push(employee);

                if(response[question] == "Yes") {
                    // prompt for another team member again                    
                    addMember();
                    //console.log("another member");
                }else {
                    console.log("employees count "+employees.length);
                    var html = render(employees);
                    //console.log("html "+html);
                    var encoding = "utf8";
                    fs.writeFile(outputPath,html,encoding,function(err){
                        if (err)
                           console.log('error writing to file'+err);
                    });
                 }
            }
        }
    });
}

function generateTeamProfile(){
    addMember();
}

generateTeamProfile();








