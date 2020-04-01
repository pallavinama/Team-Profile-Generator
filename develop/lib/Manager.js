// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require ("./Employee");

class Manager extends Employee {
    constructor(officeNumber){
        super();
        this.officeNumber = officeNumber;
        super.role = "Manager";
    }

    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;