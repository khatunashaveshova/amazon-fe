// ES 6 >
var item = false
// var ES6 < 
const num = 5 // Numbers

let stringExample = 'Hello World' // String

const firstNum = 40

const first_num = 40

const booleanElementTrue = false // false, null, undefined

const listOfNum = [1, 2, 3, 5] // Array

const listOfDataTypes = [10, true, 'String'] // 10 -> 0, true -> 1, 'String' -> 2
console.log(listOfDataTypes[2])
console.log(listOfDataTypes[0])
console.log(listOfDataTypes[1])

// console.log(booleanElementTrue)


// Bedinungen
if (firstNum > 30) {
  console.log(true)
} else {
  console.log(false)
}

let score = 76

if (score >= 90) console.log('A')
  else if (score <=80) console.log('B')
  else if (score >= 70) console.log('C')
else console.log('Verbesserung nötig')

if(score >= 90) {
  console.log('A')
} else if (score <=80) {
  console.log('B')
}

const userEmail = "email@gmail.com"
const userPsw = "test12345"

const dbUserEmail = "email@gmail.com"
const dbUserPsw = "test12345"

if (userEmail === dbUserEmail && userPsw === dbUserPsw) {
  console.log('Willkommen')
} else {
  console.log('Versuch nochmal')
}

if (userEmail === dbUserEmail && userPsw === dbUserPsw) {
  console.log('Willkommen')
} 

let day = 'Monday'

switch(day) {
  case "Monday":
    console.log("Wochenstart");
  break;
  case "Friday":
    console.log("Fast Wochenende");
  break;
  default:
    console.log("Normaler Tag!")
}