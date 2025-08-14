//Inheritance is the main piller of oops concept
//one class can inherit/accure the properties, methods of another class
//the class which inherits the propertiesof other is known as subclass(derived class, child class)
//the class whose properties are inherited is known as the super / parent class
// person is the basic7.js class name and it will be parent
const Person = require("./basic7")

class Pet extends Person{

    get location()
    {
        return "Cuba"
    }
    construtor(firstName,lastName)
    {
        //calling parent class constructor suing super keyword
        super(firstName, lastName)

    }
}
let pet = new Pet("Sam","Raj")
pet.fullName()
console.log(pet.location())