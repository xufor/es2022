// ========================================== .at() method ========================================== //
// console.log(Array.prototype);

// const arr = ['hello', 5, false];
// what will this line print?
// console.log(arr[0]);
// will the below line throw an error?
// console.log(arr[5]);
// will the below line throw an error?
// console.log(arr[-1]);

// what to do if we don't know the size of the arr and we want to access the last element?
// console.log(arr[arr.length - 1]);

// but thats a lot of code, RIGHT?
// ES22 has a solution for this and spoiler alert -> Python lists introduced this feature a long time ago!
// console.log(arr.at(-1));

// predict the output for the next line
// console.log(arr.at(-4));

// predict the output for the next line
// console.log(arr.at(-3));

// predict the output for the next line
// console.log(arr.at());

// this function works on strings too!
// console.log("A string".at(-1));

// write a polyfill for this function (only for arrays)??
// Array.prototype.myImplementationOfAt = function(index = 0) {
//     return this[index < 0 ? index + this.length : index];
// }

// console.log(arr.at(-1) === arr.myImplementationOfAt(-1));
// console.log(arr.at(-4) === arr.myImplementationOfAt(-4));
// console.log(arr.at(-3) === arr.myImplementationOfAt(-3));
// console.log(arr.at() === arr.myImplementationOfAt());
// console.log(arr.at(2) === arr.myImplementationOfAt(2));
// console.log(arr.at(5) === arr.myImplementationOfAt(5));

// ========================================== Object.hasOwn() ========================================== //

// const object1 = {
//     property1: "10",
//     property2: function() {
//         console.log(this.property1);
//     }
// };

// const object2 = {
//     property3: 30,
//     property4: function() {
//         console.log(this.property1, this.property3, this.property1 + this.property3);
//     },
//     property5: function() {
//         console.log(this.property1, this.property3, this.property1 - this.property3);
//     }
// }

// object2.property4();
// object2.property5();

// Object.setPrototypeOf(object2, object1);

// object2.property4();
// object2.property5();

// what just happened?
// initially the prototype chain for object1 was: object1 ------> Object.prototype ------> null
// similarly the prototype chain for object2 was: object2 ------> Object.prototype ------> null
// after Object.setPrototypeOf(object2, object1) executed

// the prototype chain for for object 1 was still the same
// but the prototype chain for object2 became: object2 ------> object1 ----->  Object.prototype ------> null
// which means any property we try to access in object2 will be searched in object1

// thus we should be able to do
// console.log(object2.property1);

// this is a trick one try to guess this
// console.log(object2.property2());

// but what if I wanted to check if object2 has a property of its own and it has not borrowed it from object1, we can do
// console.log(object2.hasOwnProperty('property3'));
// console.log(object2.hasOwnProperty('property1'));

// by the way hasOwnProperty is a borrowed property itself!

// but we can accidentally or intensionally override hasOwnProperty by defining it on object2 itself
// object2.hasOwnProperty = () => 'Buzzinga!';

// now if we try the same function
// console.log(object2.hasOwnProperty('property1'));

// thus now we can use a static method from the Object global
// console.log(Object.hasOwn(object2, 'property1'));
// console.log(Object.hasOwn(object2, 'property3'));

// but what if someone is wicked enough to do this
// Object.hasOwn = () => 'Buzzinga';
// console.log(Object.hasOwn(object2, 'property1'));
// console.log(Object.hasOwn(object2, 'property3'));

// this person should have some serious explanation to this kind of blunder

// const object3 = Object.create(null);
// no hasOwnProperty present in prototype chain
// console.log(object3.hasOwnProperty); 
// Object.hasOwn() saves the day
// console.log(Object.hasOwn(object3, 'property1')); 

// ========================================== top level await ========================================== //

// usually we had to do an await like this
// async function anAsyncFunction() {
//     await import('./another_script.js');
// }

// anAsyncFunction();

// but we can now use await without wrapping it in a function
// and hence the name, "top level await"
// await import('./another_script.js');

// ========================================== error.cause ========================================== //

// now we can also pass the actual error that caused us to throw an error
// function function1() {
//   try {
//     let ref = null;
//     ref();
//   } catch (error) {
//     throw new Error('Error in function 1.', { cause: error });
//   }
// }

// function function2() {
//   try {
//     function1();
//   } catch (error) {
//     console.log('Message: ', error.message);
//     console.log('Cause: ', error.cause);
//     console.log('Message of cause error: ', error.cause.message);
//   }
// }

// function2();

// ========================================== New Class Members ========================================== //

// >>>>> PUBLIC INSTANCE FIELDS <<<<< //

// earlier public instance fields used to declared like this, have no other way to safely declare without using contructor
// class Animalia {
//   constructor(genus, species) {
//     this.genus = genus;
//     this.species = species;
//   }

//   printDetails() {
//     console.log(`genus: ${this.genus}\nspecies: ${this.species}`);
//   }
// }

// const dog = new Animalia('Canis lupus', 'Canis');

// this is a public field
// dog.printDetails();

// now we can also create public instance fields like this
// this is super readable as we do not need to look for the constructor to know the instance fields.
// also, we can give a default value without using a contructor
// class Animalia {
//   genus = '';
//   species = '';

