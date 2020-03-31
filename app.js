var inquirer = require('inquirer');
var fs = require('fs');
var teamFileName = '.\\output\\team.txt';
var encoding = 'utf8';
var teamFileText = '';

var roles = ['Manager','Engineer','Intern']

// array of question objects
var questions = [
    {
        "type": "input",
        "name": "name",
        "message": "What is your name"
    },
    {
        "type": "list",
        "name": "role",        
        "message": "What is your role",
        "choices": roles
    },
    {
        "type": "input",
        "name": "roleInformation",
        "message": function(answers){
            //console.log(answers);
            var roleAnswer = answers.role;
            var roleInformationMsg;
            if (roleAnswer == roles[0]){
                roleInformationMsg = "What is your office number";
            }else if (roleAnswer == roles[1]){
                roleInformationMsg = "What is your github profile name";
            }else if (roleAnswer == roles[2]){
                roleInformationMsg = "What is your school name";
            }
            
            return roleInformationMsg;
        }
    },
    {
        "type": "list",
        "name": "addMember",
        "message": "would you like to add more members?",
        "choices": ["Yes","No"]
    }
]

// write file
fs.writeFile(teamFileName,'',encoding,function(err){
     if (err)
        console.log('error writing to file'+err);
});

function addMember(){
    // prompt for questions
    inquirer.prompt(questions).then(response => {
        for(var question in response){
            teamFileText = 'question '+question+' answer '+response[question]+'\n';
            //console.log(teamFileText);

            if (question == "addMember"){
                if (response[question] == "Yes") {
                    // prompt for another team member again
                    addMember();
                }else {
                    console.log("end");
                }
            }else {
                // append to file
                fs.appendFileSync(teamFileName,teamFileText,encoding,function(err){
                    if (err)
                        console.log('error appending to file');
                });
            }
        }
    });
}

addMember();









