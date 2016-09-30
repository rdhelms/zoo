$(document).ready(function() {


//List of all animals for reference
var allAnimals = {
  mammals: [Lion],
  birds: [Parrot]
};

//Animal constructor
function Animal(name, birthDate) {
  if (this instanceof Lion) {
    console.log("Making new Lion!");
  } else if (this instanceof Parrot) {
    console.log("Making new Parrot!");
  } else {
    throw new Error("Can only make species directly!");
  }
  this.name = name;
  this.birthDate = new Date(birthDate);
}
//Animal Prototype
Animal.prototype = {
  toString: function() {
    var name = this.getName() + " was born " + this.getBirthDate();
    return name;
  },
  getName: function() {
    return this.name;
  },
  getBirthDate: function() {
    return moment(this.birthDate).format('MMM Do, YYYY');
  },
  getAge: function() {
    var currentDate = new Date();
    var dateDiffYears = currentDate.getFullYear() - this.birthDate.getFullYear();
    return dateDiffYears;
  }
};

//Mammal constructor
function Mammal(name, birthDate) {
  Animal.call(this, name, birthDate);
}
function defineMammal() {
  //Inherit the Animal prototype, but reset the constructor.
  Mammal.prototype = Object.create(Animal.prototype);
  Mammal.prototype.constructor = Mammal;
  //Mammal-prototype additions
  Mammal.prototype.canGiveBirth = true;
  Mammal.prototype.canLayEggs = false;
  Mammal.prototype.giveBirth = function() {
      var child = new this.constructor;
      child.name = this.name + " Jr";
      child.birthDate = new Date();
      return child;
  };
}
defineMammal();

//Bird constructor
function Bird(name, birthDate) {
  Animal.call(this, name, birthDate);
}
function defineBird() {
  //Inherit Animal prototype, but reset the constructor
  Bird.prototype = Object.create(Animal.prototype);
  Bird.prototype.constructor = Bird;
  //Bird-specific prototype additions
  Bird.prototype.canLayEggs = true;
  Bird.prototype.canGiveBirth = false;
  Bird.prototype.layEgg = function() {
      var child = new this.constructor;
      child.name = this.name + " Jr";
      child.birthDate = new Date();
      return child;
  };
}
defineBird();

//Lion constructor
function Lion(name, birthDate) {
  Mammal.call(this, name, birthDate);
}
function defineLion() {
  //Inherit Mammal prototype but reset the constructor
  Lion.prototype = Object.create(Mammal.prototype);
  Lion.prototype.constructor = Lion;
  //Lion-specific prototype additions
  Lion.prototype.roar = function(roarType) {
    if (roarType.toLowerCase() === "big") {
      return "ROOOOAAAAAAARRR!";
    } else if (roarType.toLowerCase() === "small") {
      return "ROAR!";
    } else {
      return "That is not a correct type of roar.";
    }
  };
}
defineLion();

//Parrot constructor
function Parrot(name, birthDate) {
  Bird.call(this, name, birthDate);
}
function defineParrot() {
  //Inherit Bird prototype, but reset the constructor
  Parrot.prototype = Object.create(Bird.prototype);
  Parrot.prototype.constructor = Parrot;
  //Parrot-specific prototype additions
  Parrot.prototype.speak = function (phrase) {
      return "Squawk! " + phrase + " Squawk!";
  };
}
defineParrot();


// //Testing code below here
function runTests() {
  console.log("---LION TESTING---");
  var lionDad = new Lion('Mufasa', '9/29/1900');
  console.log("var lionDad = new Lion('Mufasa', '9/29/1900')");
  console.log("lionDad.name: " + lionDad.name);
  console.log("lionDad.birthDate: " + lionDad.birthDate);
  console.log("lionDad.getName(): " + lionDad.getName());
  console.log("lionDad.getBirthDate(): " + lionDad.getBirthDate());
  console.log("lionDad.toString(): " + lionDad.toString());
  console.log("lionDad.getAge(): " + lionDad.getAge());
  console.log("lionDad.canGiveBirth: " + lionDad.canGiveBirth);
  console.log("lionDad.canLayEggs: " + lionDad.canLayEggs);
  console.log("var lionCub = lionDad.giveBirth();");
  var lionCub = lionDad.giveBirth();
  console.log("lionCub: " + lionCub);
  console.log("lionDad.roar('big'): " + lionDad.roar('big'));
  console.log("lionCub.roar('small'): " + lionCub.roar('small'));
  try {
    console.log("lionCub.speak('Polly want a cracker!')");
    lionCub.speak('Polly want a cracker!');
  } catch (error) {
    console.log(error);
  }
  console.log('\n\n\n');


  console.log("---PARROT TESTING---");
  var parrotMom = new Parrot('Polly', '2/1/2010');
  console.log("var parrotMom = new Parrot('Polly', '2/1/2010')");
  console.log("parrotMom.name: " + parrotMom.name);
  console.log("parrotMom.birthDate: " + parrotMom.birthDate);
  console.log("parrotMom.getName(): " + parrotMom.getName());
  console.log("parrotMom.getBirthDate(): " + parrotMom.getBirthDate());
  console.log("parrotMom.toString(): " + parrotMom.toString());
  console.log("parrotMom.getAge(): " + parrotMom.getAge());
  console.log("parrotMom.canGiveBirth: " + parrotMom.canGiveBirth);
  console.log("parrotMom.canLayEggs: " + parrotMom.canLayEggs);
  console.log("var parrotBaby = parrotMom.giveBirth();");
  var parrotBaby = parrotMom.layEgg();
  console.log("parrotBaby: " + parrotBaby);
  try {
    console.log("parrotBaby.roar('big'): ");
    parrotBaby.roar('big');
  } catch (error){
    console.log(error);
  }
  try {
    console.log("parrotBaby.roar('small'): ");
    parrotBaby.roar('small');
  } catch (error){
    console.log(error);
  }
  console.log("parrotBaby.speak('Polly want a cracker!'): " + parrotBaby.speak('Polly want a cracker!'));

  console.log("\n\n\n");
  console.log("---TESTING SPECIES-ONLY CONSTRUCTOR---")
  console.log("var mammal = new Mammal();");
  try {
    var mammal = new Mammal();
  } catch (error) {
    console.log(error);
  }
  console.log("var bird = new Bird();");
  try {
    var bird = new Bird();
  } catch (error) {
    console.log(error);
  }
  console.log("var animal = new Animal();");
  try {
    var animal = new Animal();
  } catch (error) {
    console.log(error);
  }
  console.log("var lion = new Lion();");
  try {
    var lion = new Lion();
  } catch (error) {
    console.log(error);
  }
  console.log("var parrot = new Parrot();");
  try {
    var parrot = new Parrot();
  } catch (error) {
    console.log(error);
  }
}
runTests();

});
