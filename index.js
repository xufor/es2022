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


// ========================================== top level await ========================================== //


// usually we had to do an await like this
// async function anAsyncFunction() {
//     await import('./another_script.js');
// }

// anAsyncFunction();

// but we can now use await without wrapping it in a function
// and hence the name, "top level await"
// await import('./another_script.js');