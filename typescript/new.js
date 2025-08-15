var color = "blue";
color: "red";
console.log(color);
function sayHi() {
    console.log('Hi!');
}
var speech = sayHi();
console.log(speech);
var code;
code = 123; // OK        -> number is allowed
code = "ABC"; // OK        -> string is allowed
code = false; // ❌ Error  -> boolean is NOT allowed
console.log(code);
var carYear = 2001;
var carType = "Toyota";
var carModel = "Corolla";
var car = {
    year: carYear,
    type: carType,
    model: carModel
};
console.log(car);
var Status;
(function (Status) {
    Status["Active"] = "ACTIVE";
    Status[Status["Deactivate"] = 1] = "Deactivate";
    Status[Status["Pending"] = 2] = "Pending"; // auto-incremented from 1 -> 2
})(Status || (Status = {}));
console.log(Status);
var something = "Hello World!";
something = 23;
something = false;
if (typeof something === "string") {
    console.log("String:", something);
}
else if (typeof something === "number") {
    console.log("Number:", something);
}
else if (typeof something === "boolean") {
    console.log("Boolean:", something);
}
var fruits = ['apple', 'banana'];
fruits.push('orange');
console.log(fruits); // Output: ['apple', 'banana', 'orange']
