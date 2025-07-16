const person = require('./basic7')

let day = 'saturday '
console.log(day.length)
let subDay = day.slice(0,5)
console.log(subDay)
console.log(day[2])

let splitDay = day.split("r")
console.log(splitDay[1].trim())

let date = '02'
let nextDate = "18"
let diff = parseInt(nextDate)-parseInt(date)
console.log(diff)
diff.toString()

let quote = day+ " is funday"
console.log(quote)
let val = quote.indexOf('day',5)
console.log(val)

let count = 0
let value = quote.indexOf('day')
while(value!==-1){
    value = quote.indexOf('day', value+1)
    count++
}
console.log(count)

//calling the basic7 fullName in this class
let person3 = new person("Hephzi", "Mary")
console.log(person3.fullName())