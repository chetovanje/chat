function Complex(x, y)
{
    this.r = x;
    this.i = y;
}
Complex.prototype = {
    modul: function () {
        Math.sqrt(this.r * this.r + this.i * this.i);
    },
    toString: function () {
        return ":  Real: " + this.r + " Imaginary: " + this.i;
    }
};
Complex.I = new Complex(0, 1);

var broj = new Complex(2, 2);
console.log(Complex.I.toString());


$(document).ready(function()
{
   
});