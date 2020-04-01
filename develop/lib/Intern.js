// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require ("./Employee");

class Intern extends Employee{
    constructor(school){
        super();
        this.school = school;
        super.role = "Intern";
    }

    getSchool(){
        return this.school;
    }
}

module.exports = Intern;