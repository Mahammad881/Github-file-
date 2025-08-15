class Shape { 
    triangle(b: number, h: number): void { 
        var area = (h * b) / 2; 
        console.log("Area of triangle = " + area); 
    } 
 
    rectangle(l: number, b: number): void { 
        var area = l * b; 
        console.log("Area of rectangle = " + area); 
    } 
 
    circle(r: number): void { 
        const pi = 3.14;  
        var area = pi * r * r; 
        console.log("Area of circle = " + area); 
    } 
} 
 
var shape = new Shape(); 
shape.triangle(4, 6); 
console.log("--------------"); 
 
shape.rectangle(5, 4); 
console.log("--------------"); 
 
shape.circle(5); 
 
 