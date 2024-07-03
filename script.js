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

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, index) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">
            ${index + 1} ${type}
      </div>
      <div class="movements__value">${mov} €</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

// Computing usernames
const usernameObject = function (accounts) {
  accounts.forEach(function (account) {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map(elem => elem[0])
      .join('');
  });
};
usernameObject(accounts);
console.log(accounts);

// Calculating the overall balance
const calcPrintBalance = function (movements) {
  const balance = movements.reduce(function (acc, val) {
    return acc + val;
  }, 0);
  labelBalance.textContent = `${balance}€`;
};
calcPrintBalance(account1.movements);

// Calculating the incoming, outgoing and interest values
// Incoming is sum of all deposits

const calcDisplaySummary = function (movements) {
  // Incoming deposits
  labelSumIn.textContent = `${movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov)}€`;
  // Outgoing money
  labelSumOut.textContent = `${Math.abs(
    movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
  )}€`;
  // Interest money - Bank pays an interest of 1.2% each time a money is deposited
  const sum = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * 1.2) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${sum}€`;
};

calcDisplaySummary(account1.movements);
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

currencies.forEach(function (val, key, map) {
  console.log(`${val} : ${key}`);
});

// SETS
// In set order in which elements are present does not matter because of which in set first two paramater are the value of set and the 3rd parameter is set itself. This was kept this way in order to avoid the confusion. The _ is a throwable parameter which is basically not needed
const mySet = new Set(['a', 'b', 'c', 'd']);

mySet.forEach(function (val, _, set) {
  console.log(val);
});
// The introduction to map, reduce and filter method
// Map method as name suggests map the array element with some value say map an array = [1,3,4,5,6] multiply 2 = [2,6,8,10,12]
// map method also just like for each method helps us to loop over the array method but it returns a brand new array
const euroToUsd = 1.1;
const movementsUsd = movements.map(move => move * euroToUsd);

// This is more of a functional programming paradigm
const notArrow = movements.map(function (move) {
  return move * euroToUsd;
});

console.log(movements);
console.log(movementsUsd);
console.log(notArrow);

// Other way of doing this
const movementsUsdfor = [];
for (const mov of movements) {
  movementsUsdfor.push(mov * euroToUsd);
}

console.log(movementsUsdfor);

const newMovements = movements.map(function (movement) {
  if (movement > 0) {
    return `Cash deposited in bank :${movement}`;
  } else {
    return `Cash withdrawn from bank :${Math.abs(movement)}`;
  }
});
console.log(newMovements);

// filter method in array
// So filter method basically filters the elements out of array, lets look at an example to understand the same
const deposits = movements.filter(function (mov) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);
// using for of loop
const forOfLoop = [];
for (const val of movements) {
  if (val > 0) {
    forOfLoop.push(val);
  }
}
console.log(deposits);
// Now question is we can simply do the same using for of loop why to use this filter method ?? The answer to this is 1. The push going for functional programming and second we can chain different methods alongside which may not be possible for the normal way.

const withdrawls = movements.filter(function (mov) {
  return mov < 0;
});
console.log(withdrawls);

// The reduce method - this method is responsible for reducing the array elements to a single value for eg say sum of the array elements
console.log(movements);
// acc is just like a snowball
const remainingBalance = movements.reduce(function (acc, val) {
  console.log(acc);
  return acc + val;
}, 0);
// using arrow function
const remainingBalanceArrow = movements.reduce((acc, val) => acc + val, 0);
console.log(remainingBalanceArrow);

console.log(remainingBalance);
// lets do the same thing manually using for of loop
let sum = 0;
for (const val of movements) {
  console.log(sum);
  sum += val;
}
console.log(sum);

console.log(movements);
// Find maximum val of movements array
const maxVal = movements.reduce(function (acc, val) {
  return acc < val ? val : acc;
}, movements[0]);
// using arrow func
const maxVal2 = movements.reduce(
  (acc, val) => (acc < val ? val : acc),
  movements[0]
);
// The power of chaining these methods so uptil now we were using these methods all alone either calling filter, reduce or map method but all alone not together but we can also chain these methods together

console.log(movements);
// map these values to euro
const result = movements
  .map(mov => mov * 1.1)
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
console.log(result);

// Remarks on chaining
// 1. We should not over use chaining , chaining can cause performance issue
// 2. we should be careful when we use chaining methods should not use methods which mutate the original array
// Coding challenge

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const checkDogs = function (dogsJulia, dogsKate) {
  // Part 1
  const onlyDogsJulia = [...dogsJulia];
  onlyDogsJulia.splice(0, 1);
  onlyDogsJulia.splice(-2);

  // Part 2
  const combinedDogs = onlyDogsJulia.concat(dogsKate);
  console.log(combinedDogs);

  // Part 3
  combinedDogs.forEach(function (val, index) {
    if (val >= 3) {
      console.log(
        `Dog number ${index + 1} is an adult, and is ${val} years old`
      );
    } else {
      console.log(
        `Dog number ${index + 1} is an puppy, and is ${val} years old`
      );
    }
  });
};

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];
checkDogs(dogsJulia, dogsKate);
console.log(`----------TEST CASE 2 ----------`);
const dogsJulia2 = [9, 16, 6, 8, 3];
const dogsKate2 = [10, 5, 6, 1, 4];
checkDogs(dogsJulia2, dogsKate2);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = function (ages) {
  // Part 1 -> Using map method
  const dogAgeToHumanAge = ages.map(age => (age > 2 ? 16 + age * 4 : age * 2));
  // Part 2 -> Using filter method to filter these dogs
  const humanAgeOfDogs = dogAgeToHumanAge.filter(humanAge => humanAge >= 18);
  // Part 3 -> average of all adult dogs
  const averageAge = humanAgeOfDogs.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  return averageAge;
  // Another way is divide the array length from each element so changing the above accordingly
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
