//  POLYFILLS INTERVIEW QUESTIONS

/**
 * MAP, FILTER, AND REDUCE ARE ARRAY METHODS USED TO ITERATE OVER AN ARRAY AND PERFORM TRANSFORMATIONS OR COMPUTATIONS.
 * - MAP: Map method is used for creating a new array from existing one by applying a function to each one of the elements of the first array.
 * - FILTER: Filters takes each element in an array and it applies a conditional statement against it. If the conditional returns true the elements get pushed into the output array else if it is false then the element does not get pushed into the output array. Basically it filters element which fulfill the provided criteria.
 * - REDUCE: Reduces method reduces an array of values down to just one value. Accumulator is the result of the previous computation value. If there is no initial value, it takes first element of array as value for accumulator.
 */

// Sample input array
const nums = [10, 2, 3, 4, 5];

// -------------------------------------------
// 1. MAP Polyfill
// -------------------------------------------

/**
 * Array.prototype.myMap
 * - Creates a new array populated with the results of calling a provided function on every element.
 * - This line adds a new function called myMap to the prototype of the Array object.
 * - By doing this, all arrays will have access to this myMap method.
 * - cb is a parameter representing a callback function that you pass when calling myMap on an array.
 * - this refer to the array on which myMap was called. For example, if you did nums.myMap(...), this would be nums.
 */
Array.prototype.myMap = function (cb) {
  // 1. Throw TypeError if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myMap called on null or undefined");
  }

  // 2. Throw TypeError if callback is not a function
  if (typeof cb !== "function") {
    throw new TypeError(cb + "is not a function");
  }

  // 3. Create a temporary array to store the results
  let temp = [];

  // 4. Iterate over each element of the array
  for (let i = 0; i < this.length; i++) {
    // 5. Call the callback function 'cb' on the current element
    // Pass current element, index, and entire array as arguments
    const mappedValue = cb(this[i], i, this);

    // 6. Push the result of callback into the temp array
    temp.push(mappedValue);
  }

  // 7. Return the new array with transformed values
  return temp;
};

// Using built-in map
const mapResult = nums.map((num, i, arr) => {
  return num * 5 + i;
});

// Using custom myMap polyfill
const myMapResult = nums.myMap((num, i, arr) => {
  return num * 5 + i;
});

console.log("Map:", mapResult, myMapResult);

// -------------------------------------------
// 2. FILTER Polyfill
// -------------------------------------------

/**
 * Array.prototype.myFilter
 * - Creates a new array with all elements that pass the test implemented by the provided function.
 * * - This line adds a new function called myMap to the prototype of the Array object.
 * - By doing this, all arrays will have access to this myFilter method.
 * - cb is a parameter representing a callback function that you pass when calling myMap on an array.
 * - this refer to the array on which myMap was called. For example, if you did nums.myFilter(...), this would be nums.
 */
Array.prototype.myFilter = function (cb) {
  // 1. Throw TypeError if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myFilter called on null or undefined");
  }

  // 2. Throw TypeError if callback is not a function
  if (typeof cb !== "function") {
    throw new TypeError(cb + "is not a function");
  }

  // 3. Create a temporary array to store the filtered results
  let temp = [];

  // 4. Iterate over each element of the array
  for (let i = 0; i < this.length; i++) {
    // 5. Call the callback function 'cb' on the current element
    // Pass current element, index, and entire array as arguments
    const shouldInclude = cb(this[i], i, this);

    // 6. If callback returns true, push the element into temp array
    if (shouldInclude) {
      temp.push(this[i]);
    }
  }

  // 7. Return the new array with elements that passed the test
  return temp;
};

// Using built-in filter
const filterResult = nums.filter((num, i, arr) => {
  return num > 3;
});

// Using custom myFilter polyfill
const myFilterResult = nums.myFilter((num, i, arr) => {
  return num > 3;
});

console.log("Filter:", filterResult, myFilterResult);

// -------------------------------------------
// 3. REDUCE Polyfill
// -------------------------------------------

/**
 * Array.prototype.myReduce
 * - Executes a reducer function on each element of the array, resulting in a single output value.
 */
Array.prototype.myReduce = function (cb, initialValue) {
  // 1. Throw TypeError if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myReduce called on null or undefined");
  }

  // 2. Throw TypeError if callback is not a function
  if (typeof cb !== "function") {
    throw new TypeError(cb + "is not a function");
  }

  // 1. Determine whether an initial value is provided
  let accumulator = initialValue !== undefined ? initialValue : this[0];

  // 2. If no initial value is provided, start the loop from index 1, otherwise
  //  start from index 0
  let startIndex = initialValue !== undefined ? 0 : 1;

  // 3. Iterate over each element in the array, starting from 'startIndex'
  for (let i = startIndex; i < this.length; i++) {
    // 4. Call the callback function with accumulator, current element, index
    // and array itself;
    accumulator = cb(accumulator, this[i], i, this);
  }
  // 5. Return the final accumulated value
  return accumulator;
};

// Example 1: Without initial value (acc = 10, curr = 2)
const reduce1 = nums.reduce((acc, curr) => acc + curr);
const myReduce1 = nums.myReduce((acc, curr) => acc + curr);
console.log("Reduce #1 (no initial):", reduce1, myReduce1);

// Example 2: With initial value 0 (acc = 0, curr = 10)
const reduce2 = nums.reduce((acc, curr) => acc + curr, 0);
const myReduce2 = nums.myReduce((acc, curr) => acc + curr, 0);
console.log("Reduce #2 (initial 0):", reduce2, myReduce2);

// Example 3: With initial value 11 (acc = 11, curr = 10)
const reduce3 = nums.reduce((acc, curr) => acc + curr, 11);
const myReduce3 = nums.myReduce((acc, curr) => acc + curr, 11);
console.log("Reduce #3 (initial 11):", reduce3, myReduce3);

// -------------------------------------------
// 4. Every Polyfill
// -------------------------------------------

/**
 * Polyfill for Array.prototype.every
 *
 * The `every` method tests whether **all** elements in the array pass the test
 * implemented by the provided callback function.
 * It returns `true` if the callback returns a truthy value for **every** element,
 * and `false` otherwise. It stops checking once it finds a `false`.
 */

Array.prototype.myEvery = function (cb, thisArg) {
  // 1. Throw TypeError if 'this' is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.myEvery called on null or undefined");
  }

  // 2. Throw TypeError if callback is not a function
  if (typeof cb !== "function") {
    throw new TypeError(cb + "is not a function");
  }

  // 3. Convert 'this' to an object (in case it's not a real array)
  const arr = Object(this);

  // 4. Get the length of the array-like object
  //   >>> 0 is called "zero-fill right shift".
  //   It forces length to be a positive integer.
  //  It protects against weird or invalid values (like negative numbers, undefined, or floating-point numbers).
  const len = arr.length >>> 0; // Ensures unsigned 32-bit integer

  // 5. Iterate over each index in the array
  for (let i = 0; i < len; i++) {
    // 6. Check if the index exists in the array (sparse arrays handling)
    if (i in arr) {
      // [1, , 3] "i in arr" ensures that your polyfill only runs the callback on elements that actually exist in the array
      // 7. Call the callback function with:
      //    - current element
      //    - index
      //    - the original array
      //    - 'thisArg' as the `this` context (if provided)
      const result = cb.call(thisArg, arr[i], i, arr);

      // 8. If any callback result is falsy, return false immediately
      if (!result) {
        return false;
      }
    }
  }

  // 9. If all elements passed the test, return true
  return true;
};

const arr = [2, 4, 6, 8];

// Native every
const nativeEvery = arr.every((num) => num % 2 === 0);

// Custom myEvery
const customEvery = arr.myEvery((num) => num % 2 === 0);

console.log("Native every:", nativeEvery); // true
console.log("Custom myEvery:", customEvery); // true

// Test with a failing condition
const arr2 = [2, 3, 6];

console.log(arr2.myEvery((num) => num % 2 === 0)); // false

// Edge case: empty array → should return true (as per spec)
const emptyArray = [];
// if there are no elements, it's trivially true that "all elements satisfy the condition" because there's nothing to falsify it.
console.log(emptyArray.myEvery((num) => num > 0)); // true

// Error case: non-function passed as callback
try {
  [1, 2, 3].myEvery("not a function");
} catch (e) {
  console.error("Caught error:", e.message); // Should throw TypeError
}

// const obj = {
//   min: 3,
//   check(num) {
//     return num > this.min;
//   }
// };

// const numbers = [4, 5, 6];

//  Native every with obj as thisArg
// const result = numbers.every(function(num) {
//   return this.check(num);  // 'this' refers to 'obj'
// }, obj);

// console.log(result); // true
// You pass obj as the second argument to .every()
// Inside the callback, this.check(num) refers to obj.check(num)
// The native .every() method uses Function.prototype.call() under the hood to bind this to obj

// function test() {
//   return [].myEvery.call(arguments, (el) => typeof el === "number");
// }

// console.log(test(1, 2, 3)); // true

// arguments is not a real array — it's "array-like"
// .call(arguments, ...) sets this = arguments
// Now inside your polyfill, this is arguments
// Object(this) converts arguments into a real object
// You can now safely use .length, [i], etc.

// const str = "hello";

// const result = [...str].myEvery((char) => char != 'e'); // 🚫 this would crash without Object(this)
// But with Object(this), it safely turns "hello" into an object like:
// {
//   0: 'h',
//   1: 'e',
//   2: 'l',
//   3: 'l',
//   4: 'o',
//   length: 5
// }

// -------------------------------------------
// -------------------------------------------
/**
 * Polyfill for Array.prototype.some
 * Tests whether at least one element in the array passes the test implemented by the callback.
 */
Array.prototype.mySome = function (cb, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.mySome called on null or undefined");
  }
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }

  // Convert 'this' to an object
  const arr = Object(this);
  const len = arr.length >>> 0;

  // Iterate through each index in array
  for (let i = 0; i < len; i++) {
    // Skip missing elements in sparse arrays
    if (i in arr) {
      // If callback returns truthy, return true immediately
      if (cb.call(thisArg, arr[i], i, arr)) return true;
    }
  }

  // If no element passed the test, return false
  return false;
};

// -------------------------------------------
// 6. Find Polyfill
// -------------------------------------------

/**
 * Polyfill for Array.prototype.find
 * Returns the value of the first element that satisfies the provided callback function.
 */
Array.prototype.myFind = function (cb, thisArg) {
  if (this == null) {
    throw new TypeError("Array.prototype.myFind called on null or undefined");
  }
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }

  const arr = Object(this);
  const len = arr.length >>> 0;

  for (let i = 0; i < len; i++) {
    if (i in arr) {
      const value = arr[i];
      // Return the first element for which the callback returns true
      if (cb.call(thisArg, value, i, arr)) return value;
    }
  }

  // Return undefined if no element satisfies the callback
  return undefined;
};

// -------------------------------------------
// 7. findIndex Polyfill
// -------------------------------------------

/**
 * Polyfill for Array.prototype.findIndex
 * Returns the index of the first element that satisfies the provided callback function.
 */
Array.prototype.myFindIndex = function (cb, thisArg) {
  if (this == null) {
    throw new TypeError(
      "Array.prototype.myFindIndex called on null or undefined",
    );
  }
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }

  const arr = Object(this);
  const len = arr.length >>> 0;

  for (let i = 0; i < len; i++) {
    if (i in arr) {
      // Return index if callback condition passes
      if (cb.call(thisArg, arr[i], i, arr)) return i;
    }
  }

  // If no element found, return -1
  return -1;
};

