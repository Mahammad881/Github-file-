let color:String="blue";
color:"red";
console.log(color);

function sayHi():void {
    console.log('Hi!');
}
let speech:void=sayHi();
console.log(speech);

let code: (string | number| boolean);
code = 123;   // OK        -> number is allowed
code = "ABC"; // OK        -> string is allowed
code = false; // ❌ Error  -> boolean is NOT allowed
console.log(code);


type CarYear = number;
type CarType = string;
type CarModel = string;
type Car = {
  year: CarYear,
  type: CarType,
  model: CarModel
};
const carYear: CarYear = 2001 
const carType: CarType = "Toyota"
const carModel: CarModel = "Corolla"
const car: Car = {
  year: carYear,
  type: carType,
  model: carModel
};
console.log(car);


enum Status { 
    Active = 'ACTIVE',       // string enum
    Deactivate = 1,          // number enum
    Pending                  // auto-incremented from 1 -> 2
}
console.log(Status);


let something: (string | number | boolean) = "Hello World!";
something = 23;
something = false;

if (typeof something === "string") 
{
  console.log("String:", something);
} 
else if (typeof something === "number") 
{
  console.log("Number:", something);
} 
else if (typeof something === "boolean") 
{
  console.log("Boolean:", something);
}

const fruits: string[] = ['apple', 'banana'];
fruits.push('orange');
console.log(fruits); // Output: ['apple', 'banana', 'orange']

