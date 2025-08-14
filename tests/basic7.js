module.exports = class Person{
    age = 25
    //location = 'Canada'
    get location(){
        return 'Canada'
    }
    //constructor is a method which executes by default when object ofthe class is created
    constructor (firstName, lastName){
        this.firstName = firstName
        this.lastName=lastName
    }
    //method
    fullName(){
        return this.firstName+this.lastName
    }

}

let person = new Person("Tim","David")
let person1 = new Person("John","Tue")
console.log(person.age)
console.log(person.location)
console.log(person.fullName())
console.log(person1.fullName())

//call this class in other class = in basic5
// export this class and import this class in basic5, to export give 'module.export, to import use 'require' keyword