// -------------------------------------------
// 8. forEach Polyfill
// -------------------------------------------

/**
 * Polyfill for Array.prototype.forEach
 * Executes the provided callback function once for each array element.
 */
Array.prototype.myForEach = function (cb, thisArg) {
  if (this == null) {
    throw new TypeError(
      "Array.prototype.myForEach called on null or undefined",
    );
  }
  if (typeof cb !== "function") {
    throw new TypeError(cb + " is not a function");
  }

  const arr = Object(this);
  const len = arr.length >>> 0;

  for (let i = 0; i < len; i++) {
    if (i in arr) {
      // Execute callback with element, index, and entire array
      cb.call(thisArg, arr[i], i, arr);
    }
  }
  // forEach doesn't return anything
};

const arrEle = [5, , 15, 20];

console.log(arrEle.mySome((x) => x > 10)); // true
console.log(arrEle.myFind((x) => x > 10)); // 15
console.log(arrEle.myFindIndex((x) => x > 10)); // 2
arrEle.myForEach((val, i) => console.log(i, val)); // logs: 0 5, 2 15, 3 20

// -------------------------------------------
// 9. Once Polyfill
// -------------------------------------------

/**
 * once(fn)
 * Returns a new function that will only execute `fn` once.
 * Subsequent calls return the first result without re-invoking `fn`.
 */
function once(fn) {
  // Ensure the input is a function
  if (typeof fn !== "function") {
    throw new TypeError("Expected a function");
  }

  let called = false; // Flag to check if function has been called
  let result; // To store the result of the first call

  return function (...args) {
    // If not called before, execute and store result
    if (!called) {
      result = fn.apply(this, args); // Call with current 'this' and arguments
      called = true;
    }
    // Return stored result on every subsequent call
    return result;
  };
}

let count = 0;

const incrementOnce = once(() => {
  count += 1;
  return count;
});

console.log(incrementOnce()); // 1
console.log(incrementOnce()); // 1
console.log(incrementOnce()); // 1 (doesn't increment again)

console.log(count); // 1 (only incremented once)

// Why once is Useful
// Prevents double submissions in forms
// Avoids initializing something twice (e.g., event listeners, animations)

// CALL VS APPLY VS BIND

/* call, apply, and bind are methods that let you decide what this should refer to inside a function.
Think of them as borrowing a function and telling it who should be "this"
call() → Sets this and invokes the function immediately. Arguments are passed individually.
apply() → Sets this and invokes the function immediately. Arguments are passed as an array.
bind() → Sets this but does not invoke the function immediately. It returns a new function that can be called later.
Arrow Function Behavior: call(), apply() cannot change this for an arrow function because arrow functions don't have their own this. They lexically inherit this from the surrounding scope.
bind() does not change this for an arrow function. It still returns a new function, but the arrow function keeps the this from the scope where it was created.

Normal functions determine this when they are called, so call, apply, and bind can override it.

Arrow functions determine this when they are created, so it is permanently taken from the surrounding (lexical) scope and cannot be overridden.

const greet = person.greet;
greet() undefined
/**
 
 * A Symbol is a primitive data type introduced in ES6. It is a unique and immutable value that can be used as an object key without the risk of property name collisions.
 * const sym1 = Symbol("id");
 * const sym2 = Symbol("id");
 * console.log(sym1 === sym2); // false, because each Symbol is unique
 * In the polyfills, we need to temporarily attach the function to the given context so that we can call it with the desired this value.
 * However, if we simply assigned the function to a normal property (like context.fn), we might accidentally overwrite an existing property in the object.
 * Using Symbol() ensures that our property name is unique, preventing any accidental property overwrites.
 * function greet() {
 *   return `Hello, I'm ${this.name}`;
 * }
 * const user = { name: "Alice"};
 * // Temporary property
 * user.fn = greet;
 * console.log(user.fn()); // "Hello, I'm Alice"
 * // Clean up
 * delete user.fn;
 * Problem: What if user already had a property named fn?
 * const user = {
 *  name: "Alice",
 *  fn: "Some existing value"
 * };
 * user.fn = greet;  // Overwrites exisiting fn
 * So using a fixed key like fn, temp, risks overwriting exisitng properties on the object.
 * Instead of a string key, we use a Symbol, which is guaranteed to be unique -- even if multiple symbols have the same description.
 * * function greet() {
 *   return `Hello, I'm ${this.name}`;
 * }
 * const user = { name: "Alice", fn: "already exists"};
 * const tempKey = Symbol("tempFn"); // Unique key
 * user[tempKey] = greet; // No risk of conflict
 * console.log(user[tempKey]()); // "Hello, I'm Alice"
 * delete user[tempKey];
 */

// -------------------------------------------
// 10. call Polyfill
// -------------------------------------------
Function.prototype.myCall = function (context, ...args) {
  // 1. Ensure the function is being called correctly
  if (typeof this !== "function") {
    throw new TypeError("myCall must be called on a function");
  }

  // 2. If context is null or undefined, default to globalThis (window or global)
  // globalThis is a standard, environment-independent way to access the global object
  context = context != null && context !== undefined ? context : globalThis;

  // 3. Ensure context is an object (in case of primitives like string or number)
  context = Object(context);

  // 4. Create a unique symbol key to avoid overwriting existing properties
  const fnSymbol = Symbol();

  // 5. Assign the function (this) to the context using the symbol key
  context[fnSymbol] = this;

  // 6. Call the function on the context with the arguments
  const result = context[fnSymbol](...args);

  // 7. Clean up by deleting the temporary symbol property
  delete context[fnSymbol];

  // 8. Return the result of the function call
  return result;
};

// -------------------------------------------
// 11. apply Polyfill
// -------------------------------------------
Function.prototype.myApply = function (context, args) {
  // 1. Ensure the function is being called correctly
  if (typeof this !== "function") {
    throw new TypeError("myApply must be called on a function");
  }

  // 2. If context is null or undefined, default to globalThis (window or global)
  context = context != null && context !== undefined ? context : globalThis;

  // 3. Ensure context is an object (in case of primitives like string or number)
  context = Object(context);

  // 4. Ensure that the second argument is an array
  if (!Array.isArray(args)) {
    throw new TypeError("The second argument must be an array");
  }

  // 5. Create a unique symbol key to avoid overwriting existing properties
  const fnSymbol = Symbol();

  // 6. Assign the function (this) to the context using the symbol key
  context[fnSymbol] = this;

  // 7. Call the function on the context with the arguments
  const result = context[fnSymbol](...args);

  // 8. Clean up by deleting the temporary symbol property
  delete context[fnSymbol];

  // 9. Return the result of the function call
  return result;
};

// -------------------------------------------
// 12. bind Polyfill
// -------------------------------------------
Function.prototype.myBind = function (context, ...boundArgs) {
  // 1. Ensure the function is being called correctly
  if (typeof this !== "function") {
    throw new TypeError("myBind must be called on a function");
  }

  // 2. If context is null or undefined, default to globalThis (window or global)
  context = context != null && context !== undefined ? context : globalThis;

  // 3. Ensure context is an object (in case of primitives like string or number)
  context = Object(context);

  // 4. Store the original function reference
  const originalFn = this;

  // 5. Return a new function that maintains the correct `this` context
  return function (...args) {
    return originalFn.apply(context, [...boundArgs, ...args]); // Use `apply` to bind arguments
  };
};

let car1 = {
  color: "Red",
  company: "Ferrari",
};

