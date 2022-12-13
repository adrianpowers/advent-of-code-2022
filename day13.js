let fs = require("fs");

function distressed(text){
  const lines = text.split("\n").map((str) => str.trim()).map(line => eval(line));
  let isCorrectOrder = {};
  
  for(let p = 0; p < lines.length; p+=3){
    let left = lines[p];
    let right = lines[p+1];

    // console.log(`PAIR ${p / 3 + 1}: ${left} , ${right}`)
    
    if(left.length === 0){
      isCorrectOrder[(p / 3) + 1] = true;
    }
    
    if(right.length === 0){
      isCorrectOrder[(p / 3) + 1] = false;
    }

    if(right.length > 0 && left.length > 0){
      // // base case - if all the items are integers, checking through them until we find out 
      for(let i = 0; i < left.length; i++){
  
        if(Number.isInteger(left[i]) && !Number.isInteger(right[i])){
          left[i] = [left[i]];
        } else if(!Number.isInteger(left[i]) && Number.isInteger(right[i])){
          right[i] = [right[i]];
        }
        
        // integer checking
        if(left[i] > right[i]){
          isCorrectOrder[(p / 3) + 1] = false;
          break;
        } else if(left[i] < right[i]) {
          isCorrectOrder[(p / 3) + 1] = true;
          break;
        }
  
        // checking lengths
        if(left.length > right.length){
          isCorrectOrder[(p / 3) + 1] = false;  
          break;
        } else if(left.length < right.length){
          isCorrectOrder[(p / 3) + 1] = true;
          break;
        }
      }
    }
  }

  let sum = 0;

  let indices = Object.keys(isCorrectOrder);
  indices.forEach(index => {
    if(isCorrectOrder[index]){
      sum += Number(index);
    }
  })

  return sum;
  
}

// 5210 is too low

console.log(distressed(fs.readFileSync("./day13input.txt", { encoding: "utf-8" })));
