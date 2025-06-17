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
  // 1. Create a temporary array to store the results
  let temp = [];

  // 2. Iterate over each element of the array
  for (let i = 0; i < this.length; i++) {
    // 3. Call the callback function 'cb' on the current element
    // Pass current element, index, and entire array as arguments
    const mappedValue = cb(this[i], i, this);

    // 4. Push the result of callback into the temp array
    temp.push(mappedValue);
  }

  // 5. Return the new array with transformed values
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
 * - By doing this, all arrays will have access to this myMap method.
 * - cb is a parameter representing a callback function that you pass when calling myMap on an array.
 * - this refer to the array on which myMap was called. For example, if you did nums.myMap(...), this would be nums.
 */
Array.prototype.myFilter = function (cb) {
  // 1. Create a temporary array to store the filtered results
  let temp = [];

  // 2. Iterate over each element of the array
  for (let i = 0; i < this.length; i++) {
    // 3. Call the callback function 'cb' on the current element
    // Pass current element, index, and entire array as arguments
    const shouldInclude = cb(this[i], i, this);

    // 4. If callback returns true, push the element into temp array
    if (shouldInclude) {
      temp.push(this[i]);
    }
  }

  // 5. Return the new array with elements that passed the test
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

// [].myEvery.call(str, char => char !== 'z'); // 🚫 this would crash without Object(this)
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
// 4. Some Polyfill
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
      "Array.prototype.myFindIndex called on null or undefined"
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
      "Array.prototype.myForEach called on null or undefined"
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
/* They are Function prototype methods used to manually set the this value and pass arguments. */
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
    `I have purchased ${this.color} - ${this.company} car for ${currency}${price}`
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
  let timeout;

  // Return a new debounced version of the function
  return function (...args) {
    // Capture the current `this` context
    const context = this;

    // Clear any previously set timeout to reset the wait period
    clearTimeout(timeout);

    // Start a new timer - only if no more calls come in before `delay`,
    // the function `fn` will be called with latest arguments
    timeout = setTimeout(() => {
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
const context = this;

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
  // Store the last time the function was actually executed
  let lastCallTime = 0;

  // Store a timeout ID if a future execution is scheduled
  let timeoutId = null;

  // Return a throttled version of the original function
  return function (...args) {
    // Save the context (`this`) to preserve it inside setTimeout
    const context = this;

    // Get the current time in milliseconds
    const now = Date.now();

    // Calculate how much time is left before we can call the function again
    const remainingTime = interval - (now - lastCallTime);

    /**
     * 1️⃣ If enough time has passed since the last call (remainingTime <= 0),
     * we execute `fn` immediately.
     */
    if (remainingTime <= 0) {
      // If a timeout was previously scheduled, clear it (not needed anymore)
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }

      // Update the last call time to now
      lastCallTime = now;

      // Call the original function with correct context and arguments
      fn.apply(context, args);
    } else if (!timeoutId) {
      /**
       * 2️⃣ Otherwise, if we're still within the throttle interval,
       * and no timeout is already scheduled, schedule one.
       */
      timeoutId = setTimeout(() => {
        // When the scheduled time passes, update the last call time
        lastCallTime = Date.now();

        // Clear the timeout ID to allow future scheduling
        timeoutId = null;

        // Call the function with the saved context and arguments
        fn.apply(context, args);
      }, remainingTime);
    }

    /**
     * ⚠️ If we're still in the interval and a timeout is already scheduled,
     * do nothing — just wait for the scheduled call to run.
     */
  };
}

const onResize = () => console.log("Resize event handler called");

window.addEventListener("resize", myThrottle(onResize, 1000));

// -------------------------------------------
// 15. USEMEMO() & USECALLBACK() Polyfill
// -------------------------------------------
// LEARNERS BUCKET REACT HOOKS

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

if (!Array.prototype.sort) {
  Array.prototype.sort = function (compareFn) {
    compareFn =
      compareFn ||
      function (a, b) {
        if (a === undefined) return 1;
        if (b === undefined) return -1;
        return String(a).localeCompare(String(b));
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
        "String.prototype.repeat called on null or undefined"
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

  return searchElement(document.body);
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

  searchElements(document.body); // Start searching from the document body

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
// Write a polyfill for clearAllTimeout that tracks and clears all timeouts set
// using setTimeout.
// -------------------------------------------

// Global array to track all active timeout IDs
const timeoutIds = new Set();

// Override the native setTimeout to keep track of all timeout IDs
const originalSetTimeout = window.setTimeout; // Preserve the original function

window.setTimeout = function (callback, delay) {
  // Call the original setTimeout and get the timeout ID
  const timeoutId = originalSetTimeout(callback, delay);

  // Store the timeout ID in the tracking set
  timeoutIds.add(timeoutId);

  return timeoutId; // Return the timeout ID so it can be used normally
};

// Function to clear all timeouts
function clearAllTimeout() {
  // Iterate through all stored timeout IDs
  timeoutIds.forEach((timeoutId) => {
    clearTimeout(timeoutId); // Clear each timeout
  });

  // After clearing, reset the tracking array to remove all references
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

// Expected Output:
// "Clearing all timeouts..."  (after 5 sec)
// Timeout 2 & Timeout 3 **should not execute** since they are cleared

// DOUBTS
// const originalSetTimeout = window.setTimeout;

// Why?
// We need to track every timeout that is created.
// But if we directly modify window.setTimeout, we lose access to the original function.
// So, we first store the original setTimeout in a variable called originalSetTimeout

// window.setTimeout = function(callback, delay) {}
// We are replacing the default setTimeout with our own version.
// Whenever someone calls setTimeout(), our own version will run instead of the native one.

// -------------------------------------------
// 27 & 28 Polyfill for setTimeout & setInterval
// - Uses requestIdleCallback for async scheduling
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

/**
 * CREATE STATES PENDING, FULFILLED, REJECTED
 * BASIC PROMISE STRUCTURE TAKE A CALLBACK WITH RESOLVE AND REJECT METHOD
 * .THEN WILL TAKE ONSUCCESS AND ONERROR AND CATCH METHOD
 * UPDATE FUNCTION ASYNCHRONOUSLY
 * .THEN ALSO RETURNS A PROMISE
 * onFullFillment array, handlers array to keep a track of .then functions
 */

const states = {
  PENDING: "PENDING",
  FULFILLED: "FULFILLED",
  REJECTED: "REJECTED",
};

class CustomPromise {
  constructor(callback) {
    this.state = states.PENDING;
    this.value = undefined;
    this.handlers = []; // fulfilled array

    try {
      callback(this._resolve, this._reject);
    } catch (error) {}
  }

  _addHandler = (handler) => {
    this.handlers.push(handler);
    this._executeHandlers();
  };

  _resolve = (value) => {
    // console.log(value)
    this._handleUpdate(states.FULFILLED, value);
  };

  _reject = (value) => {
    // console.log(value)
    this._handleUpdate(states.REJECTED, value);
  };

  _handleUpdate = (state, value) => {
    // This line ensures that a promise can only be settled once — either fulfilled or rejected. If a promise is already resolved/rejected (i.e., not pending), we skip further updates.
    if (this.state !== states.PENDING) {
      return;
    }

    setTimeout(() => {
      // This checks if the resolved value is another promise (i.e., a thenable), and if so, we must wait for that promise to resolve/reject first.
      // const inner = new CustomPromise((res) => setTimeout(() => res("done"), 1000));
      // const outer = new CustomPromise((res) => res(inner));
      if (value instanceof CustomPromise) {
        value.then(this._resolve, this._reject);
      }
      this.state = state;
      this.value = value;

      this._executeHandlers();
    }, 500);
  };

  _executeHandlers = () => {
    if (this.state === states.PENDING) {
      return;
    }

    this.handlers.forEach((handler) => {
      // fulfilled
      if (this.state === states.FULFILLED) {
        return handler.onSuccess(this.value);
      }

      // rejected
      return handler.onFailure(this.value);
    });
  };

  then = (onSuccess, onFailure) => {
    return new CustomPromise((resolve, reject) => {
      this._addHandler({
        onSuccess: (value) => {
          if (!onSuccess) {
            return resolve(value);
          }
          try {
            return resolve(onSuccess(value));
          } catch (error) {
            return reject(error);
          }
        },
        onFailure: (value) => {
          if (!onFailure) {
            return reject(value);
          }
          try {
            return reject(onFailure(value));
          } catch (error) {
            return reject(error);
          }
        },
      });
    });
  };

  catch = (onFailure) => {
    return this.then(null, onFailure);
  };
}

const promise = new CustomPromise((resolve, reject) => {
  resolve(1000);
});

promise.then((val) => console.log(val)).catch((err) => console.error(err));

// ---------------------------------------------
// 32. Polyfill: Promise.Race
/**
 * observations
 * iterable of promises and returns a single promise
 * This returned promise settles with the first promise that settles
 *
 * Approach
 * accepts an iterable like an array
 * iterate through promises
 * returned promise will settle(either resolve or reject) as soon as the first promise settles
 * if the promise resolves, the returned promise resolves with the same value
 * if the promise rejects, the returned promised rejects with the same reason
 */

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      Promise.resolve(promise) // added check for non-promise value
        .then(resolve, reject);
    });
  });
}

function testPromiseRace() {
  const promise1 = new Promise((resolve) =>
    setTimeout(() => resolve("Promise 1"), 1000)
  );
  const promise2 = new Promise((_, reject) =>
    setTimeout(() => reject("Promise 2 Error"), 800)
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
 * observations
 *
 * iterable of promises and return a single promise
 * returned promise is fulfilled with this first fulfillment value
 * it rejects when all of the input's promises reject including an empty array
 * containing an array of rejection reason
 *
 * Approach
 * create a new promise to track the fulfillment/rejection
 * iterate over the array of promises
 * resolve the promise as soon as any promise in the array fulfills
 * if all promises reject, reject the new promise with the array of rejection reasons
 */

function promiseAny(promises) {
  let rejectedCount = 0;
  let reasons = [];

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => resolve(value))
        .catch((reason) => {
          reasons.push(reason);
          rejectedCount++;

          if (rejectedCount === promises.length) {
            reject(new Error("All promises were rejected"));
          }
        });
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
  .then((result) => console.log("Resolved with 4:", result))
  .catch((error) => console.log("Rejected with 4:", error.message)); // Should print: Rejected with: All promises were rejected
// ---------------------------------------------

// ---------------------------------------------
// 34. Polyfill: Promise.All
/**
 * observations
 *
 * iterable of promises and return a single promise
 * returned promise is fulfilled when all of them fulfilled including empty array
 * returns rejected promise with the first rejection reason
 *
 * Approach
 * iterate over the array of promise
 * track the resolution status of each promise
 * if all the promises resolve, resolve the new promise with an array of resolved values
 * if any promise rejects, reject with the first rejection reason
 */

function promiseAll(promises) {
  let results = [];
  let completedPromises = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedPromises++;

          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

const promisesAll1 = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.reject(3),
];

promiseAll(promisesAll1)
  .then((result) => console.log("Resolved with:", result)) // Should print: Resolved with: [1, 2, 3]
  .catch((error) => console.log("Rejected with:", error.message));

const promisesAll2 = [
  Promise.reject("A"),
  Promise.reject("Error"),
  Promise.resolve("B"),
];

promiseAll(promisesAll2)
  .then((result) => console.log("Resolved with:", result))
  .catch((error) => console.log("Rejected with:", error.message)); // Should print: Rejected with: All promises were rejected

const promisesAll3 = [42, "hello", Promise.resolve("world")];

promiseAll(promisesAll3)
  .then((result) => console.log("Resolved with:", result)) // Should print: Resolved with: [42, "hello", "world"]
  .catch((error) => console.log("Rejected with:", error.message));

const promisesAll4 = [];

promiseAll(promisesAll4)
  .then((result) => console.log("Resolved with:", result)) // Should print: Resolved with: []
  .catch((error) => console.log("Rejected with 4:", error.message));
// ---------------------------------------------

// ---------------------------------------------
// 35. Polyfill: Promise.AllSettled
// ---------------------------------------------

function promiseAllSettled(promises) {
  let results = [];
  let completedPromises = 0;

  if (promises.length === 0) {
    resolve([]);
    return;
  }

  promises.forEach((promise, index) => {
    Promise.resolve(promise)
      .then((value) => {
        results[index] = { status: "fulfilled", value };
      })
      .catch((reason) => {
        results[index] = { status: "rejected", reason };
      })
      .finally(() => {
        completedPromises++;
        if (completedPromises === promises.length) {
          resolve(results);
        }
      });
  });
}

const promisesAllSettled2 = [
  Promise.reject("A"),
  Promise.reject("Error"),
  Promise.resolve("B"),
];

promiseAllSettled(promisesAllSettled2).then((result) =>
  console.log("Resolved with:", result)
);
// Output: [
//  {status: 'fulfilled', value: 'A'},
//  {status: 'rejected', reason: 'Error'},
//  {status: 'fulfilled', value: 'B'}
// ]

const promisesAllSettled3 = [42, "hello", Promise.resolve("world")];

promiseAllSettled(promisesAllSettled3).then((result) =>
  console.log("Resolved with:", result)
);
// Output: [
//  {status: 'fulfilled', value: 42},
//  {status: 'fulfilled', value: 'hello'},
//  {status: 'fulfilled', value: 'world'}
// ]

const promisesAllSettled4 = [];

promiseAllSettled(promisesAllSettled4).then((result) =>
  console.log("Resolved with:", result)
);
// Output: []
