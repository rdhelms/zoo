$(document).ready(function() {


//List of all animals for reference
var allAnimals = {
  mammals: [Lion, Otter],
  birds: [Parrot, Penguin]
};

//Animal constructor and prototype
function Animal(name, birthDate) {
  if (this instanceof Lion) {
    console.log("Making new Lion!");
  } else if (this instanceof Parrot) {
    console.log("Making new Parrot!");
  } else if (this instanceof Otter) {
    console.log("Making new Otter!");
  } else if (this instanceof Penguin) {
    console.log("Making new Penguin!");
  } else {
    throw new Error("Can only make species directly!");
  }
  this.name = name;
  this.birthDate = new Date(birthDate);
}
function defineAnimal() {
  Animal.prototype = {
    toString: function() {
      var name = " " + this.getName() + " was born " + this.getBirthDate();
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
  Animal.prototype.constructor = Animal;
}
defineAnimal();

//Mammal constructor and prototype
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

//Bird constructor and prototype
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
  Bird.prototype.layEggs = function() {
      var nest = [];
      var numEggs = Math.round(Math.random() * 4 + 2);  //Lay between 2 and 6 eggs.
      console.log(this.getName() + " has laid " + numEggs + " eggs!");
      var suffix = " II";
      for (var eggNum = 0; eggNum < numEggs; eggNum++) {
        var child = new this.constructor;
        child.name = this.name + suffix;
        suffix += 'I';
        child.birthDate = new Date();
        nest.push(child);
      }
      return nest;
  };
}
defineBird();

//Lion constructor and prototype
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
  Lion.prototype.imgurl = 'images/lion.jpg';
}
defineLion();

//Otter constructor and prototype
function Otter(name, birthDate) {
  Mammal.call(this, name, birthDate);
  this.speed = Math.round(Math.random() * 7 + 3); //Speed ranges from 3 to 10
}
function defineOtter() {
  //Inherit Mammal prototype, but reset the constructor
  Otter.prototype = Object.create(Mammal.prototype);
  Otter.prototype.constructor = Otter;
  //Otter-specific prototype additions
  Otter.prototype.swim = function (time) {
    var dist = Math.round(this.speed * time);
    return this.getName() + " swam " + dist + " meters!";
  };
  Otter.prototype.imgurl = 'images/otter.jpg';
}
defineOtter();

//Parrot constructor and prototype
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
  Parrot.prototype.fly = function (destination) {
      return this.getName() + " flew to " + destination + "!";
  };
  Parrot.prototype.imgurl = 'images/parrot.jpg';
}
defineParrot();

//Penguin constructor and prototype
function Penguin(name, birthDate) {
  Bird.call(this, name, birthDate);
  this.speed = this.speed = Math.round(Math.random() * 10 + 2); //Speed ranges from 3 to 10
}
function definePenguin() {
  //Inherit Bird prototype, but reset the constructor
  Penguin.prototype = Object.create(Bird.prototype);
  Penguin.prototype.constructor = Penguin;
  //Penguin-specific prototype additions
  Penguin.prototype.fly = function (destination) {
      return "I can't fly to " + destination + "! I can't fly at all!";
  };
  Penguin.prototype.swim = function (time) {
    var dist = Math.round(this.speed * time);
    return this.getName() + " swam " + dist + " meters!";
  };
  Penguin.prototype.imgurl = 'images/penguin.jpg';
}
definePenguin();

// //Testing code below here
function runLionTests() {
  console.log('\n\n\n');
  console.log("---LION TESTING---");
  console.log("var lionDad = new Lion('Mufasa', '9/29/1900')");
  var lionDad = new Lion('Mufasa', '9/29/1900');
  console.log(lionDad);
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
  console.log(lionCub);
  console.log("lionCub: " + lionCub);
  console.log("lionDad.roar('big'): " + lionDad.roar('big'));
  console.log("lionCub.roar('small'): " + lionCub.roar('small'));
  try {
    console.log("lionCub.speak('Polly want a cracker!')");
    lionCub.speak('Polly want a cracker!');
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("lionCub.swim(50): ");
    lionCub.swim(50);
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("lionDad.fly('North Pole'): ");
    lionDad.fly('North Pole');
  } catch (error) {
    console.log(error);
  }
  console.log('\n\n\n');
}
function runParrotTests() {
  console.log("---PARROT TESTING---");
  console.log("var parrotMom = new Parrot('Polly', '2/1/2010')");
  var parrotMom = new Parrot('Polly', '2/1/2010');
  console.log(parrotMom);
  console.log("parrotMom.name: " + parrotMom.name);
  console.log("parrotMom.birthDate: " + parrotMom.birthDate);
  console.log("parrotMom.getName(): " + parrotMom.getName());
  console.log("parrotMom.getBirthDate(): " + parrotMom.getBirthDate());
  console.log("parrotMom.toString(): " + parrotMom.toString());
  console.log("parrotMom.getAge(): " + parrotMom.getAge());
  console.log("parrotMom.canGiveBirth: " + parrotMom.canGiveBirth);
  console.log("parrotMom.canLayEggs: " + parrotMom.canLayEggs);
  console.log("var nest = parrotMom.layEggs();");
  var nest = parrotMom.layEggs();
  console.log("nest: " + nest);
  console.log(nest);
  console.log("var parrotBaby = nest[0]: ");
  var parrotBaby = nest[0];
  console.log("parrotBaby: " + parrotBaby);
  console.log(parrotBaby);
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
  console.log("parrotBaby.speak('Polly want a cracker!'): ");
  console.log(parrotBaby.speak('Polly want a cracker!'));
  try {
    console.log("parrotBaby.swim(50): ");
    parrotBaby.swim(50);
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("parrotMom.fly('the North Pole'): ");
    console.log(parrotMom.fly('the North Pole'));
  } catch (error) {
    console.log(error);
  }
  console.log('\n\n\n');
}
function runOtterTests() {
  console.log("---OTTER TESTING---");
  console.log("var otterMom = new Otter('Ollie', '7/1/1975')");
  var otterMom = new Otter('Ollie', '7/1/1975');
  console.log(otterMom);
  console.log("otterMom.name: " + otterMom.name);
  console.log("otterMom.birthDate: " + otterMom.birthDate);
  console.log("otterMom.getName(): " + otterMom.getName());
  console.log("otterMom.getBirthDate(): " + otterMom.getBirthDate());
  console.log("otterMom.toString(): " + otterMom.toString());
  console.log("otterMom.getAge(): " + otterMom.getAge());
  console.log("otterMom.canGiveBirth: " + otterMom.canGiveBirth);
  console.log("otterMom.canLayEggs: " + otterMom.canLayEggs);
  console.log("var otterBaby = otterMom.giveBirth();");
  var otterBaby = otterMom.giveBirth();
  console.log("otterBaby: " + otterBaby);
  console.log(otterBaby);
  try {
    console.log("otterMom.roar('big'): ");
    otterMom.roar('big');
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("otterBaby.roar('small'): ");
    otterBaby.roar('small');
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("otterBaby.speak('Polly want a cracker!')");
    otterBaby.speak('Polly want a cracker!');
  } catch (error) {
    console.log(error);
  }
  console.log("otterMom.swim(50): " + otterMom.swim(50));
  try {
    console.log("otterMom.fly('North Pole'): ");
    otterMom.fly('North Pole');
  } catch (error) {
    console.log(error);
  }
  console.log("\n\n\n");
}
function runPenguinTests() {
  console.log("---PENGUIN TESTING---");
  console.log("var penguinMom = new Penguin('Pepper', '12/10/1989')");
  var penguinMom = new Penguin('Pepper', '12/10/1989');
  console.log(penguinMom);
  console.log("penguinMom.name: " + penguinMom.name);
  console.log("penguinMom.birthDate: " + penguinMom.birthDate);
  console.log("penguinMom.getName(): " + penguinMom.getName());
  console.log("penguinMom.getBirthDate(): " + penguinMom.getBirthDate());
  console.log("penguinMom.toString(): " + penguinMom.toString());
  console.log("penguinMom.getAge(): " + penguinMom.getAge());
  console.log("penguinMom.canGiveBirth: " + penguinMom.canGiveBirth);
  console.log("penguinMom.canLayEggs: " + penguinMom.canLayEggs);
  console.log("var nest = penguinMom.layEggs();");
  var nest = penguinMom.layEggs();
  console.log("nest: " + nest);
  console.log("var penguinBaby = nest[0]: ");
  var penguinBaby = nest[0];
  console.log("penguinBaby: " + penguinBaby);
  console.log(penguinBaby);
  try {
    console.log("penguinMom.roar('big'): ");
    penguinMom.roar('big');
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("penguinBaby.roar('small'): ");
    penguinBaby.roar('small');
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("penguinBaby.speak('Polly want a cracker!')");
    penguinBaby.speak('Polly want a cracker!');
  } catch (error) {
    console.log(error);
  }
  try {
    console.log("penguinMom.swim(50): ");
    console.log(penguinMom.swim(50));
  } catch (error) {
    console.log(error);
  }
  console.log("penguinMom.fly('The South Pole'): " + penguinMom.fly('The South Pole'));
  console.log("\n\n\n");
}
function runConstructorTests() {
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
  console.log("var otter = new Otter();");
  try {
    var otter = new Otter();
  } catch (error) {
    console.log(error);
  }
  console.log("var penguin = new Penguin();");
  try {
    var penguin = new Penguin();
  } catch (error) {
    console.log(error);
  }
}

// console.log("allAnimals: ");
// console.log(allAnimals);
// runLionTests();
// runParrotTests();
// runOtterTests();
// runPenguinTests();
// runConstructorTests();

//Define variables
var allPeople = [];
var allLions = [];
var allParrots = [];
var allOtters = [];
var allPenguins = [];
var spawnTime = 5;  //Changed with Parrots
var maxPeople = 5;  //Changed with Lions
var personSpeed = 1;  //Changed with Otters
var timer = spawnTime;
var totalMoney = 0;
var ticketPrice = 12; //Changed with Penguins
var lionCost = 800;
var parrotCost = 200;
var otterCost = 300;
var penguinCost = 400;


//Person constructor
function Person(elem) {
  this.elem = elem;
  this.x = 0;
  this.y = Math.round(Math.random() * 50 + 10);
  this.speed = Math.random() * personSpeed / 3 + 0.1;
  this.lionPaid = false;
  this.parrotPaid = false;
  this.otterPaid = false;
  this.penguinPaid = false;
  this.update = function() {
    this.x += this.speed;
    this.elem.css({
      left: this.x + '%',
      top: this.y + '%',
    });
  };
}

function addPerson() {
  if (allPeople.length < maxPeople) {
    //Create new person's HTML element
    var $person = $('<div class="person"> <div class="head"> </div> </div>');
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    $person.css({
      backgroundColor: 'rgb(' + r + ',' + g + ',' + b + ')',
    });
    $('.road').append($person);
    //Create new person
    var person = new Person($person);
    allPeople.push(person);
    console.clear();
    console.log(allPeople);
  }
}

function addLion() {
  if (totalMoney < lionCost) {
    console.log("Not enough money!");
  } else {
    totalMoney -= lionCost;
    maxPeople += 2;
    var newLion = new Lion('Mufasa', new Date());
    allLions.push(newLion);
    $lion = $("<img class='lion' src='" + newLion.imgurl + "'>");
    $('.lionExhibit').append($lion);
  }
}

function addParrot() {
  if (totalMoney < parrotCost) {
    console.log("Not enough money!");
  } else {
    totalMoney -= parrotCost;
    spawnTime -= 0.5;
    var newParrot = new Parrot('Polly', new Date());
    allParrots.push(newParrot);
    $parrot = $("<img class='parrot' src='" + newParrot.imgurl + "'>");
    $('.parrotExhibit').append($parrot);
  }
}

function addOtter() {
  if (totalMoney < otterCost) {
    console.log("Not enough money!");
  } else {
    totalMoney -= otterCost;
    personSpeed += 0.5;
    var newOtter = new Otter('Ollie', new Date());
    allOtters.push(newOtter);
    $otter = $("<img class='otter' src='" + newOtter.imgurl + "'>");
    $('.otterExhibit').append($otter);
  }
}

function addPenguin() {
  if (totalMoney < penguinCost) {
    console.log("Not enough money!");
  } else {
    totalMoney -= penguinCost;
    ticketPrice += 5;
    var newPenguin = new Penguin('Pepper', new Date());
    allPenguins.push(newPenguin);
    $penguin = $("<img class='penguin' src='" + newPenguin.imgurl + "'>");
    $('.penguinExhibit').append($penguin);
  }
}

$('.addLion').click(addLion);
$('.addParrot').click(addParrot);
$('.addOtter').click(addOtter);
$('.addPenguin').click(addPenguin);

function playGame() {
  if (timer > spawnTime) {
    addPerson();
    timer = 0;
  }

  for (person of allPeople) {
    var index = allPeople.indexOf(person);
    if (person.x > 100) {
      person.elem.remove();
      allPeople.splice(index,1);
      console.clear();
      console.log(allPeople);
    } else if (person.x > 10 && !person.lionPaid) {
      $money = $("<div class='money'>$</div>");
      person.elem.append($money);
      setTimeout(function() {
        $money.css({
          transform: 'translate(0, -10px)',
          opacity: 0,
        });
      }, 100);
      person.lionPaid = true;
      totalMoney += ticketPrice;
    } else if (person.x > 35 && !person.parrotPaid) {
      person.elem.find('.money').remove();
      $money = $("<div class='money'>$</div>");
      person.elem.append($money);
      setTimeout(function() {
        $money.css({
          transform: 'translate(0, -10px)',
          opacity: 0,
        })
      }, 100);
      person.parrotPaid = true;
      totalMoney += ticketPrice;
    } else if (person.x > 60 && !person.otterPaid) {
      person.elem.find('.money').remove();
      $money = $("<div class='money'>$</div>");
      person.elem.append($money);
      setTimeout(function() {
        $money.css({
          transform: 'translate(0, -10px)',
          opacity: 0,
        })
      }, 100);
      person.otterPaid = true;
      totalMoney += ticketPrice;
    } else if (person.x > 85 && !person.penguinPaid) {
      person.elem.find('.money').remove();
      $money = $("<div class='money'>$</div>");
      person.elem.append($money);
      setTimeout(function() {
        $money.css({
          transform: 'translate(0, -10px)',
          opacity: 0,
        })
      }, 100);
      person.penguinPaid = true;
      totalMoney += ticketPrice;
    }
    person.update();
  }

  $('.gate').html("Ticket Price: $" + ticketPrice +
                    "<br>Speed Factor: " + personSpeed +
                    "<br>Max Occupancy: " + maxPeople +
                    "<br>Spawn rate: " + (spawnTime));
  $('.totalProfit').text("Total Profit: $" + totalMoney);
  timer += 0.02;
}

setInterval(playGame, 20);

});
