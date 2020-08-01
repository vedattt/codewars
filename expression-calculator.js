// Kata link: https://www.codewars.com/kata/52a78825cdfc2cfc87000005/javascript
// Input example: '(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11) ' 

const calc = function(exp) { 
  ///// whip expression into desired format /////
  exp = exp.replace(/ *- *-/g, " + ")                   // format double negatives
           .replace(/ *\+ *-/g, " - ")                  // format indirect subtractions
           .replace(/ *\+ */g, " + ")                   // format addition
           .replace(/([0-9]|\)) *- */g, "$1 - ")        // format subtraction
           .replace(/ *\* */g, " * ")                   // format multiplication
           .replace(/ *\/ */g, " / ")                   // format division
           .replace(/\( *([0-9]|-[0-9]|-|\()/g, "( $1") // format parenthesis openings
           .replace(/([0-9]|\)) *\)/g, "$1 )");         // format parenthesis closings
  while (/(?!\)) *-\( (.*) \)/.test(exp)) {             // format negative parenthesis
    exp = exp.replace(/(?!\)) *-\( (.*) \)/g, " ( -1 * ( $1 ) )");
  }
  
  ///// starting with the innermost parenthesis, replace parenthesis with its evaluation /////
  while (exp.match(/\(/)) {
    exp = exp.replace(/\(([^\(\)]*)\)/, (_, e) => `${calc(e)}`);
  }
  
  ///// process formatted expression /////
  var arr = exp.split(" ").filter(e => e !== ""), addSub = 0, mulDiv = 0;
  arr.forEach(function (e) {
    addSub += (e === "+" || e === "-") ? 1 : 0;                     // count number of + and -
    mulDiv += (e === "*" || e === "/") ? 1 : 0;                     // count number of * and /
  });
  
  ///// perform core evaluations /////
  while (mulDiv) {                          // run as long as multiply/divide operations exist
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === "*" || arr[i] === "/") {
        var el = [parseFloat(arr[i-1]), parseFloat(arr[i+1])],  // grab elements for operation
            t = (arr[i] === "*") ? (el[0] * el[1]) : (el[0] / el[1]);
        arr.splice(i-1, 3, t.toString());                // feed result back to place in array
        mulDiv--;                                   // decrement amount of operations in array
        break;                              // no need to keep going once an operation is done
      }
    }
  }
  while (addSub) {                             // run as long as add/subtract operations exist
    for (i = 0; i < arr.length; i++) {
      if (arr[i] === "+" || arr[i] === "-") {
        var el = [parseFloat(arr[i-1]), parseFloat(arr[i+1])], 
            t = (arr[i] === "+") ? (el[0] + el[1]) : (el[0] - el[1]);
        arr.splice(i-1, 3, t.toString());
        addSub--;
        break;
      }
    }
  }
  
  return parseFloat(arr);
}; // 10.04.2020