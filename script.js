'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// Methods on array - arrays are basically objects and methods are basically function which can be called on it. Now why these methods are accessible to each array we will learn in later section but here we will cover some imp array methods

// 1. slice method - similar to what we saw in string section - negative value indicates give me last say we write -3 so give me ending 3 array value or we can say from last index start from -1

let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -1));
// We can also create shallow copy of the array using slice method also how lets see
console.log(arr.slice());
console.log([...arr]);
// Both above help us to create a shallow copy, now question is which one to use ? The answer depends upon with which one you are comfortable with

// 2. splice method - It is kind of similar to slice method the difference is mutates the original array also
arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(2, 2)); // the part that is spliced is removed from
console.log(arr);
// the very common usecase of splice method is removing the array last element
arr.splice(-1);
console.log(arr);
// Also if we pass 2nd parameter in splice method it is not similar to slice method the 2nd parameter is length to which you want to remove

// 3. Reverse the array The thing about reverse method is that it also mutates the array
arr = ['a', 'b', 'c', 'd', 'e'];
const brr = ['e', 'f', 'g', 'h', 'i'];
console.log(arr.reverse());
console.log(arr);

// 4. Concat method - concat two arrays - it does mutate the array which calls the mutate method

console.log(arr.concat(brr));

// 5. Join
console.log(arr.join(','));

// The new at method, so traditionally if we wanted to get any element from array we used

const crr = [2, 34, 43, 26, 74, 23];
console.log(crr[2]);
// we want last element
console.log(crr[crr.length - 1]);

// Now in es2022 we have a new way and this not only works with array but string also

console.log(crr.at(-1));
console.log(crr.at(3));

// for each method to loop over the array elements
const drr = [2, 34, 643, 656, 23, 23, 45, 67, 632];

// For each method to loop over the array method
arr = [13, 23, 131, 32, 23];
arr.forEach(function (value, index, arr) {
  console.log(value, index, arr);
});

// lets traverse over the movements array using for each and print cash withdraw or deposit over console

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

movements.forEach(function (movement, index, array) {
  if (movement > 0) {
    console.log(`Cash deposited in bank :${movement}`);
  } else {
    console.log(`Cash withdrawn from bank :${Math.abs(movement)}`);
  }
});
// Now a question comes to mind which method is better to traverse for the array, the forEach method is kind of clean and also we cant use break or continue statement so we have to traverse the entire array every time.


// forEach methods on maps and sets - lets quickly revise maps and sets first

// MAPS 
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(val, key, map){
console.log(`${val} : ${key}`);
})

// SETS
// In set order in which elements are present does not matter because of which in set first two paramater are the value of set and the 3rd parameter is set itself. This was kept this way in order to avoid the confusion. The _ is a throwable parameter which is basically not needed
const mySet = new Set(['a','b','c','d']);

mySet.forEach(function(val, _, set){
console.log(val);
})