function purchaseCar(currency, price) {
  console.log(
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`,
  );
}

// Using 'call'
purchaseCar.myCall(car1, "$", 1000000);
// Output: I have purchased Red - Ferrari car for $1000000;

// Using 'apply'
purchaseCar.myApply(car1, ["$", 1000000]);
// Output: I have purchased Red - Ferrari car for $1000000;

// Using 'bind'
const boundPurchase = purchaseCar.myBind(car1);
boundPurchase("$", 10000000);
// Output: I have purchased Red - Ferrari car for $1000000;

// DEBOUNCE VS THROTTLE
/* Debouncing and throttling are techniques used to control the rate at which a function is executed */
// Debouncing
// Debouncing is a technique used to ensure that a function is only executed after a certain amount of time has passed since it was last invoked. This is particularly useful in scenarios where you want to limit the number of times a function is called, such as when handling user input events like keypresses or mouse movements.

// Example use case
// Imagine you have a search input field and you want to make an API call to fetch search results. Without debouncing, an API call would be made every time the user types a character, which could lead to a large number of unnecessary calls. Debouncing ensures that the API call is only made after the user has stopped typing for a specified amount of time.

// Throttling
// Throttling is a technique used to ensure that a function is called at most once in a specified time interval. This is useful in scenarios where you want to limit the number of times a function is called, such as when handling events like window resizing or scrolling.

// Example use case
// Imagine you have a function that updates the position of elements on the screen based on the window size. Without throttling, this function could be called many times per second as the user resizes the window, leading to performance issues. Throttling ensures that the function is only called at most once in a specified time interval.

// -------------------------------------------
// 13. debounce Polyfill
// -------------------------------------------
function debounce(fn, delay) {
  // This will store the timeout ID between function calls
  let timeoutId;

  // Return a new debounced version of the function
  return function (...args) {
    // Capture the current `this` context because the callback inside setTimeout executes later. Without saving this, the original object context would be lost, so fn wouldn't execute with the correct this.
    const context = this;

    // Clear any previously set timeoutId to reset the wait period
    clearTimeout(timeoutId);

    // Start a new timer - only if no more calls come in before `delay`,
    // the function `fn` will be called with latest arguments
    timeoutId = setTimeout(() => {
      // Use `apply` to call `fn` with the correct `this` and arguments
      fn.apply(context, args);
    }, delay);
  };
}

// Create a debounced version of a function that logs a message
const fn = debounce((message) => {
  console.log(message); // Logs only the final debounced message
}, 300);

// Simulate rapid function calls one after another
fn("Hello"); // Timer starts (but gets cleared below)
fn("Hello, World!"); // Timer restarts (previous one cleared)
fn("Debounced!"); // Timer restarts again (this one will execute after 300ms)

// After 300ms, only "Debounced!" is logged

// After 400ms (outside debounce window), this is treated as a new call
setTimeout(() => {
  fn("Debounced twice"); // Logs this after another 300ms (at ~700ms total)
}, 400);

//const context = this;
// If you don’t preserve this, then fn inside the setTimeout will lose its connection to myObject. That’s because setTimeout calls functions with this set to window (in browser) or undefined (in strict mode).

// Why it said "Start a new timer -- only if no more calls come in before delay"
// Imagine giving a presentation - "I'll answer, but only if you stop talking for 3 seconds."
// 1. They ask a question -> you set a 3-sec timer.
// 2. They speak again at 2 secs -> timer resets.
// 3. They keep doing that -> you never answer.
// 4. Finally, they go quiet -> after 3 seconds, you answer.

// -------------------------------------------
// 14. throttle Polyfill
// -------------------------------------------
/**
 * Polyfill for throttle
 * Throttle ensures that a function `fn` is executed at most once every `interval` milliseconds,
 * even if it’s triggered many times.
 * Useful for limiting execution of events like scroll, resize, or mouse move.
 */

function myThrottle(fn, interval) {
  // Time when fn was last executed
  let lastCallTime = 0;

  // Store a timeout ID if a future execution is scheduled.
  let timeoutId = null;

  // Stores the latest arguments and context
  let lastArgs;
  let lastContext;

  // Return a throttled version of the original function.
  return function (...args) {
    // Get the current time in milliseconds.
    const now = Date.now();

    // Always keep the latest arguments and context
    lastArgs = args;
    lastContext = this; // Save the context (`this`) to preserve it inside setTimeout.

    // Calculate how much time is left before we can call the function again.
    const remainingTime = interval - (now - lastCallTime);

    /**
     * 1️⃣ If enough time has passed since the last call (remainingTime <= 0),
     * we execute `fn` immediately.
     */
    if (remainingTime <= 0) {
      // If a timeout was previously scheduled, clear it (not needed anymore).
      // Imagine this sequence with a throttle interval of 1000 ms.
      // 0 ms    A()  -> Executes immediately
      // 200 ms  B()  -> Schedules a timeout for 1000 ms
      // Now suppose another call happens after the interval has already passed.
      // 1200 ms  C()
      // Since more than 1000 ms has passed since the last execution, we want C to execute immediately.
      // But notice...
      // A timeout for B is still waiting to run (or is about to run).
      // If we don't cancel it:
      // 1200 ms  C executes immediately
      // 1200-1300 ms
      // B timeout also executes
      // Now you've executed the function twice almost back-to-back.

      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // Update the last call time to now.
      lastCallTime = now;

      // Call the original function with correct context and arguments.
      fn.apply(lastContext, lastArgs);
    } else if (!timeoutId) {
      /**
       * 2️⃣ Otherwise, if we're still within the throttle interval,
       * and no timeout is already scheduled, schedule one.
       */
      timeoutId = setTimeout(() => {
        // When the scheduled time passes, update the last call time.
        lastCallTime = Date.now();

        // Clear the timeout ID to allow future scheduling.
        timeoutId = null;

        // Call the function with the saved context and arguments.
        fn.apply(lastContext, lastArgs);
      }, remainingTime);
    }

    /**
     * ⚠️ If we're still in the interval and a timeout is already scheduled,
     * do nothing — just wait for the scheduled call to run.
     */
  };
}

// Example usage:
const onResize = () => console.log("Resize event handler called");

window.addEventListener("resize", myThrottle(onResize, 1000));

const throttled = myThrottle((value) => {
  console.log(value);
}, 1000);

throttled("A"); // Executes immediately

setTimeout(() => throttled("B"), 100);
setTimeout(() => throttled("C"), 300);
setTimeout(() => throttled("D"), 700);

// Output:
// A
// D

// -------------------------------------------
// 15. USEMEMO() & USECALLBACK() Polyfill
// -------------------------------------------

//  import { useRef, useEffect } from "react";

// // helper function to deep check dependency
// const detectChangesMemo = (prevDeps, deps) => {
//   if (prevDeps === null) return false;
//   if (prevDeps?.length !== deps.length) return false;

//   for (let i = 0; i < deps.length; i++) {
//     if (prevDeps[i] !== deps[i]) return false;
//   }

//   return true;
// };

// export const useMemoPolyfill = (callback, deps) => {
//   // store the cached value
//   // using ref instead of state will prevent from unnecessary re-renders
//   const memoizedRef = useRef(null);

//   // check if the dependency is changed or not
//   if (
//     !memoizedRef.current ||
//     !detectChangesMemo(memoizedRef?.current?.deps, deps)
//   ) {
//     memoizedRef.current = {
//       value: callback(), // store the computed value returned from the callback
//       deps: deps,
//     };
//   }

//   //reset the value
//   useEffect(() => {
//     return () => {
//       memoizedRef.current = null;
//     };
//   }, []);

//   //return the cached value
//   return memoizedRef.current.value;
// };

// import { useRef, useEffect } from "react";

// // helper function to deep check dependency
// const detectChanges = (prevDeps, deps) => {
//   if (prevDeps === null) return false;
//   if (prevDeps?.length !== deps.length) return false;

//   for (let i = 0; i < deps.length; i++) {
//     if (prevDeps[i] !== deps[i]) return false;
//   }

//   return true;
// };

// export const useCallbackPolyfill = (callback, deps) => {
//   // store the cached value
//   // using ref instead of state will prevent from unnecessary re-renders
//   const memoizedRef = useRef(null);

//   // check if the dependency is changed or not
//   if (
//     !memoizedRef.current ||
//     !detectChanges(memoizedRef?.current?.deps, deps)
//   ) {
//     memoizedRef.current = {
//       value: callback, // store the callback function
//       deps: deps,
//     };
//   }

//   //reset the value
//   useEffect(() => {
//     return () => {
//       memoizedRef.current = null;
//     };
//   }, []);

//   //return the cached value
//   return memoizedRef.current.value;
// };

// -------------------------------------------
// 16. Array.isArray Polyfill
// -------------------------------------------

/**
 * Array.isArray(value)
 * Checks if the given value is an array.
 * Returns true if it is, otherwise false.
 */
if (!Array.isArray) {
  Array.isArray = function (value) {
    // The Object.prototype.toString.call(value) returns a string like '[object Type]'
    // For arrays, it returns '[object Array]'
    // This works reliably even across different execution contexts (like iframes)
    return Object.prototype.toString.call(value) === "[object Array]";
  };
}

// -------------------
// Usage / Test Cases
// -------------------
console.log(Array.isArray([1, 2, 3])); // true
console.log(Array.isArray("hello")); // false
console.log(Array.isArray({})); // false
console.log(Array.isArray(null)); // false
console.log(Array.isArray(undefined)); // false

// -------------------------------------------
// 17. Array.prototype.reverse Polyfill
// -------------------------------------------

/**
 * Reverses the array in-place and returns the same array.
 */
if (!Array.prototype.reverse) {
  Array.prototype.reverse = function () {
    const len = this.length;
    let left = 0;
    let right = len - 1;

    while (left < right) {
      // Swap elements
      let temp = this[left];
      this[left] = this[right];
      this[right] = temp;

      left++;
      right--;
    }

    return this;
  };
}

// -------------------
// Usage / Test Cases
// -------------------
console.log([1, 2, 3].reverse()); // [3, 2, 1]
console.log([].reverse()); // []

// -------------------------------------------
// 18. Array.prototype.shift Polyfill
// -------------------------------------------

/**
 * Removes the first element and shifts others to the left.
 * Returns removed element or undefined if empty.
 */
if (!Array.prototype.shift) {
  Array.prototype.shift = function () {
    if (this.length === 0) return undefined;

    const first = this[0];

    for (let i = 1; i < this.length; i++) {
      this[i - 1] = this[i];
    }

    this.length--; // Remove last element reference

    return first;
  };
}

// -------------------
// Usage / Test Cases
// -------------------
const a1 = [10, 20, 30];
console.log(a1.shift()); // 10
console.log(a1); // [20, 30]

// -------------------------------------------
// 19. Array.prototype.unshift Polyfill
// -------------------------------------------

/**
 * Adds one or more elements at the beginning.
 * Returns the new length.
 */
if (!Array.prototype.unshift) {
  Array.prototype.unshift = function (...items) {
    const itemsCount = items.length;

    for (let i = this.length - 1; i >= 0; i--) {
      this[i + itemsCount] = this[i];
    }

    for (let j = 0; j < itemsCount; j++) {
      this[j] = items[j];
    }

    return this.length;
  };
}

// -------------------
// Usage / Test Cases
// -------------------
const a2 = [3, 4];
console.log(a2.unshift(1, 2)); // 4
console.log(a2); // [1, 2, 3, 4]

// -------------------------------------------
// 20. Array.prototype.pop Polyfill
// -------------------------------------------

/**
 * Removes the last element and returns it.
 * If array is empty, returns undefined.
 */
if (!Array.prototype.pop) {
  Array.prototype.pop = function () {
    if (this.length === 0) return undefined;
    const last = this[this.length - 1];
    this.length--; // Remove last
    return last;
  };
}

// -------------------
// Usage / Test Cases
// -------------------
const a3 = [1, 2, 3];
console.log(a3.pop()); // 3
console.log(a3); // [1, 2]

// -------------------------------------------
// 21. Array.prototype.includes Polyfill
// -------------------------------------------

/**
 * Checks if array contains a given value.
 * Uses SameValueZero comparison (handles NaN).
 */
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement, fromIndex = 0) {
    if (this == null) throw new TypeError("Called on null or undefined");

    const len = this.length >>> 0;
    if (len === 0) return false;

    // [1, 2, 3].includes(2, -1) → only looks at [3]
    //  [1, 2, 3].includes(2, -2) → looks at [2, 3]
    let i = Math.max(fromIndex >= 0 ? fromIndex : len + fromIndex, 0);

    while (i < len) {
      const value = this[i];
      // SameValueZero check
      if (
        value === searchElement ||
        (Number.isNaN(value) && Number.isNaN(searchElement)) // [NaN].indexOf(NaN);// -1 ❌    [NaN].includes(NaN); // true ✅
      ) {
        return true;
      }
      i++;
    }

    return false;
  };
}

// -------------------
// Usage / Test Cases
// -------------------
console.log([1, 2, 3].includes(2)); // true
console.log([1, 2, NaN].includes(NaN)); // true
console.log(["a", "b"].includes("c")); // false

// -------------------------------------------
// 22. Array.prototype.sort Polyfill
// -------------------------------------------

if (!Array.prototype.mySort) {
  Array.prototype.mySort = function (compareFn) {
    compareFn =
      compareFn ||
      function (a, b) {
        if (a === undefined) return 1; // Push a after b
        if (b === undefined) return -1; // Keep a before b
        return String(a).localeCompare(String(b)); // Convert both values to strings. Compare them alphabetically (lexicographically)
      };

    const mergeSort = (arr) => {
      if (arr.length <= 1) return arr;

      const mid = Math.floor(arr.length / 2);
      const left = mergeSort(arr.slice(0, mid));
      const right = mergeSort(arr.slice(mid));

      return merge(left, right);
    };

    const merge = (left, right) => {
      let result = [],
        i = 0,
        j = 0;
      while (i < left.length && j < right.length) {
        if (compareFn(left[i], right[j]) <= 0) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
      }
      // Add remaining elements
      return result.concat(left.slice(i)).concat(right.slice(j));
    };

    // Sort and replace original array in-place
    const sorted = mergeSort(this.slice()); // clone to avoid mutation during sorting
    for (let i = 0; i < this.length; i++) {
      this[i] = sorted[i];
    }

    return this;
  };
}

const arrSort = [7, 4, 1, 8, 9, 34];
console.log(arrSort.mySort()); // [ 1, 34, 4, 7, 8, 9 ]

// -------------------------------------------
// 23. String.prototype.repeat Polyfill
// -------------------------------------------

/**
 * 'abc'.repeat(3) => 'abcabcabc'
 * Repeats a string `count` times.
 */
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    // Step 1: Throw error if called on null or undefined
    if (this == null)
      throw new TypeError(
        "String.prototype.repeat called on null or undefined",
      );

    // Step 2: Convert `this` to a string
    let str = String(this);

    // Step 3: Convert count to a number
    count = Number(count);

    // Step 4: Validate count
    if (isNaN(count)) count = 0;
    if (count < 0) throw new RangeError("Repeat count must be >= 0");
    if (count === Infinity) throw new RangeError("Repeat count must be finite");

    // Optional: avoid massive string sizes
    if (str.length * count >= 1 << 28) {
      throw new RangeError("Repeat count causes string too long");
    }

    // Step 5: Build the final string using binary exponentiation
    let result = "";
    while (count > 0) {
      if (count % 2 === 1) result += str; // add current version if bit is set
      str += str; // double the string
      count = Math.floor(count / 2);
    }

    return result;
  };
}

// -------------------
// Usage / Test Cases
// -------------------
console.log("abc".repeat(3)); // 'abcabcabc'
console.log("a".repeat(0)); // ''
// console.log('x'.repeat(-1)); // ❌ RangeError

// Step 0: Initial values
// str = "abc"
// count = 6 -> binary = 110
// result = ""
// current = "abc"

// Loop 1 (count = 6, binary: 110)
// count % 2 === 0 -> Skip adding to result.
// current += current -> "abcabc"
// count = 3

// Loop 2 (count = 3, binary: 11)
// count % 2 === 1 -> Add current to result.
// result += "abcabc" -> result = "abcabc"
// current += current -> "abcabcabcabc"
// count = 1

// Loop 1 (count = 1, binary: 1)
// count % 2 === 1 -> Add current to result.
// result += "abcabcabcabc" -> result = "abcabcabcabcabcabc"
// current += current -> not used again, as loop ends
// count = 0 -> exit loop

// -------------------------------------------
// 24. Polyfill for getElementById
// -------------------------------------------

document.myGetElementById = function (id) {
  // Validate input
  if (typeof id !== "string") {
    throw new TypeError("ID must be a string");
  }

  // Recursively search the entire DOM starting from `document.body`
  function searchElement(node) {
    // Base case: If no node, return null
    if (!node) return null;

    // Check if the node has the matching ID
    if (node.id === id) {
      return node; //  Return the found element
    }

    //  Iterate over the child nodes to continue searching
    for (let child of node.children) {
      const found = searchElement(child);
      if (found) return found; // If found, return immediately
    }

    return null; // If no match is found in this branch
  }

  return searchElement(document.documentElement);
};

// Example HTML
// <div id = "test">Hello World</div>

// Javascript
const element = document.myGetElementById("test");
console.log(element); // <div id = "test">Hello World</div>

// -------------------------------------------
// 25. Polyfill for getElementByClassName
// -------------------------------------------

document.myGetElementByClassName = function (className) {
  // Validate input
  if (typeof className !== "string") {
    throw new TypeError("Class name must be a string");
  }

  const result = []; // Array to store matching elements

  // Recursive function to search through the DOM tree
  function searchElements(node) {
    if (!node) return;

    // Check if the node has the target class
    if (node.classList.contains(className)) {
      result.push(node); // Add it to the result array
    }

    //  Iterate over child nodes to continue searching
    for (let child of node.children) {
      searchElements(child);
    }
  }

  searchElements(document.documentElement); // Start searching from the document body

  return result; // Return all matched elements
};

// Example HTML
// <div id = "box">Box 1</div>
// <div id = "box">Box 2</div>

// Javascript
const elements = document.myGetElementByClassName("box");
console.log(elements); // [<div id = "box">Box 1</div>, <div id = "box">Box 2</div>]

// -------------------------------------------
// 26. Polyfill for clearAllTimeout
//    ClearAllTimeout clears all the setTimeout which are active.
//    setTimeout is an asynchronous function that executes a function or a piece of code after a specified amount of time.
// -------------------------------------------

// Track all currently active timeout IDs
const timeoutIds = new Set();

// Save the original setTimeout before overriding it.
// Otherwise, calling setTimeout inside our override would cause infinite recursion.
const originalSetTimeout = window.setTimeout;

// Override the native setTimeout
window.setTimeout = function (callback, delay, ...args) {
  // Preserve the current `this` context
  const context = this;

  // Schedule the actual timer using the ORIGINAL setTimeout.
  // We wrap the callback so we can perform cleanup before executing it.

  // What if we simply did this?
  // const timeoutId = originalSetTimeout(callback, delay);

  // This works—the callback runs after 3 seconds.

  // But what happens to our Set?

  // timeoutIds = {15}

  // After 3 seconds:

  // Hello

  // The timeout has finished, but 15 is still in the Set because nothing removed it.

  // timeoutIds = {15} ❌

  // So our tracking is now incorrect.

  // That's why we wrap the callback

  // Instead of giving originalSetTimeout the user's callback directly, we give it our own function.

  // originalSetTimeout(function () {
  //     timeoutIds.delete(timeoutId);

  //     callback.apply(context, args);
  // }, delay);

  // Think of it like this.

  // Instead of asking JavaScript to do

  // After 3 seconds
  // ↓
  // Run user's callback

  // we ask JavaScript to do

  // After 3 seconds
  // ↓

  // 1. Remove timeout from Set
  // 2. Run user's callback

  // Our wrapper becomes the callback that setTimeout executes.

  // Timeline

  // Suppose

  // setTimeout(() => console.log("Hello"), 3000);
  // Step 1

  // Our override is called.

  // timeoutIds = {}
  // Step 2

  // We schedule

  // originalSetTimeout(function () {
  //     timeoutIds.delete(timeoutId);

  //     callback.apply(context, args);
  // }, 3000);

  // Suppose the timer ID is 5.

  // timeoutIds = {5}
  // Step 3 (after 3 seconds)

  // JavaScript executes our wrapper, not the user's callback directly.

  // Wrapper starts

  // First line:

  // timeoutIds.delete(timeoutId);

  // Now

  // timeoutIds = {}

  // Great! The timer is no longer active.

  // Second line:

  // callback.apply(context, args);

  // This finally executes

  // console.log("Hello");

  // Output
  // Hello

  // Everything is now cleaned up correctly.

  // Think of it like a receptionist

  // Imagine the user says:

  // "Please call me after 3 PM."

  // If JavaScript called the user directly:

  // 3 PM
  // ↓
  // User answers

  // No cleanup happens.

  // Instead, we tell JavaScript:

  // "Call me first."

  // So at 3 PM:

  // Receptionist answers
  // ↓
  // Remove appointment from diary
  // ↓
  // Transfer the call to the user

  // The receptionist is our wrapper function.

  // The user is callback.

  // Why not do this after setTimeout?

  // Some people think this should work:

  // const timeoutId = originalSetTimeout(callback, delay);

  // timeoutIds.delete(timeoutId);
  // But that runs immediately, not after 3 seconds.

  // Timeline:
  // 0 sec

  // Schedule timer
  // ↓
  // Delete from Set ❌
  // ↓
  // 3 sec later
  // Callback runs

  // Now clearAllTimeout() can't find that timer because you removed it too early.
  // So the deletion must happen inside the callback, when the timer actually finishes.

  const timeoutId = originalSetTimeout(function () {
    // Timer has finished executing, so it's no longer active.
    timeoutIds.delete(timeoutId);

    // Execute the original callback with the correct `this` and arguments.
    callback.apply(context, args);
  }, delay);

  // Track this timer so clearAllTimeout() can cancel it later.
  timeoutIds.add(timeoutId);

  // Return the timeout ID just like the native implementation.
  return timeoutId;
};

// Clear all active timeouts
function clearAllTimeout() {
  // Cancel every active timer.
  timeoutIds.forEach((timeoutId) => {
    clearTimeout(timeoutId);
  });

  // Remove all references since no timers are active anymore.
  timeoutIds.clear();
}

// Set multiple timeouts
const timeout1 = setTimeout(() => console.log("Timeout 1"), 10000);
const timeout2 = setTimeout(() => console.log("Timeout 2"), 3000);
const timeout3 = setTimeout(() => console.log("Timeout 3"), 4000);

// After 5 seconds, clear all timeouts
setTimeout(() => {
  console.log("Clearing all timeouts...");
  clearAllTimeout();
}, 5000);

// "Timeout 2"
// "Timeout 3"
// "Clearing all timeouts..."

// clearAllTimeout() only cancels timers that are still pending, which matches how the native clearTimeout() behaves: you cannot cancel a timeout that has already started executing.

// -------------------------------------------
// 27 & 28 Polyfill for setTimeout & setInterval
// - Uses requestIdleCallback for async scheduling
/**
 * Is setTimeout() guaranteed to execute after the specified delay?
 * Answer is "NO" because the time passed to setTimeout() is the minimum delay, not the exact execution time.
 * Once the timer expires, the callback is added to the task queue. It will only execute when:
 *  - The call stack is empty.
 * - All pending microtasks have finished.
 * - The event loop picks up the callback.
 */
// -------------------------------------------

// Use Symbol keys to safely store internal state on `window`
// This avoids name clashes with other code or libraries
const TIMER_ID = Symbol("timerId");
const TIMERS = Symbol("timers");
const INTERVAL_ID = Symbol("intervalId");
const INTERVALS = Symbol("intervals");

// Initialize internal state only once on global `window` object
window[TIMER_ID] = 1; // Used to assign a unique ID to each timeout
window[TIMERS] = {}; // Stores all active timeouts

window[INTERVAL_ID] = 1000; // Unique ID tracker for intervals
window[INTERVALS] = {}; // Stores all active intervals

// ----------------------
// 27 Polyfill: setTimeout
// ----------------------
window.setTimeout = function (callback, delay, ...args) {
  const id = window[TIMER_ID]++; // Assign a unique ID and increment

  const fireAt = Date.now() + delay;
  // ⬆️ Why: We calculate the exact timestamp at which the callback should run
  //        instead of using setTimeout, we manually compare Date.now() later

  window[TIMERS][id] = {
    callback,
    fireAt, // store the scheduled execution time
    args, // store arguments to pass later
  };

  // Start idle loop if this is the first scheduled timeout
  if (Object.keys(window[TIMERS]).length === 1) {
    // Schedule our scheduler.
    // requestIdleCallback lets the browser invoke processTimers during idle
    // periods, reducing main-thread blocking. Note that this is not an exact
    // replacement for the native setTimeout scheduler.

    // I'm using requestIdleCallback only to demonstrate manual scheduling. This isn't a spec-compliant implementation because callback execution depends on browser idle time

    requestIdleCallback(processTimers);
    // ⬆️ Why: requestIdleCallback ensures we don’t block the main thread
    //        and only process when the browser is idle (low-priority task)
  }

  return id; // Return the timeout ID so it can be cleared if needed
};

// ----------------------
// ✅ Polyfill: clearTimeout
// ----------------------
window.clearTimeout = function (id) {
  delete window[TIMERS][id]; // Remove the timer if it exists
  // ⬆️ Why: Prevents the timer from being executed in the next idle cycle
};

// ----------------------
// 🔁 Internal: Processes all scheduled timeouts
// ----------------------
function processTimers() {
  Object.keys(window[TIMERS]).forEach(executeTimer);

  // Re-schedule idle processing if timers remain
  if (Object.keys(window[TIMERS]).length > 0) {
    requestIdleCallback(processTimers);
    // ⬆️ Why: Continuously checks remaining timers without blocking main thread
  }
}

// ----------------------
// 🚀 Executes a single timeout if it’s time
// ----------------------
function executeTimer(id) {
  const timer = window[TIMERS][id];
  if (!timer) return; // Edge case: timer may have been cleared

  const { callback, fireAt, args } = timer;

  if (Date.now() >= fireAt) {
    // ⬆️ Why: Only execute if the current time has passed the scheduled time
    try {
      callback(...args); // Execute the callback with stored arguments
    } catch (e) {
      console.error("Error in setTimeout callback:", e);
    }

    delete window[TIMERS][id]; // Cleanup after execution
  }
}

// ----------------------
// 28 Polyfill: setInterval
// ----------------------
window.setInterval = function (callback, interval, ...args) {
  const id = window[INTERVAL_ID]++; // Assign a unique ID

  const nextCallAt = Date.now() + interval;
  // ⬆️ Why: Calculate the first time the interval should fire
  //        we'll update this after every run to re-schedule

  window[INTERVALS][id] = {
    callback,
    interval, // Store the interval delay
    nextCallAt, // Time at which this interval will next fire
    args, // Any arguments to pass to the callback
  };

  // Start processing only if this is the first interval
  if (Object.keys(window[INTERVALS]).length === 1) {
    requestIdleCallback(processIntervals);
    // ⬆️ Why: Avoid running this unless at least one interval exists
  }

  return id; // Return interval ID for later cancellation
};

// ----------------------
// ✅ Polyfill: clearInterval
// ----------------------
window.clearInterval = function (id) {
  delete window[INTERVALS][id]; // Remove the interval
  // ⬆️ Why: Ensures it won’t be executed in future cycles
};

// ----------------------
// 🔁 Internal: Processes all intervals
// ----------------------
function processIntervals() {
  Object.keys(window[INTERVALS]).forEach(executeInterval);

  // Re-schedule only if intervals remain
  if (Object.keys(window[INTERVALS]).length > 0) {
    requestIdleCallback(processIntervals);
  }
}

// ----------------------
// 🔂 Executes a single interval callback if due
// ----------------------
function executeInterval(id) {
  const interval = window[INTERVALS][id];
  if (!interval) return;

  const { callback, interval: delay, nextCallAt, args } = interval;

  if (Date.now() >= nextCallAt) {
    // ⬆️ Why: It's time to run this interval
    try {
      callback(...args); // Run the function
    } catch (e) {
      console.error("Error in setInterval callback:", e);
    }

    // Schedule next execution time by adding the delay
    interval.nextCallAt = Date.now() + delay;
    // ⬆️ Why: This is what makes it run repeatedly — reschedules itself
  }
}

setTimeout((msg) => console.log("Timeout:", msg), 2000, "Silver Surfer");
setInterval((msg) => console.log("Interval:", msg), 3000, "Golden Jubilee");

// ---------------------------------------------
// 29. Polyfill: Object.create
// ---------------------------------------------

// Example parent object (prototype)
const superVillian = {
  name: "Rolex",
};

// We define our own version of `Object.create` as `myCreate`
// It's placed on `Object.prototype` so it can be accessed like Object.myCreate()
// ⚠️ In real-world scenarios, extending native prototypes is discouraged,
// but it's fine for learning or polyfill demos.

Object.prototype.myCreate = function (parentObject, keysObject) {
  // Step 1: Create an empty constructor function
  function F() {}
  // ⬆️ Why: We use this dummy function to bridge the prototype chain

  // Step 2: Set its prototype to the object we want to inherit from
  F.prototype = parentObject;
  // ⬆️ Why: This is the key trick — by assigning the prototype,
  //         any object created via `new F()` will inherit from parentObject

  // Step 3: Create a new object that inherits from `parentObject`
  const newObj = new F();
  // ⬆️ Why: This new object now has `parentObject` in its prototype chain
  //         Equivalent to `Object.create(parentObject)`

  // Step 4: Add any additional properties using Object.defineProperties
  Object.defineProperties(newObj, keysObject);
  // ⬆️ Why: This mirrors the second argument of `Object.create`
  //         which allows defining multiple properties with descriptors

  return newObj; // Return the fully constructed object
};

// ---------------------------------------------
// ✅ Test the Polyfill
// ---------------------------------------------

// Create a new object inheriting from superVillian
const obj = Object.myCreate(superVillian, {
  origin: { value: "Arjun Sarkaar", enumerable: true },
  // ⬆️ Why: Using defineProperties means you need descriptors,
  //         so we provide a `value` and optionally flags like enumerable
});

console.log(obj); // => { origin: 'Arjun Sarkaar' }
console.log(obj.name); // => 'Rolex' (inherited from prototype)
console.log(Object.getPrototypeOf(obj) === superVillian); // => true

// ---------------------------------------------
// 30. Polyfill: Slice
// ---------------------------------------------

// Check if `slice` is not already defined (polyfill condition)
if (!Array.prototype.slice) {
  Array.prototype.slice = function (start, end) {
    let newArray = []; // The array that will hold the sliced values
    let i;
    const length = this.length; // Length of the current array (`this` refers to the array on which slice is called)

    // Handle undefined or null `start` → treat as 0
    start = start == null ? 0 : start;

    // Handle undefined or null `end` → treat as full length
    end = end == null ? length : end;

    // Handle negative indices by converting them relative to array length
    if (start < 0) start = length + start;
    if (end < 0) end = length + end;

    // Clamp start to a minimum of 0 (don’t allow negative indexes below 0)
    start = Math.max(0, start);

    // Clamp end to a maximum of array length (don’t allow out-of-bounds)
    end = Math.min(length, end);

    // Copy values from `start` to `end` (excluding `end`) into `newArray`
    for (i = start; i < end; i++) {
      newArray.push(this[i]);
    }

    return newArray; // Return the shallow-copied array
  };
}

const sample = ["a", "b", "c", "d", "e"];

console.log(sample.slice()); // ['a', 'b', 'c', 'd', 'e'] → full copy
console.log(sample.slice(1)); // ['b', 'c', 'd', 'e'] → from index 1 to end
console.log(sample.slice(1, 3)); // ['b', 'c'] → from index 1 up to but not including 3
console.log(sample.slice(-2)); // ['d', 'e'] → last two elements
console.log(sample.slice(1, -1)); // ['b', 'c', 'd'] → start at 1, go till second-last
console.log(sample.slice(-4, -1)); // ['b', 'c', 'd'] → from -4 to -1
console.log(sample.slice(100)); // [] → start is beyond array length
console.log(sample.slice(-10)); // ['a', 'b', 'c', 'd', 'e'] → negative start beyond length = full array
console.log(sample.slice(2, 2)); // [] → start === end returns empty array
console.log(sample.slice(3, 1)); // [] → invalid range returns empty array

// ---------------------------------------------
// 31. Polyfill: Custom Promise
// ---------------------------------------------

/**  * Promise States
 * A promise can only be in one of these three states.
 * Once it moves from PENDING → FULFILLED or PENDING → REJECTED,
 * it can NEVER change again (immutable settlement).
 */
const states = {
  PENDING: "PENDING", // Initial state — not yet resolved or rejected
  FULFILLED: "FULFILLED", // Resolved successfully with a value
  REJECTED: "REJECTED", // Rejected with a reason/error
};

class CustomPromise {
  constructor(executor) {
    // Every promise starts as PENDING
    this.state = states.PENDING;

    // Will hold the resolved value or rejection reason
    this.value = undefined;

    // Queue of handler objects: { onSuccess, onFailure }
    // Why a queue? Because multiple .then() can be attached to the same promise:
    //   promise.then(fn1)
    //   promise.then(fn2)
    // Both must execute when the promise settles.
    this.handlers = [];

    try {
      // The executor runs IMMEDIATELY (synchronously).
      // We pass our internal _resolve and _reject so the user can settle the promise.
      //
      // Example:
      //   new CustomPromise((resolve, reject) => {
      //     resolve(100);  ← calls this._resolve(100)
      //   })
      //
      // Arrow functions used for _resolve/_reject so `this` is always correct,
      // even when the user calls resolve() without a class context.
      executor(this._resolve, this._reject);
    } catch (error) {
      // If the executor throws synchronously, the promise should reject.
      // Example:
      //   new CustomPromise(() => { throw new Error("Boom"); })
      //   → equivalent to reject(new Error("Boom"))
      this._reject(error);
    }
  }

  // ========================
  // STATIC METHODS
  // ========================

  /**
   * CustomPromise.resolve(value)
   *
   * Wraps a value in a resolved promise.
   * If the value is already a CustomPromise, return it as-is (no double wrapping).
   *
   * Why needed?
   * - Used in finally() to handle async callbacks
   * - Used in all/race/any to normalize plain values into promises
   *
   * Example:
   *   CustomPromise.resolve(42).then(v => console.log(v)); // 42
   *   CustomPromise.resolve(existingPromise) === existingPromise; // true
   */
  static resolve(value) {
    if (value instanceof CustomPromise) return value;
    return new CustomPromise((resolve) => resolve(value));
  }

  /**
   * CustomPromise.reject(reason)
   *
   * Creates a promise that is immediately rejected with the given reason.
   *
   * Example:
   *   CustomPromise.reject("fail").catch(e => console.log(e)); // "fail"
   */
  static reject(reason) {
    return new CustomPromise((_, reject) => reject(reason));
  }

  /**
   * CustomPromise.all(promises)
   *
   * Resolves when ALL promises resolve. Rejects on the FIRST rejection.
   * Results are in the same order as input (not execution order).
   *
   * Why CustomPromise.resolve(promise)?
   * - Normalizes plain values: all([1, 2, 3]) should work
   * - Ensures .then() is available on each item
   *
   * Example:
   *   CustomPromise.all([
   *     CustomPromise.resolve(1),
   *     CustomPromise.resolve(2)
   *   ]).then(console.log); // [1, 2]
   */
  static all(promises) {
    return new CustomPromise((resolve, reject) => {
      const results = [];
      let completed = 0;

      // Edge case: empty array resolves immediately with []
      if (promises.length === 0) {
        return resolve([]);
      }

      promises.forEach((promise, index) => {
        CustomPromise.resolve(promise).then((value) => {
          // Use index (not push) to maintain input order
          results[index] = value;
          completed++;
          // Only resolve when ALL are done
          if (completed === promises.length) {
            resolve(results);
          }
        }, reject); // Pass reject directly — first failure rejects the whole thing
      });
    });
  }

  /**
   * CustomPromise.allSettled(promises)
   *
   * Waits for ALL promises to settle (resolve OR reject).
   * Never rejects — always resolves with an array of result objects.
   *
   * Each result: { status: "fulfilled", value } or { status: "rejected", reason }
   *
   * Why use this over .all()?
   * - When you want results of ALL promises regardless of failures
   *
   * Example:
   *   CustomPromise.allSettled([
   *     CustomPromise.resolve(1),
   *     CustomPromise.reject("err")
   *   ]).then(console.log);
   *   // [{ status: "fulfilled", value: 1 }, { status: "rejected", reason: "err" }]
   */
  static allSettled(promises) {
    return new CustomPromise((resolve) => {
      const results = [];
      let completed = 0;

      if (promises.length === 0) {
        return resolve([]);
      }

      promises.forEach((promise, index) => {
        CustomPromise.resolve(promise).then(
          (value) => {
            results[index] = { status: "fulfilled", value };
            completed++;
            if (completed === promises.length) resolve(results);
          },
          (reason) => {
            results[index] = { status: "rejected", reason };
            completed++;
            if (completed === promises.length) resolve(results);
          },
        );
      });
    });
  }

  /**
   * CustomPromise.race(promises)
   *
   * Resolves or rejects with the FIRST promise to settle.
   * All others are ignored (but still execute — just their results are discarded).
   *
   * Why this works:
   * - Once resolve/reject is called once, subsequent calls are ignored
   *   (due to the PENDING check in _handleUpdate)
   *
   * Example:
   *   CustomPromise.race([
   *     new CustomPromise(res => setTimeout(() => res("slow"), 1000)),
   *     new CustomPromise(res => setTimeout(() => res("fast"), 100))
   *   ]).then(console.log); // "fast"
   */
  static race(promises) {
    return new CustomPromise((resolve, reject) => {
      promises.forEach((promise) => {
        // Each promise tries to settle the race — first one wins
        CustomPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  /**
   * CustomPromise.any(promises)
   *
   * Resolves with the FIRST fulfilled promise.
   * Only rejects if ALL promises reject (with AggregateError).
   *
   * Opposite of .all():
   * - .all() needs ALL to succeed, fails on first failure
   * - .any() needs ONE to succeed, fails only if all fail
   *
   * Example:
   *   CustomPromise.any([
   *     CustomPromise.reject("err1"),
   *     CustomPromise.resolve("success"),
   *   ]).then(console.log); // "success"
   */
  static any(promises) {
    return new CustomPromise((resolve, reject) => {
      const errors = [];
      let rejectedCount = 0;

      if (promises.length === 0) {
        return reject(new AggregateError([], "All promises were rejected"));
      }

      promises.forEach((promise, index) => {
        CustomPromise.resolve(promise).then(resolve, (reason) => {
          // Collect errors in order
          errors[index] = reason;
          rejectedCount++;
          // Only reject when ALL have failed
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
      });
    });
  }

  // ========================
  // INSTANCE METHODS
  // ========================

  /**
   * Adds a handler object to the queue and attempts execution.
   *
   * Two scenarios:
   * 1. Promise is PENDING → handler is stored, waits for settlement
   * 2. Promise is already SETTLED → handler executes immediately via _executeHandlers
   *
   * This dual behavior is why we always call _executeHandlers after pushing.
   */
  _addHandler = (handler) => {
    this.handlers.push(handler);
    this._executeHandlers();
  };

  /**
   * Internal resolve — settles promise as FULFILLED with given value.
   *
   * Arrow function so `this` is bound to the instance.
   * Without arrow: when user calls resolve(100), `this` would be undefined.
   */
  _resolve = (value) => {
    this._handleUpdate(states.FULFILLED, value);
  };

  /**
   * Internal reject — settles promise as REJECTED with given reason.
   */
  _reject = (reason) => {
    this._handleUpdate(states.REJECTED, reason);
  };

  /**
   * Core state transition logic.
   *
   * Key design decisions:
   *
   * 1. DOUBLE GUARD against settling more than once:
   *    - First check BEFORE setTimeout: fast exit, avoids unnecessary timer
   *    - Second check INSIDE setTimeout: prevents race condition when both
   *      resolve() and reject() are called synchronously before either timer fires
   *
   *    Example of the race condition:
   *      new CustomPromise((resolve, reject) => {
   *        resolve(1);  // schedules setTimeout
   *        reject(2);   // also schedules setTimeout (first guard passes because state is still PENDING)
   *      });
   *    Without the second guard, both would execute and state would be set twice.
   *
   * 2. setTimeout simulates ASYNC behavior:
   *    - Native promises use microtasks (queueMicrotask / MutationObserver)
   *    - setTimeout is a macrotask — close enough for a polyfill
   *    - Ensures .then() handlers always run asynchronously, even if promise
   *      is already resolved when .then() is called
   *
   * 3. Promise UNWRAPPING (flattening):
   *    - If you resolve a promise with another promise, the outer promise
   *      should adopt the inner promise's eventual state
   *    - Example:
   *        const inner = new CustomPromise(res => setTimeout(() => res(10), 1000));
   *        const outer = new CustomPromise(res => res(inner));
   *        outer.then(console.log); // 10 (after 1 second, NOT the inner promise object)
   */
  _handleUpdate = (state, value) => {
    // First guard: quick exit if already settled
    if (this.state !== states.PENDING) return;

    setTimeout(() => {
      // Second guard: handles the race condition (see explanation above)
      if (this.state !== states.PENDING) return;

      // If resolving with a promise, wait for it to settle first
      // then adopt its state by calling our own resolve/reject
      if (value instanceof CustomPromise) {
        return value.then(this._resolve, this._reject);
      }

      // Lock the state and store the value — this is irreversible
      this.state = state;
      this.value = value;

      // Now execute any .then() handlers that were queued while PENDING
      this._executeHandlers();
    }, 0);
  };

  /**
   * Runs all queued handlers IF the promise is settled.
   *
   * Why check state first?
   * - _addHandler calls this immediately. If still PENDING, we do nothing
   *   and wait for _handleUpdate to call us later.
   *
   * Why clear handlers after execution?
   * - Prevents memory leaks (handlers hold references to closures)
   * - Prevents double execution if _executeHandlers is called again
   */
  _executeHandlers = () => {
    if (this.state === states.PENDING) return;

    this.handlers.forEach((handler) => {
      if (this.state === states.FULFILLED) {
        handler.onSuccess(this.value);
      } else {
        handler.onFailure(this.value);
      }
    });

    // Clear after execution to avoid memory leaks and double-runs
    this.handlers = [];
  };

  /**
   * .then(onSuccess, onFailure)
   *
   * ALWAYS returns a NEW promise (this is what enables chaining).
   *
   * The new promise resolves/rejects based on what the handler returns:
   * - Handler returns a value → next promise resolves with that value
   * - Handler throws → next promise rejects with that error
   * - Handler returns a promise → next promise adopts that promise's state
   *   (handled by _handleUpdate's unwrapping logic)
   *
   * If no handler is provided:
   * - Missing onSuccess → value passes through (transparent)
   * - Missing onFailure → error propagates forward (until caught)
   *
   * Example chain:
   *   promise
   *     .then(v => v + 1)      // returns new promise that resolves with v+1
   *     .then(v => v * 2)      // returns new promise that resolves with (v+1)*2
   *     .catch(err => fallback) // only runs if something above rejected
   */
  then = (onSuccess, onFailure) => {
    return new CustomPromise((resolve, reject) => {
      this._addHandler({
        onSuccess: (value) => {
          // No success handler? Pass value through to the next .then() in chain.
          // This is why: promise.then().then(v => ...) still works.
          if (!onSuccess) {
            return resolve(value);
          }
          try {
            const result = onSuccess(value);
            // If result is a CustomPromise, _handleUpdate will unwrap it
            resolve(result);
          } catch (error) {
            // If the handler throws, reject the next promise in the chain
            reject(error);
          }
        },

        onFailure: (reason) => {
          // No failure handler? Propagate error to next promise in chain.
          // This is how errors "skip" .then() and reach .catch():
          //   reject("err").then(v => ...).then(v => ...).catch(handler)
          //   The error skips both .then() because they have no onFailure
          if (!onFailure) {
            return reject(reason);
          }
          try {
            const result = onFailure(reason);
            // IMPORTANT: A catch handler that returns a value RECOVERS the chain.
            // The next promise RESOLVES (not rejects) with the returned value.
            //   .catch(err => "default") → next .then() gets "default"
            resolve(result);
          } catch (error) {
            // If catch handler itself throws, propagate the new error
            reject(error);
          }
        },
      });
    });
  };

  /**
   * .catch(onFailure)
   *
   * Syntactic sugar for .then(null, onFailure)
   * Only handles rejections. Success values pass through.
   *
   * Example:
   *   promise.catch(err => console.log(err))
   *   // is identical to:
   *   promise.then(null, err => console.log(err))
   */
  catch = (onFailure) => {
    return this.then(null, onFailure);
  };

  /**
   * .finally(callback)
   *
   * Runs callback regardless of resolve/reject, then PRESERVES the original
   * value/error for the next handler in the chain.
   *
   * Key behaviors (matching native Promise.finally):
   * 1. callback receives NO arguments (it doesn't know if resolved or rejected)
   * 2. The returned promise adopts the ORIGINAL value/error (not callback's return)
   * 3. If callback returns a promise, .finally() WAITS for it before continuing
   * 4. If callback throws or returns a rejected promise, that error OVERRIDES
   *
   * Implementation:
   * - Use .then() with both handlers to intercept settlement
   * - Wrap callback() in CustomPromise.resolve() to handle async callbacks
   * - After callback completes, return original value or re-throw original error
   *
   * Example:
   *   CustomPromise.resolve(100)
   *     .finally(() => console.log("cleanup"))  // runs cleanup
   *     .then(val => console.log(val));          // 100 (original value preserved)
   *
   *   CustomPromise.resolve(100)
   *     .finally(() => asyncCleanup())           // waits for cleanup to finish
   *     .then(val => console.log(val));          // 100 (still preserved)
   */
  finally = (callback) => {
    return this.then(
      (value) => {
        // Run callback, wait for it if async, then return ORIGINAL value
        return CustomPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        // Run callback, wait for it if async, then re-throw ORIGINAL error
        return CustomPromise.resolve(callback()).then(() => {
          throw reason;
        });
      },
    );
  };
}

// ========================
// USAGE EXAMPLES
// ========================

const promise = new CustomPromise((resolve, reject) => {
  resolve(100);
});

promise
  .then((val) => val + 50)
  .then((val) => console.log(val)) // 150
  .catch((err) => console.error(err))
  .finally(() => console.log("Done"));

// Test: finally preserves resolved value
CustomPromise.resolve(42)
  .finally(() => console.log("cleanup"))
  .then((val) => console.log("After finally:", val)); // 42

// Test: finally preserves rejection
CustomPromise.reject("oops")
  .finally(() => console.log("cleanup on error"))
  .catch((err) => console.log("Caught:", err)); // "oops"

// Test: finally waits for async callback
CustomPromise.resolve(10)
  .finally(() => new CustomPromise((res) => setTimeout(() => res(), 500)))
  .then((val) => console.log("After async finally:", val)); // 10

// Test: double resolve (second is ignored)
const p = new CustomPromise((resolve) => {
  resolve(1);
  resolve(2); // ignored — promise already settled
});
p.then((val) => console.log("Double resolve:", val)); // 1

// ---------------------------------------------
// 32. Polyfill: Promise.Race

/**
 * Returns a promise that settles as soon as the FIRST input settles.
 * The winner can either:
 * - resolve
 * - reject
 *
 * Remaining promises are ignored once the first one settles.
 */

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        // Why Promise.resolve()?
        // It converts non-promise values into resolved promises.
        //
        // Example:
        // Promise.resolve(10) → Promise that immediately resolves with 10
        //
        // This lets Promise.race() work with both promises and plain values.
        .then(resolve, reject);
      // The first promise to settle wins the race.
      // If it resolves → resolve the returned promise.
      // If it rejects → reject the returned promise.
      // Later results are ignored because a promise settles only once.
    });
  });
}

function testPromiseRace() {
  const promise1 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 1"), 1000),
  );
  const promise2 = new Promise((_, reject) =>
    setTimeout(() => reject("Promise 2 Error"), 800),
  );
  const nonPromiseValue = "Immediate Value";

  promiseRace([promise1, promise2, nonPromiseValue])
    .then((result) => console.log("Resolved with:", result))
    .catch((error) => console.log("Rejected with:", error));
}

testPromiseRace();
// ---------------------------------------------

// ---------------------------------------------
// 33. Polyfill: Promise.Any

/**
 * Observations
 * • Accepts an iterable of promises (or plain values).
 * • Returns a single promise.
 * • Resolves as soon as the FIRST promise fulfills.
 * • Rejects ONLY if ALL input promises reject.
 * • Rejects with an AggregateError containing every rejection reason
 *   in the same order as the input iterable.
 * • An empty iterable immediately rejects with AggregateError.
 *
 * Approach
 * 1. Convert the iterable into an array so we know its length.
 * 2. Resolve immediately when the first promise fulfills.
 * 3. Store rejection reasons using their original index.
 * 4. Count rejected promises.
 * 5. Reject only if every promise rejects.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function promiseAny(promises) {
  // Number of promises that have rejected so far.
  // Used to determine when ALL promises have failed.
  let rejectedCount = 0;

  // Stores rejection reasons in their ORIGINAL input order.
  // Native Promise.any() preserves input order even if
  // promises reject in a different order.
  const reasons = [];

  // Promise.any() accepts any iterable (Array, Set, etc.).
  // Convert it into an array so we can easily determine its length.
  const promiseArray = Array.from(promises);

  return new Promise((resolve, reject) => {
    // Edge case:
    // Promise.any([]) immediately rejects because there is
    // no promise that can ever fulfill.
    if (promiseArray.length === 0) {
      reject(new AggregateError([], "All promises were rejected"));
      return;
    }

    promiseArray.forEach((promise, index) => {
      // Promise.resolve() converts non-promise values into
      // resolved promises.
      //
      // Example:
      // Promise.resolve(10)
      // behaves like an already fulfilled promise with value 10.
      //
      // This allows Promise.any() to work with both promises
      // and normal JavaScript values.
      Promise.resolve(promise).then(
        // As soon as the FIRST promise fulfills,
        // resolve the returned promise.
        //
        // Any later fulfillments/rejections are ignored because
        // a Promise can settle only once.
        resolve,

        (reason) => {
          // Store the rejection reason using its ORIGINAL index.
          //
          // Example:
          // Input:
          // [P1, P2, P3]
          //
          // Even if P3 rejects before P1,
          // AggregateError.errors should still be:
          // [reason1, reason2, reason3]
          reasons[index] = reason;

          // Track how many promises have rejected.
          rejectedCount++;

          // Only reject after EVERY promise has rejected.
          if (rejectedCount === promiseArray.length) {
            // AggregateError groups every rejection reason
            // into a single error object.
            reject(new AggregateError(reasons, "All promises were rejected"));
          }
        },
      );
    });
  });
}

const promises1 = [
  Promise.reject("Error 1"),
  Promise.resolve("Success"),
  Promise.reject("Error 2"),
];
promiseAny(promises1)
  .then((result) => console.log("Resolved with:", result)) // Should print: Resolved with: Success
  .catch((error) => console.log("Rejected with:", error.message));

const promises2 = [Promise.reject("Error 1"), Promise.reject("Error 2")];
promiseAny(promises2)
  .then((result) => console.log("Resolved with:", result))
  .catch((error) => console.log("Rejected with:", error.message)); // Should print: Rejected with: All promises were rejected

const promises3 = [42, Promise.reject("Error")];
promiseAny(promises3)
  .then((result) => console.log("Resolved with:", result)) // Should print: Resolved with: 42
  .catch((error) => console.log("Rejected with:", error.message));

const promises4 = [];
promiseAny(promises4)
  .then((result) => console.log("Resolved with:", result))
  .catch((error) => console.log("Rejected with:", error.message)); // Should print: Rejected with: All promises were rejected

// ---------------------------------------------

// ---------------------------------------------
// 34. Polyfill: Promise.All

/**
 * Observations
 * • Accepts an iterable of promises (or plain values).
 * • Returns a single promise.
 * • Resolves ONLY when ALL input promises fulfill.
 * • Resolves with an array of fulfillment values in the SAME order
 *   as the input iterable, regardless of completion order.
 * • Rejects immediately as soon as the FIRST promise rejects.
 * • An empty iterable immediately resolves with an empty array.
 *
 * Approach
 * 1. Convert the iterable into an array so we know its length.
 * 2. Wrap every input with Promise.resolve() to support non-promise values.
 * 3. Store each fulfilled value at its original index.
 * 4. Count how many promises have fulfilled.
 * 5. Resolve once every promise has fulfilled.
 * 6. Reject immediately if any promise rejects.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function promiseAll(promises) {
  // Promise.all() accepts any iterable (Array, Set, etc.).
  // Convert it into an array so we can determine its length
  // and preserve the original order.
  const promiseArray = Array.from(promises);

  // Edge case:
  // Promise.all([]) immediately resolves because there are
  // no pending promises to wait for.
  if (promiseArray.length === 0) {
    return Promise.resolve([]);
  }

  // Stores fulfilled values in their ORIGINAL input order.
  // Even if promises resolve out of order, the final result
  // must match the order of the input iterable.
  const results = [];

  // Tracks how many promises have fulfilled successfully.
  let completed = 0;

  return new Promise((resolve, reject) => {
    promiseArray.forEach((promise, index) => {
      // Promise.resolve() converts non-promise values into
      // resolved promises.
      //
      // Example:
      // Promise.resolve(10)
      // behaves like an already fulfilled promise with value 10.
      //
      // This allows Promise.all() to work with both promises
      // and plain JavaScript values.
      Promise.resolve(promise).then(
        (value) => {
          // Store the fulfilled value at its ORIGINAL index.
          // This preserves input order regardless of which
          // promise finishes first.
          results[index] = value;

          // Track one more successful promise.
          completed++;

          // Only resolve after EVERY promise has fulfilled.
          if (completed === promiseArray.length) {
            resolve(results);
          }
        },

        // Promise.all() is fail-fast.
        // As soon as the FIRST promise rejects,
        // reject the returned promise immediately.
        //
        // Remaining promises may continue executing,
        // but their results are ignored because a Promise
        // can settle only once.
        reject,
      );
    });
  });
}

const promisesAll1 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(3),
];

promiseAll(promisesAll1)
  .then((result) => console.log("Resolved with:", result))
  .catch((error) => console.log("Rejected with:", error));

const promisesAll2 = [
  Promise.reject("A"),
  Promise.reject("Error"),
  Promise.resolve("B"),
];

promiseAll(promisesAll2)
  .then((result) => console.log("Resolved with:", result))
  .catch((error) => console.log("Rejected with:", error)); // Should print: Rejected with: All promises were rejected

const promisesAll3 = [42, "hello", Promise.resolve("world")];
promiseAll(promisesAll3)
  .then((result) => console.log("Resolved with:", result)) // Should print: Resolved with: [42, "hello", "world"]
  .catch((error) => console.log("Rejected with:", error));

const promisesAll4 = [];
promiseAll(promisesAll4)
  .then((result) => console.log("Resolved with:", result)) // Should print: Resolved with: []
  .catch((error) => console.log("Rejected with 4:", error));

// ---------------------------------------------

// ---------------------------------------------
// 35. Polyfill: Promise.AllSettled
// ---------------------------------------------

/**
 * Observations
 * • Accepts an iterable of promises (or plain values).
 * • Returns a single promise.
 * • Waits until EVERY input promise settles.
 * • Never rejects.
 * • Resolves with an array describing the outcome of each promise.
 * • Preserves the ORIGINAL input order regardless of completion order.
 * • An empty iterable immediately resolves with an empty array.
 *
 * Returned object format
 *
 * Fulfilled:
 * { status: "fulfilled", value: ... }
 *
 * Rejected:
 * { status: "rejected", reason: ... }
 *
 * Approach
 * 1. Convert the iterable into an array so we know its length.
 * 2. Wrap every input with Promise.resolve() to support plain values.
 * 3. Store either the fulfillment value or rejection reason
 *    at the original index.
 * 4. Count how many promises have settled.
 * 5. Resolve once every promise has settled.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

function promiseAllSettled(promises) {
  // Stores the outcome of every promise.
  // Results are stored using the original input index so
  // the final array matches the input order.
  const results = [];

  // Tracks how many promises have finished
  // (either fulfilled OR rejected).
  let completed = 0;

  // Promise.allSettled() accepts any iterable.
  // Convert it into an array so we know its length
  // and can preserve input order.
  const promiseArray = Array.from(promises);

  // Edge case:
  // Promise.allSettled([]) immediately resolves
  // with an empty array.
  if (promiseArray.length === 0) {
    return Promise.resolve([]);
  }

  return new Promise((resolve) => {
    promiseArray.forEach((promise, index) => {
      // Convert plain values into resolved promises.
      //
      // Example:
      // Promise.resolve(10)
      // behaves like a fulfilled promise with value 10.
      Promise.resolve(promise)
        .then((value) => {
          // Store successful result.
          results[index] = {
            status: "fulfilled",
            value,
          };
        })
        .catch((reason) => {
          // Store failed result.
          // Unlike Promise.all(), we DO NOT reject immediately.
          results[index] = {
            status: "rejected",
            reason,
          };
        })
        .finally(() => {
          // finally() runs regardless of whether the promise
          // fulfilled or rejected, making it ideal for counting
          // Because both .then() and .catch() represent a settled promise, and we need to count both cases.
          completed++;

          // Resolve only after EVERY promise has settled.
          if (completed === promiseArray.length) {
            resolve(results);
          }
        });
    });
  });
}

const promisesAllSettled2 = [
  Promise.reject("A"),
  Promise.reject("Error"),
  Promise.resolve("B"),
];

promiseAllSettled(promisesAllSettled2).then((result) =>
  console.log("Resolved with:", result),
);
// Output: [
//  {status: 'fulfilled', value: 'A'},
//  {status: 'rejected', reason: 'Error'},
//  {status: 'fulfilled', value: 'B'}
// ]

const promisesAllSettled3 = [42, "hello", Promise.resolve("world")];

promiseAllSettled(promisesAllSettled3).then((result) =>
  console.log("Resolved with:", result),
);
// Output: [
//  {status: 'fulfilled', value: 42},
//  {status: 'fulfilled', value: 'hello'},
//  {status: 'fulfilled', value: 'world'}
// ]

const promisesAllSettled4 = [];

promiseAllSettled(promisesAllSettled4).then((result) =>
  console.log("Resolved with:", result),
);
// Output: []

// ---------------------------------------------
// 36. Polyfill: GroupBy
// ---------------------------------------------

function groupBy(collection, property) {
  const output = {};

  if (!collection || typeof collection !== "object") {
    return output;
  }

  const isPropertyFunction = typeof property === "function";
  const isPropertyPath = typeof property === "string";

  for (const value of Object.values(collection)) {
    let current = undefined;

    if (isPropertyFunction) {
      current = property(value);
    } else if (isPropertyPath) {
      // {a.b.c} -> [a, b, c]
      const path = property.split(".");
      let i;
      let currentItem = value; // {a: b: {c: { 1 }}}
      let currentKey;

      for (i = 0; i < path.length; i++) {
        // [a, b, c] -> currentKey -> path[0] -> a
        // [a, b, c] -> currentKey -> path[1] -> b
        // [a, b, c] -> currentKey -> path[2] -> c
        currentKey = path[i];

        if (!currentItem?.hasOwnProperty(currentKey)) {
          currentItem = undefined;
          break;
        }
        // {a: b: {c: { 1 }}} -> a??
        // currentItem -> b: {c: { 1 }}

        // b: {c: { 1 }} -> b??
        // currentItem -> {c: { 1 }}

        // {c: { 1 }} -> c??
        // currentItem -> 1
        currentItem = currentItem[currentKey];
      }
      current = currentItem;
    }

    output[current] = output[current] || [];
    output[current].push(value);
  }

  return output;
}

// // Test with invalid input
const result1 = groupBy(1);
console.log(result1); // Output: {}

// // Group by a custom function
const result2 = groupBy([6.1, 2.4, 2.7, 6.8], Math.floor);
console.log(result2); // Output: {"2": [2.4, 2.7], "6": [6.1, 6.8]}

// // Group by string property (length of the string)
const result3 = groupBy(["one", "two", "three"], "length");
console.log(result3); // Output: {"3": ["one", "two"], "5": ["three"]}

// // Group by deep property path
const result4 = groupBy(
  [{ a: { b: { c: 1 } } }, { a: { b: { c: 2 } } }],
  "a.b.c",
);
console.log(result4); // Output: {"1": [{ a: { b: { c: 1}}}], "2": [{ a: { b: { c: 2}}}]}

// ---------------------------------------------
// 37. Polyfill: FlatMap
/**
 * flatMap() is a combination of map() followed by flat(1).
 * reduce() is used to iterate and accumulate the transformed and flattened array.
 * concat() is used to flatten one level of nested arrays.
 */
// ---------------------------------------------

Array.prototype.flatMapPolyfill = function (callback) {
  return this.reduce((acc, curr, i) => {
    // 🧠 Apply the callback to the current item
    const result = callback(curr, i, this);

    // 📦 Flatten the result by concatenating it to the accumulator
    return acc.concat(result);
  }, []);
};

// ---------------------------------------------
//  38. Utility: getElementByStyles()
//  Finds all DOM elements that match a specific computed style
// ---------------------------------------------

const getPropertyComputedValue = (property, value) => {
  // create a new element
  const div = document.createElement("div");

  // apply the property to the element
  div.style[property] = value;

  // get the computed style of the div
  /**
     * 🧠 window.getComputedStyle(el)
     * It is a Browser API
        Provided by the window object
        Part of the CSS Object Model (CSSOM)
        Only works in browsers (not Node.js)
     *
     * This returns the FINAL style calculated by the browser
     * after applying:
     * - External CSS files
     * - <style> tags
     * - Inline styles
     * - Inherited styles
     * - Browser default styles
     *
     *  ❌ Not just el.style (which only checks inline styles)
     *
     * Example:
     * <div class="box"></div>
     * CSS: .box { display: flex }
     *
     * el.style.display ❌ "" (empty)
     * getComputedStyle(el).display ✅ "flex"
     */
  const styles = window.getComputedStyle(document.body.appendChild(div));

  // get the computed value of the property
  let computedValue = styles[property];

  // remove the div
  document.body.removeChild(div);

  // return the computed value
  return computedValue;
};

function getElementsByStyle(rootElement, property, value) {
  // get the computed value of the property, this will make sure we are checking the values that are applied in the browser
  const computedValue = getPropertyComputedValue(property, value);

  // to store the result
  const result = [];

  // helper function to traverse the DOM
  const search = (element, property, value) => {
    // get the computed styles of the element
    let computedStyles = window.getComputedStyle(element);
    let elementPropertyValue = computedStyles[property];

    // if both the values match
    // store the result
    if (elementPropertyValue === computedValue) {
      result.push(element);
    }

    // recursively search for each child of the element
    for (const child of element.children) {
      search(child, property, value);
    }
  };

  // begin the search
  search(rootElement, property, value);

  // return the result
  return result;
}

// Find all flex containers
const flexElements = getElementsByStyle("display", "flex");
console.log(flexElements);

// ---------------------------------------------
//  39. UseEffect
// ---------------------------------------------
import { useEffect, useRef } from "react";

function useCustomEffect(effect, deps) {
  // -----------------------------
  // WHY useRef instead of useState?
  // -----------------------------
  // - useRef does NOT trigger a re-render when its `.current` changes.
  // - useEffect needs to store cleanup and previous deps WITHOUT causing renders.
  // - useState would cause infinite loops because updating state re-renders,
  //   which triggers useEffect again → infinite re-render cycle.
  //
  // So useRef = safe storage, no re-render → exactly what we want.
  // -----------------------------

  // Store previous dependency array
  const prevDepsRef = useRef();

  // Store cleanup function returned from effect()
  const cleanupRef = useRef();

  useEffect(() => {
    // -----------------------------
    // Step 1: Check if deps changed
    // -----------------------------
    // If no deps were passed, always run effect (same as React)
    const noDepsProvided = !deps;

    // If previous deps do NOT exist, this is the first render
    const firstRun = !prevDepsRef.current;

    // -----------------------------
    // NEW:
    // React compares dependencies using Object.is()
    // instead of !==.
    //
    // This correctly handles edge cases like:
    // - NaN (Object.is(NaN, NaN) === true)
    // - -0 and +0
    // -----------------------------
    const depsChanged =
      noDepsProvided ||
      firstRun ||
      deps.some((dep, i) => !Object.is(dep, prevDepsRef.current[i]));

    // -----------------------------
    // Step 2: If dependencies changed,
    //         run cleanup (if exists) then run new effect
    // -----------------------------
    if (depsChanged) {
      // Cleanup old effect before running new one (React behavior)
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }

      // Run the actual effect
      const cleanup = effect();

      // -----------------------------
      // NEW:
      // If effect returns a cleanup function, save it.
      // Otherwise clear any previous cleanup so an old
      // cleanup isn't accidentally called later.
      // -----------------------------
      cleanupRef.current = typeof cleanup === "function" ? cleanup : undefined;

      // Save deps for next render
      prevDepsRef.current = deps;
    }

    // -----------------------------
    // Step 3: Return a cleanup for when component unmounts
    // -----------------------------
    return () => {
      if (typeof cleanupRef.current === "function") {
        cleanupRef.current();
      }
    };

    // React will call this entire useEffect when any dependency changes
    //
    // NOTE:
    // We intentionally pass `deps` here so React schedules
    // this effect exactly like a normal useEffect.
    // The custom dependency comparison above determines
    // whether our custom effect actually executes.
  }, deps);
}

export default useCustomEffect;

// ❓ Why is useEffect used inside the custom polyfill?

// Because React only runs code after render inside a real useEffect.
// Custom hooks cannot run effects after render — only React can.

// So if you try to implement a polyfill without using real useEffect, your custom version will run during render, which is wrong and breaks React.

// Think of React as the event loop scheduler.

// You can decide what to run.
// But only React decides when to run it.

// If you bypass React’s scheduling, the entire lifecycle breaks.

/* EXAMPLE */
const [count, setCount] = useState(0);

useCustomEffect(() => {
  console.log("count changed", count);
}, [count]);

return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;


// ---------------------------------------------
//  40. UseState
// ---------------------------------------------
let hookStates = [];
let hookIndex = 0;

function useCustomUseState(initialValue) {
  // -----------------------------
  // WHY do hooks need an index?
  // -----------------------------
  // React identifies each hook by the
  // order in which it is called.
  //
  // First useState -> slot 0
  // Second useState -> slot 1
  // Third useState -> slot 2
  //
  // This is why hooks must always be
  // called in the same order.
  // -----------------------------

  // -----------------------------
  // WHY is the initial value used
  // only on the first render?
  // -----------------------------
  // React creates the state once.
  // Future renders reuse the stored
  // value instead of the initial one.
  // -----------------------------
  if (hookStates[hookIndex] === undefined) {
    hookStates[hookIndex] =
      typeof initialValue === "function" ? initialValue() : initialValue;
  }

  const currentIndex = hookIndex;

  // -----------------------------
  // WHY support functional updates?
  // -----------------------------
  // React allows:
  //
  // setState(value)
  // OR
  // setState(prev => newValue)
  //
  // The functional form always
  // receives the latest state.
  // -----------------------------
  function setState(value) {
    hookStates[currentIndex] =
      typeof value === "function" ? value(hookStates[currentIndex]) : value;

    // -----------------------------
    // WHY trigger a re-render?
    // -----------------------------
    // Changing state alone isn't enough.
    // React must render the component
    // again so the UI reflects the
    // latest state.
    // -----------------------------
    render();
  }

  const state = hookStates[currentIndex];

  hookIndex++;

  return [state, setState];
}

export default useCustomUseState;



// ---------------------------------------------
//  41. What is a Debug Logger Middleware?

// "Normally, dispatch directly sends an action to the reducer. But sometimes we want to log actions, authenticate users, make API calls, or measure execution time without changing the reducer. Middleware sits between dispatch and the reducer to intercept every action."
// ---------------------------------------------

// "The reducer is a pure function. It takes the current state and an action and returns a new state."
function reducer(state, action) {
  // We check which action has been dispatched
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state, // Copy all existing properties.
        count: state.count + 1,
      };

    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };

    default:
      return state; // Unknown actions should return the existing state.
  }
}

// Now I need a store to hold the application state
function createStore(reducer, initialState) {
  let state = initialState; // Store keeps the current state."

  return {
    getState() {
      return state; // Returns the latest state
    },

    dispatch(action) {
      // Dispatch sends the action to the reducer.
      state = reducer(state, action); // The reducer receives the current state and action, computes the next state, and I replace the old state.
    },
  };
}

// Logger Middleware is a Higher Order Function
const loggerMiddleware = (store) => (next) => (action) => {
  // First function receives the store because middleware needs access to getState(). next is simply the next dispatch function. Finally we receive the dispatched action.
  console.log("===== LOGGER =====");

  console.log("Previous State:", store.getState());

  console.log("Action:", action);

  const result = next(action); // Instead of directly calling the reducer, middleware forwards the action using next(). This allows middleware to execute code before and after the reducer.

  console.log("Next State:", store.getState());

  console.log("==================");

  return result; // Always return the result so dispatch behaves normally
};

// Apply Middleware
function applyMiddleware(store, middleware) {
  const originalDispatch = store.dispatch; // I save the original dispatch.

  // middleware(store)
  // Returns
  // (next)=>...
  // Then
  // (originalDispatch)
  // Returns
  // (action)=>...
  // Finally
  // store.dispatch(action)
  // actually becomes
  // loggerMiddleware(store)(originalDispatch)(action)

  store.dispatch = middleware(store)(originalDispatch); // Now I replace dispatch with a wrapped version.

  return store;
}

// Create Store
const store = createStore(reducer, {
  // Now I create the store with an initial state.
  count: 0,
});

// Attach Logger
applyMiddleware(store, loggerMiddleware); // Now dispatch is replaced by middleware.

// Dispatch Actions
store.dispatch({
  type: "INCREMENT",
});

store.dispatch({
  type: "INCREMENT",
});

store.dispatch({
  type: "DECREMENT",
});

// dispatch()
// ↓
// loggerMiddleware
// ↓
// Previous State
// ↓
// Action
// ↓
// next(action)
// ↓
// Reducer
// ↓
// State Updated
// ↓
// Next State
// ↓
// Return
