/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.

Example:
 *   balancedParens('(');  // false
 *   balancedParens('()'); // true
 *   balancedParens(')(');  // false
 *   balancedParens('(())');  // true
 *
 * Step 2:
 *   make your solution work for all types of brackets
 *
 * Example:
 *  balancedParens('[](){}'); // true
 *  balancedParens('[({})]');   // true
 *  balancedParens(''); // false
 *
 * Step 3:
 * ignore non-bracket characters
 * balancedParens(' const wow = { yo: thisIsAwesome() }'); // true
 * balancedParens(' const newton = () => { telescopes.areSicc(); '); // false
 
 */
//
// Approach 1: Recursive
// Use Regex to ensure everything we have is brackets

//Inner function:
// Base Case: if string.length=0 => true

// If 1 & last are the corresponding brackets
// If 1
// Return Recursion to inner, taking 1 and last out
// Else
// Return false

// Approach 2: Use Stack
// O(n) space where n is the lenght of the string in case example: if we only have open parenthese
// O(n) time where n is the length of the string since we will iterate through the string
const balancedParens = (string) => {
  // Intialize an object for matching the open & close parens
  const closeToOpenParen = { '}': '{', ']': '[', ')': '(' };
  // Initialize a Set for open paren
  const openParen = new Set(['{', '[', '(']);
  // Initialize a stack
  const stack = [];
  //   Initialize the boolean for found paren
  let foundParen = false;
  // Iterate through the string
  for (let i in string) {
    // If see a close paren :
    if (string[i] in closeToOpenParen) {
      // if (closeToOneParen[string[i]]!==undefined)
      // If not match the last item in the stack => return false
      if (closeToOpenParen[string[i]] !== stack.pop()) return false;
      // If  match the last item in the stack => continue the iteration
    }
    // If see a open paren, => push the paren to stack
    if (openParen.has(string[i])) {
      stack.push(string[i]);
      //   Update the flag
      foundParen = true;
    }
  }
  // Return true if stack is empty
  return foundParen && stack.length === 0;
};

console.log(balancedParens('(')); // false
console.log(balancedParens('()')); // true
console.log(balancedParens(')(')); // false
console.log(balancedParens('(())')); // true
console.log(balancedParens('[](){}')); // true
console.log(balancedParens('[({})]')); // true
console.log(balancedParens(' * ')); // false
console.log(balancedParens(' const wow = { yo: thisIsAwesome() }')); // true
console.log(balancedParens(' const newton = () => { telescopes.areSicc();')); // false

// Approach 3: Hash approach
// Initialize an object where key is closing paren & value is 0
// Iterate through the string
// If the character is closing paren => return false
// Else if the character is an open paren => increase the count in the object

// Approach 4: 2 pointers
//