//   printDetails() {
//     console.log(`genus: ${this.genus}\nspecies: ${this.species}`);
//   }
// }

// const dog = new Animalia('Canis lupus', 'Canis');
// dog.printDetails();


// >>>>> PUBLIC STATIC FIELDS <<<<< //

// earlier public static fields used to declared like this
// STATIC means not related to [[instance]] but its related to [[class]]
// class Animalia {
//   constructor(genus, species) {
//     this.genus = genus;
//     this.species = species;
//     Animalia.totalAnimalsRegistered += 1; 
//   }

//   printDetails() {
//     console.log(`genus: ${this.genus}\nspecies: ${this.species}`);
//   }
// }

// this is very much like C++
// Animalia.totalAnimalsRegistered = 0;

// new way of creating public static fields is this
// class Animalia {
//   static totalAnimalsRegistered = 0;

//   constructor(genus, species) {
//     this.genus = genus;
//     this.species = species;
//     Animalia.totalAnimalsRegistered += 1; 
//   }

//   printDetails() {
//     console.log(`genus: ${this.genus}\nspecies: ${this.species}`);
//   }
// }

// console.log(Animalia.totalAnimalsRegistered);
// const dog = new Animalia('Canis lupus', 'Canis');
// const tiger = new Animalia('Panthera', 'P. tigris');
// const baboon = new Animalia('Papio', 'P. hamadryas');
// console.log(Animalia.totalAnimalsRegistered);


// >>>>> PRIVATE INSTANCE FIELDS <<<<< //

// class SomeLibrary {
//   // these functions should not be exposed to the user of the library
//   // coz any change in these will break the working of our library
//   #windowInstance = null;

//   #openPopupWindow(popupUrl, height, width) {
//     let left = screen.width / 2 - width / 2;
//     let top = screen.height / 2 - height / 2;

//     this.#windowInstance = window.open(
//       popupUrl,
//       'childWindow',
//       'status=1, height=' +
//         height +
//         ', width=' +
//         width +
//         ', toolbar=0,resizable=0,top=' +
//         top +
//         ', left=' +
//         left
//     );
//   }

//   // these functions can be exposed to the user of the library
//   openWindow() {
//     this.#openPopupWindow('http://www.google.com', 500, 500);
//   }
  
//   closeWindow() {
//     this.#windowInstance.close();
//   }
// }

// const libInstance = new SomeLibrary();
// libInstance.openWindow();
// setTimeout(() => libInstance.closeWindow(), 5000);

// >>>>> PRIVATE STATIC FIELDS <<<<< //

// class SomeLibrary {
//   // extending the previous example
//   // lets say for each and every instance created we don't want to create a new window
//   static #windowInstance = null;

//   static #openPopupWindow(popupUrl, height, width) {
//     let left = screen.width / 2 - width / 2;
//     let top = screen.height / 2 - height / 2;

//     SomeLibrary.#windowInstance = window.open(
//       popupUrl,
//       'childWindow',
//       'status=1, height=' +
//         height +
//         ', width=' +
//         width +
//         ', toolbar=0,resizable=0,top=' +
//         top +
//         ', left=' +
//         left
//     );
//   }

//   // these functions can be exposed to the user of the library
//   static openWindow() {
//     SomeLibrary.#openPopupWindow('http://www.google.com', 500, 500);
//   }
  
//   static closeWindow() {
//     SomeLibrary.#windowInstance.close();
//   }
// }

// SomeLibrary.openWindow();
// setTimeout(() => SomeLibrary.closeWindow(), 5000);


// >>>>> STATIC BLOCKS <<<<< //

// static blocks are basically a way to initialize static fields
// they can be very useful if the class has no instance members and no constructors

// class SomeClass {
//   static countOfRandomNumbers = 5;
//   static randomNumberList = [];

//   static {
//     // nice thing to note is that static block is executed as soon as the class is read by the interpreter
//     // also note that we can use [[this]] instead of class name in static scopes
//     console.log('executing static block');
//     for(let i = 0; i < this.countOfRandomNumbers; i++) {
//       this.randomNumberList.push(Math.round(Math.random() * 100));
//     }
//   }

//   static printData() {
//     console.log(this.randomNumberList);
//   }
// }

// SomeClass.printData();

// >>>>> SLOT CHECKS <<<<< //

// class Shape {
//     sides = 4;
//     #area = 67;

//     hasArea(obj) {
//         return #area in obj;
//     }
// }

// class Animal {}

// const shape = new Shape();
// const animal = new Animal();

// console.log(shape.hasArea(shape), shape.hasArea(animal));

// ========================================== Temporal API ========================================== //

// const now = Temporal.Now.plainDateTimeISO();
// console.log(now.toString());
// console.log(now.add({ days: 1, months: 1, years: 1 }).toString());
// console.log(now.subtract({ days: 1, months: 1, years: 1 }).toString());

// const anotherNow = Temporal.Now.plainDateTimeISO();
// console.log(now.since(anotherNow).toString());

// ========================================== Regexp Match Indices ========================================== //

// const wordsAndNumbers = 'a42very5happy989new776year452';
// const regex = /\d+/gd;
// const matches = wordsAndNumbers.matchAll(regex);
// notice the indices property in the array of results
// console.log([...matches]);

