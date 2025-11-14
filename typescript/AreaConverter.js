var Shape = /** @class */ (function () {
    function Shape() {
    }
    Shape.prototype.triangle = function (b, h) {
        var area = (h * b) / 2;
        console.log("Area of triangle = " + area);
    };
    Shape.prototype.rectangle = function (l, b) {
        var area = l * b;
        console.log("Area of rectangle = " + area);
    };
    Shape.prototype.circle = function (r) {
        var pi = 3.14;
        var area = pi * r * r;
        console.log("Area of circle = " + area);
    };
    return Shape;
}());
var shape = new Shape();
shape.triangle(4, 6);
console.log("--------------");
shape.rectangle(5, 4);
console.log("--------------");
shape.circle(5);
