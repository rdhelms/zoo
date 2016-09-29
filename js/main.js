$(document).ready(function() {

// //Animal Prototype
Animal.prototype = {
  toString: function() {
    var name = this.getName() + " was born " + this.getBirthDate();
    return name;
  },
  getName: function() {
    return this.name;
  },
  getBirthDate: function() {
    return moment(this.birthDate).format('MMM Do, YY');
  },
  getAge: function() {
    var currentDate = new Date();
    var dateDiffYears = currentDate.getFullYear() - this.birthDate.getFullYear();
    return dateDiffYears;
  }
};
// Animal.prototype.constructor = (function() {
//   throw(new Error("Can't construct Animal directly"));
// })();

//Animal constructor
function Animal(name, birthDate) {
  this.name = name;
  this.birthDate = new Date(birthDate);
}

//Genus (sp?) constructors
function Mammal(name, birthDate) {
  Animal.call(this, name, birthDate);
  this.canGiveBirth = true;
}
Mammal.prototype = Animal.prototype;

function Bird(name, birthDate) {
  Animal.call(this, name, birthDate);
  this.canLayEggs = true;
}
Bird.prototype = Animal.prototype;


//Species constructors
function Parrot(name, birthDate) {
  Bird.call(this, name, birthDate);
}
Parrot.prototype = Bird.prototype;

function Lion(name, birthDate) {
  Mammal.call(this, name, birthDate);
}
Lion.prototype = Mammal.prototype;

//Testing code below here
var bob = new Lion('bob', '9/29/2016');
var joe = new Parrot('joe', '9/13/1989');
console.log(bob.toString());
console.log(joe.getAge());

});
