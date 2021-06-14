class new_payroll_form {
    // // property
        // id;
        // salary;
    // // As getter and setter is introduce then no need of propertise.
    
    
        //constructor
        constructor(...params){
            this.id = params[0];
            this.name = params[1];
            this.salary = params[2];
            this.gender = params[3];
            this.startDate = params[4];
        }
    
        //getter and setter for name
        get name() {
            return this._name;
        }
    
        set name(name) {
            // console.log("Setting: " +name);
            let nameRegex = RegExp('^[A-Z]{1}[a-z]{3,}$');
            if (nameRegex.test(name))
                this._name = name;
            else throw 'Name is Incorrect!';    
        }
    
        //getter and setter for id
        get id() {
            return this._id;
        }
    
        set id(id) {
            // console.log("Setting: " +id);
            this._id = id;
        }
    
        //getter and setter for salary
        get salary() {
            return this._salary;
        }
    
        set salary(salary) {
            // console.log("Setting: " +salary);
            this._salary = salary;
        }
    
        //getter and setter for gender
        get gender() {
            return this._gender;
        }
    
        set gender(gender) {
            // console.log("Setting: " +salary);
            this._gender = gender;
        }
    
        //Method
        toString() {
            const options = { year: 'numeric', month: 'long', day: 'numeric'};
            const empDate = this.startDate === undefined ? "undefined" :
                            this.startDate.toLocaleDateString("en-US", options);
            return "id=" + this.id + ", name=" + this.name + ", salary=" + this.salary + ", " + "gender=" + this.gender + ", StartDate=" + empDate;
        }

        
}
