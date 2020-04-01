// TODO: Write code to define and export the Employee class
class Employee {
    name = "";
    id = 0;
    email = "";
    role = "";

    constructor (){
    }

    /*constructor (name, id, email, role){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
    }*/

    setName(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }

    setId(id){
        this.id = id;
    }

    getId(){
        return this.id;
    }

    setEmail(email){
        this.email = email;
    }

    getEmail(){
        return this.email;
    }

    setRole(role){
        this.role = role;
    }

    getRole(){
        return this.role;
    }
}

module.exports = Employee;