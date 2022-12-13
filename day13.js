let fs = require("fs");

function distressed(text){
  const lines = text.split("\n").map((str) => str.trim()).map(line => eval(line));
  console.log(lines)
  let isCorrectOrder = {};
  
  for(let p = 0; p < lines.length; p+=3){
    let left = lines[p];
    let right = lines[p+1];

    
    // // base case - if all the items are integers, checking through them until we find out 
    for(let i = 0; i < left.length; i++){
      if(Number.isInteger(left[i]) && !Number.isInteger(right[i])){
        left[i] = [left[i]];
      } else if(!Number.isInteger(left[i]) && Number.isInteger(right[i])){
        right[i] = [right[i]];
      }

      console.log(left[i], right[i])
      
      // integer checking
      if(left[i] > right[i]){
        isCorrectOrder[(p / 3) + 1] = false;
      } else if(left[i] < right[i]) {
        isCorrectOrder[(p / 3) + 1] = true;
      }

      // checking lengths
      if(left.length > right.length){
        isCorrectOrder[(p / 3) + 1] = false;  
      } else if(left.length < right.length){
        isCorrectOrder[(p / 3) + 1] = true;
      }
    }
  }


  console.log(isCorrectOrder)
  
}

console.log(distressed(fs.readFileSync("./day13input.txt", { encoding: "utf-8" })));
