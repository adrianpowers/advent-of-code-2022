let fs = require("fs");

function rope(text) {
  const lines = (text
    .split("\n")
    .map((str) => str.trim())
    .map((str) => str.split(" "))
  );

  let headPos = { x: 1, y: 1 } // arbitrary values
  let tailPos = { x: 1, y: 1 } // arbitrary values
  let visited = {};

  lines.forEach(line => {
    const [ direction, amountToMove ] = line;
    if(direction === "U"){
      for(let i = 0; i < amountToMove; i++){
        headPos.y ++;
        if(headPos.y - tailPos.y >= 2){
          if(headPos.x === tailPos.x){
            tailPos.y ++;
          } else if(headPos.x > tailPos.x){
            tailPos.x ++;
            tailPos.y ++;
          } else if(headPos.x < tailPos.x){
            tailPos.x --;
            tailPos.y ++;
          }
        }
        visited[`${tailPos.x}, ${tailPos.y}`] = true;
      }
    }
    else if(direction === "D"){
      for(let i = 0; i < amountToMove; i++){
        headPos.y --;
        if(tailPos.y - headPos.y >= 2){
          if(headPos.x === tailPos.x){
            tailPos.y --;
          } else if(headPos.x > tailPos.x){
            tailPos.x ++;
            tailPos.y --;
          } else if(headPos.x < tailPos.x){
            tailPos.x --;
            tailPos.y --;
          }
        }
        visited[`${tailPos.x}, ${tailPos.y}`] = true;
      }
    }
    else if(direction === "R"){
      for(let i = 0; i < amountToMove; i++){
        headPos.x ++;
        if(headPos.x - tailPos.x >= 2){
          if(headPos.y === tailPos.y){
            tailPos.x ++;
          } else if(headPos.y > tailPos.y){
            tailPos.x ++;
            tailPos.y ++;
          } else if(headPos.y < tailPos.y){
            tailPos.x ++;
            tailPos.y --;
          }
        }
        visited[`${tailPos.x}, ${tailPos.y}`] = true;
      }
    }
    else if(direction === "L"){
      for(let i = 0; i < amountToMove; i++){
        headPos.x --;
        if(tailPos.x - headPos.x >= 2){
          if(headPos.y === tailPos.y){
            tailPos.x --;
          } else if(headPos.y > tailPos.y){
            tailPos.x --;
            tailPos.y ++;
          } else if(headPos.y < tailPos.y){
            tailPos.x --;
            tailPos.y --;
          }
        }
        visited[`${tailPos.x}, ${tailPos.y}`] = true;
      }
    }
  })

  console.log(Object.keys(visited).length)

}

function ropeBroke(text){
  const lines = (text
    .split("\n")
    .map((str) => str.trim())
    .map((str) => str.split(" "))
  );

  let visited = {};

  let positions = [ 
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1},
    { x: 1, y: 1}, 
  ]

  // knot 1 position = positions[1].x, positions[1].y; etc etc etc

  lines.forEach(line => {
    const [ direction, amountToMove ] = line;
    if(direction === "U"){
      for(let i = 0; i < amountToMove; i++){
        positions[0].y ++;
        for(let j = 1; j < positions.length; j++){
          if(positions[j-1].y - positions[j].y >= 2){
              positions[j].y ++;
            if(positions[j-1].x === positions[j].x){
              positions[j].y ++;
            } else if(positions[j-1].x > positions[j].x){
              positions[j].x ++;
              positions[j].y ++;
            } else if(positions[j-1].x < positions[j].x){
              positions[j].x --;
              positions[j].y ++;
            }
          }
          visited[`${positions[9].x}, ${positions[9].y}`] = true;
        }
      }
    }
    else if(direction === "D"){
      for(let i = 0; i < amountToMove; i++){
        positions[0].y --;
        for(let j = 1; j < positions.length; j++){
          if(positions[j].y - positions[j-1].y >= 2){
            positions[j].y --;
            if(positions[j-1].x === positions[j].x){
              positions[j].y --;
            } else if(positions[j-1].x > positions[j].x){
              positions[j].x ++;
              positions[j].y --;
            } else if(positions[j-1].x < positions[j].x){
              positions[j].x --;
              positions[j].y --;
            }
          }
          visited[`${positions[9].x}, ${positions[9].y}`] = true;
        }
      }
    }
    else if(direction === "R"){
      for(let i = 0; i < amountToMove; i++){
        positions[0].x ++;
        for(let j = 1; j < positions.length; j++){
          if(positions[j-1].x - positions[j].x >= 2){
            positions[j].x ++;
            if(positions[j-1].y === positions[j].y){
              positions[j].x ++;
            } else if(positions[j-1].y > positions[j].y){
              positions[j].x ++;
              positions[j].y ++;
            } else if(positions[j-1].y < positions[j].y){
              positions[j].x ++;
              positions[j].y --;
            }
          }
          visited[`${positions[9].x}, ${positions[9].y}`] = true;
        }
      }
    }
    else if(direction === "L"){
      for(let i = 0; i < amountToMove; i++){
        positions[0].x --;
        for(let j = 1; j < positions.length; j++){
          if(positions[j].x - positions[j-1].x >= 2){
            positions[j].x --;
            if(positions[j-1].y === positions[j].y){
              positions[j].x --;
            } else if(positions[j-1].y > positions[j].y){
              positions[j].x --;
              positions[j].y ++;
            } else if(positions[j-1].y < positions[j].y){
              positions[j].x --;
              positions[j].y --;
            }
          }
          visited[`${positions[9].x}, ${positions[9].y}`] = true;
        }
      }
    }
  })

  console.log(Object.keys(visited).length)
}

// part 2: answer is between 2273 and 3478

console.log(ropeBroke(fs.readFileSync("./day9input.txt", { encoding: "utf-8" })));
