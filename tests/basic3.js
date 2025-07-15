//array concept
var marks = Array(6)//1st method to initilize a array
marks = 5
console.log(marks)

var markss = new Array(20,30,40,50,60,70) //2nd method to initilize a array

var mark = [20,30,40,50,60,70]//3rd method to initilize a array
console.log(mark[2])//40 will be printed
mark[3]= 14 //50 will be override by 14
console.log(mark.length)//6
mark.push(65)//will add 65 in last index
mark.pop()//will remove the no. in last index
mark.unshift()//will remove index 0 
mark.indexOf(70) // will return the index of 70 as 6
mark.includes(120) //return false as 120 is not iside the array
//sum the mark array traditional method
var sum=0
for(let i=0;i<mark.length;i++){
    sum=sum+mark[i]
}
console.log(sum)
//reduce method
var sum1 = 0
let total = mark.reduce((sum1,mark)=>sum1+mark,0)
console.log(total)
//get even numbers
var scores = [12,13,14,15]
//1st method
var evenScores = []
for(let j=0;j<scores.length;j++){
    if(scores[j]%2==0){
        evenScores.push(scores[j])
    }
}
console.log(evenScores)
//filter method
let filterScore=scores.filter((score=>score%2==0))
console.log(filterScore)
//map = multiple the result with 3
let multValue = filterScore.map(score=>score*3)
console.log(multValue)
//now add the all multipled values
let addValue = multValue.reduce((sum,multValue)=>sum+multValue,0)
console.log(addValue)
//chaining the above methods
let chainTotal = scores.filter(score=>score%2==0).map(mul=>mul*3).reduce((a,b)=>a+b,0)
console.log(chainTotal)
 
//text arrays
let fruits = ["banana","manngo","apple","pomo"]
console.log(fruits.sort())
console.log(fruits.reverse())

let scores2 = [3,56,7,80,65,34,5,9,]
console.log(scores2.sort()) //output not correct
console.log(scores2.sort((a,b)=>b-a))//correct output
