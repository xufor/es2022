// ========================================== .at() method ========================================== //
// const arr = ['hello', 5, false, 'last value'];

// how to access the last element?
// console.log(arr[arr.length - 1]);

// but thats a lot of code, RIGHT?
// ES2022 has a solution for this and python coders know -> Python lists introduced this feature a long time ago!
// console.log(arr.at(-1));

// predict the output for the next line, its easy
// console.log(arr.at(-4));

// predict the output for the next line
// console.log(arr.at(-5));

// but hey this is no surprise
// console.log(arr.at(10));

// and if no argument is provided
// console.log(arr.at());

// this function works on strings too!
// console.log("A string".at(-1));

// ========================================== Object.hasOwn() ========================================== //

// lets quicky create a prototype chain
// const obj1 = { property1: 'I am property 1' };
// const obj2 = { properyt2: 'I am property 2' };

// and the prototype chain is ready

// Object.setPrototypeOf(obj2, obj1);

// the chain looks like this  obj2 -----> obj1 ----->  Object.prototype ---> null

// obj2 has property2
// obj1 has property1
// Object.prototype has many instance methods

// we can access if property1 in obj2, which is from obj1
// console.log(obj2.property1);

// but what if I wanted to check if obj2 has a property of its own and it has not borrowed it from obj1, we can do
// console.log(obj2.hasOwnProperty('property1'));

// but we can accidentally or intensionally override hasOwnProperty by defining it on object2 itself
// obj2.hasOwnProperty = () => 'Buzzinga!';

// now if we try the same function
// console.log(obj2.hasOwnProperty('property1'));

// thus now we can use a static method from the Object global
// console.log(Object.hasOwn(obj2, 'property1'));

// but what if someone is wicked enough to do this
// Object.hasOwn = () => 'Bigger Buzzinga!';
// console.log(Object.hasOwn(obj2, 'property1'));

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

// this is super readable as we do not need to look for the constructor to know the instance fields.
// also, we can give a default value without using a contructor
// class Animalia {
//   genus = 'default genus';
//   species = 'default species';

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
// we need not wait for the first instance to be created

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

// ========================================== Regexp Match Indices ========================================== //

// const wordsAndNumbers = 'a42ve455happy989new776year452';
// const regex = /\d+/gd;
// const matches = wordsAndNumbers.matchAll(regex);
// // notice the indices property in the array of results
// console.log([...matches]);

// Lets run this code in Node.js
// const wordsAndNumbers = 'a42ve455happy989new776year452';
// const regex = /\d+/g;
// const matches = wordsAndNumbers.matchAll(regex);
// console.log([...matches]);
