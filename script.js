// BANKIST APP

/////////////////////////////////////////////////
'use strict';
/////////////////////////////////////////////////
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

const displayMovements = function (movements, sorted) {
  const movs = sorted ? movements.slice().sort((a, b) => a - b) : movements;
  containerMovements.innerHTML = '';
  movs.forEach(function (mov, index) {
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
const calcPrintBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, val) {
    return acc + val;
  }, 0);

  labelBalance.textContent = `${acc.balance}€`;
};

const displayUI = function (acc) {
  calcPrintBalance(acc);
  calcDisplaySummary(acc);
  displayMovements(acc.movements);
};
// Calculating the incoming, outgoing and interest values
// Incoming is sum of all deposits

const calcDisplaySummary = function (account) {
  // Incoming deposits
  labelSumIn.textContent = `${account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov)}€`;
  // Outgoing money
  labelSumOut.textContent = `${Math.abs(
    account.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov)
  )}€`;
  // Interest money - Bank pays an interest of 1.2% each time a money is deposited
  const sum = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov);
  labelSumInterest.textContent = `${sum}€`;
};

// Implementing login
let currentAccount;
btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  console.log('Login');
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  // Now we first need to check if current account exists or not
  console.log('current account' + currentAccount);
  console.log('inputLoginPin.value ' + inputLoginPin.value);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }!`;
    // display UI
    containerApp.style.opacity = '100%';
    // Removing values from input field and blur the focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    displayUI(currentAccount);
    // start/restart the timeout login
  }
});

// Implementing transfer money
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Request for money tranfer is initiated');

  // 1. Check if the account we want to transfer money to is valid or not
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(
    account =>
      account.username === inputTransferTo.value &&
      account.username != currentAccount.username
  );
  console.log(amount);
  console.log(receiverAccount);

  // Checking if accountToTransferMoney and balance is appropriate
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    displayUI(currentAccount);
  }
  inputTransferAmount.value = '';
  inputTransferTo.value = '';
});

// Implementing loan feature
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(
    'Request loan is initiated and amount money is :' + inputLoanAmount.value
  );
  // Implementing the condition for approving loan based on flow chart
  const amountRequested = Number(inputLoanAmount.value);
  const isLoanGranted = currentAccount.movements.some(
    mov => mov > 0 && mov > 0.1 * amountRequested
  );
  console.log(isLoanGranted);
  if (amountRequested > 0 && isLoanGranted) {
    currentAccount.movements.push(amountRequested);
    console.log(currentAccount);
    displayUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Implementing close account feature - You can only close your own account - when closing an account we need to take care of few things 1. username and password should match - once confirmed we simply slice of the element from accounts array that's it.

btnClose.addEventListener('click', function (e) {
  console.log('Button close is printed');
  e.preventDefault();
  const userName = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  // Check if username and password is correct as per the currentAccount
  if (currentAccount.username === userName && currentAccount.pin === pin) {
    console.log('Closing account in process');
    const accountToClose = accounts.findIndex(acc => acc.username === userName);
    accounts.splice(accountToClose, 1);
    // Now as soon as an account is closed we need to go back to login screen
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = '0';
  }
});
// Sorting the array
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Button is clicked');
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
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

// Topic name => find method
const firstWithdrawl = movements.find(function (mov) {
  return mov < 0;
});
console.log(firstWithdrawl);

const testArray = [1, 2, 3, 4];
const firstNegativeVal = testArray.find(function (mov) {
  return mov < 0;
});
console.log(firstNegativeVal);
// If the element value is not found it will return the undefined

const objectReturnedFromArray = accounts.find(function (acc) {
  return acc.owner === 'Jessica Davis';
});

console.log(objectReturnedFromArray);
// Find method is kind of similar to filter method but yet different find method basically just returns the very 1st array element which satisfies the condition whereas filter method returns an array.

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

function checkDogs(dogsJulia, dogsKate) {
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
}

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

// Coding Challenge #3
/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
const calcAverageHumanAgeArrow = ages =>
  ages
    .map(age => (age > 2 ? 16 + age * 4 : age * 2))
    .filter(humanAge => humanAge >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));

// Other array methods - some and every
console.log(movements);
// we already know in order to check if any element present in array or not we can use includes method but in this case it is a strict equality what if we want to return true or false based on some condition ? Then we have some method
console.log(movements.includes(-130));

const anyDeposit = movements.some(function (mov) {
  return mov > 0;
});
console.log(anyDeposit);
// May be similar to filter method but filter, map method gives us an array not a boolean value.

// EVERY method - kind of similar if every element within the array satisfies the condition then output is true
const vrr = [2, 3, -23, 5, 5, 7];
const everyElementPositive = vrr.every(val => val > 0);
console.log(everyElementPositive);

// flat and flatMap method of array
const flatArr = [1, 2, 3, [4, [5, 6]], [7, 8, 9]];
console.log(flatArr.flat(2));
// flat method for array basically flattens the array to level 1 what if you have more nested array lets try it
// so the output of the above will be like [1, 2, 3, 4, Array(2), 7, 8, 9] which means by default the default map depth is 1 what if we want to flat this also. Then we have to pass in the argument.
// let us take another eg say we want to calculate the overall balance for the bankist application

const movementsArray = accounts
  .map(mov => mov.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(movementsArray);
// Now in everyday programming of js the developers found it is quite needed to use flat and map together so they came up with method called flat map so we can map and flat the elements together
const movementsArray2 = accounts
  .flatMap(mov => mov.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(movementsArray);
// The point to note in here is we have flatMap only 1 level deep so in case we need it to flat more level then we need to have it separately.

// Sorting of array in JS
// In order to sort the array in JS it is quite easy let us look at an eg and undertand how its done
const test = ['bni', 'anki', 'albin', 'bishu', 'ragav', 'vinisai'];
console.log(test.sort());
// Sort method mutates the original array just like reverse method
console.log(test);
// Sorting method works on strings but when we try to sort the numeric values it doesnt
const test2 = [-23, -56, -1, 89, 34, 20, 45];
// Sorting in ascending
console.log(test2.sort((a, b) => a - b));
// Sorting in descending
console.log(test2.sort((a, b) => b - a));
// So to sort the numeric value we have to pass a comparison operator

// Topic name - How to create an array programatically, so uptil now we have learnt these ways of creating an array like const arr = [], const brr = new Array([1,2,3,4,5]), we have other ways also to create an array

// The empty array and fill method used together
console.log([2, 3, 5, 6, 2, 0]);
console.log(new Array([2, 3, 4, 3, 3]));

const r = new Array(9).fill(0);
// creating an empty array and filling it with 0
console.log(r);
//  we can also use fill method to fill and already existing array, fill method also mutates the original array
const testArr = [1, 2, 3, 4, 5, 6, 7, 8];
console.log(testArr.fill(4, 0, 3));

// What if we want to create an array programatically like const arr = [1,2,3,4,5,6,7,8,9]; how can we achieve the same ?
// The from method takes two parameter 1. length (length of the desired array as an object, callback function)
const x = Array.from({ length: 10 }, () => 1);
console.log(x);
const z = Array.from({ length: 20 }, (_, i) => i + 1);
console.log(z);
// Challenge - create an array with 100 dice roll
const diceRoll = Array.from(
  { length: 100 },
  () => Math.floor(Math.random() * 6) + 1
);
console.log(diceRoll);

// A more useful general use of Array from method
const valueFromUI = labelBalance.addEventListener('click', function () {
  const movFromUI = Array.from(document.querySelectorAll('.movements__value'));
  console.log(movFromUI.map(mov => Number(mov.textContent.replace('€', ''))));
});

// Array methods practise

// 1. How much total deposits is done till now in bank across all the bank
const sumOfDeposit = accounts
  .flatMap(acc => acc.movements)
  .filter(val => val > 0)
  .reduce((acc, val) => acc + val, 0);

console.log(sumOfDeposit);

// 2. How many deposits is there in bank for atleast 1000$

const minimumSum = accounts
  .flatMap(acc => acc.movements)
  .filter(val => val >= 1000).length;

console.log(minimumSum);

// how to achieve the same using reduce method

const minimumSumReduce = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, val) => (val >= 1000 ? (acc = acc + 1) : acc), 0);

console.log(minimumSumReduce);
// Now one might think of using acc++ instead of acc but this is a postfix operator so it do increment the value but return the original value. Let us take an eg for the same
let p = 9;
console.log(p++);
console.log(p);

// 3. create return an object using reduce method { deposit: amount1, withdrawal}

const depositWithdrawal = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (acc, val) => {
      val > 0 ? (acc.deposit += val) : (acc.withdrawal += val);
      return acc;
    },
    { deposit: 0, withdrawal: 0 }
  );
console.log(depositWithdrawal);

// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

GOOD LUCK 😀
*/
