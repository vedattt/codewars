// Kata link: https://www.codewars.com/kata/5296bc77afba8baa690002d7/javascript
// This won't solve every (as in hard) sudoku puzzle btw.

function sudoku (puzzle) { // I've made it decently dynamic, thus it could solve differently sized boards too.
  
  let unsolved = true,
      board = puzzle.slice(),
      size = board.length,
      regSize = 3,          // size of regions
      possibilities = [];   // placeable numbers
  
  for (let n = 1; n <= size; n++) possibilities.push(n);
  
  while (unsolved) {
  
    for (let y = 0; y < size; y++) { // y-coord
    
      let regy = Math.floor(y / regSize) * regSize, // determine region's y-coord
          row = board[y].slice();
      
      for (let x = 0; x < size; x++) { // x-coord
      
        // if coordinate is unsolved
        if (board[y][x] === 0) {
        
          let column = [], 
              regx = Math.floor(x / regSize) * regSize, // determine region's x-coord
              region = [];
          
          // populate column numbers array
          for (let col = 0; col < size; col++) column.push(board[col][x]);
          
          // populate region numbers array
          for (let ry = regy; ry < regy + regSize; ry++) {
            for (let rx = regx; rx < regx + regSize; rx++) {
              region.push(board[ry][rx]);
            }
          }
          
          // eliminate used possibilities
          let possibility = possibilities.map(e => row.indexOf(e) === -1 && 
                                                column.indexOf(e) === -1 && 
                                                region.indexOf(e) === -1 ? e : null)
                                         .filter(e => e !== null);
          
          // place number depending on certainty
          board[y][x] = possibility.length === 1 ? possibility[0] : 0;
        }
      }
    }
    
    // keep looping until board is completely solved
    unsolved = board.reduce((a, e) => e.indexOf(0) === -1 ? [...a, ...e] : [...a, null], [])
                    .indexOf(null) !== -1;
  }
  
  return board;
} // 12.04.2020