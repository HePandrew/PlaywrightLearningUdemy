//object is collection of properties
let person = {
    firstname : 'tim',
    lastname: 'john',
    age:31,
    fullname: function(){
        return this.firstname+this.lastname
    }
}

console.log(person.lastname)
console.log(person['lastname'])
person.firstname='Dave'
console.log(person.firstname)
person.gender = 'male'
console.log(person.gender)
delete person.lastname
console.log(person)
console.log('lastname' in person)

//print all values in object
for(let key in person){
    console.log(person[key])
}
