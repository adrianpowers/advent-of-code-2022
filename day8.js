let fs = require("fs");

function OLDtreehouse(text) {
  const lines = text.split("\n").map((str) => str.trim());
  // lines.forEach(line => linesArray.push([line]));
  const linesArray = lines.map((line) => line.split("").map(Number));
  const height = linesArray.length;
  const width = linesArray[0].length;
  const perimeter = height * 2 + width * 2 - 4;
  let visible = perimeter;
  /*
  [
    [ 3 0 3 7 3 ]
    [ 2 5 5 1 2 ]
    [ 6 5 3 3 2 ]
    [ 3 3 5 4 9 ]
    [ 3 5 3 9 0 ]
  ]
  */

  // rows check
  linesArray.forEach((row) => {
    if (
      linesArray.indexOf(row) === 0 ||
      linesArray.indexOf(row) === linesArray.length - 1
    ) {
      return;
    }

    const tallestInRow = Math.max(...row);
    const shortestInRow = Math.max(...row);

    for (let i = 0; i < row.length; i++) {
      const column = [];
      for (let x = 0; x < height; x++) {
        column.push(linesArray[x][i]);
      }

      const tallestInColumn = Math.max(...column);
      const shortestInColumn = Math.min(...column);

      if (!(i === 0 || i === row.length - 1)) {
        console.log(row[i]);
        if (row[i] > tallestInRow || row[i] > tallestInColumn || row[i] > shortestInColumn || row[i] > shortestInRow) {
          visible++;
          console.log(row[i] + " is visible!");
        }
      }
    }
  });

  console.log(visible);
}

function treehouse(text){
  const lines = text.split("\n").map((str) => str.trim());
  const linesArray = lines.map((line) => line.split("").map(Number));

  const visible = {};

  console.log(linesArray);

  function setVisible(xCoord, yCoord, dir){
    if(!visible[`${xCoord}, ${yCoord}`]){
      visible[`${xCoord}, ${yCoord}`] = [];
    }
    visible[`${xCoord}, ${yCoord}`].push(dir);
  }

  linesArray.forEach(line => {
    // FROM LEFT, but also edge logic
    for(let i = 0; i < line.length; i++){
      const xCoord = i;
      const yCoord = linesArray.indexOf(line);
      const currentTrees = line.slice(0, xCoord+1);
      let tallest = Math.max(...currentTrees);

      if(currentTrees.length === 1){
        setVisible(xCoord, yCoord, "left edge!")
      };

      if(currentTrees.length === line.length && xCoord === currentTrees.length-1){
        setVisible(xCoord, yCoord, "right edge!")
      }

      if(yCoord === 0){
        setVisible(xCoord, yCoord, "top edge!")
      }

      if(yCoord === linesArray.length-1){
        setVisible(xCoord, yCoord, "bottom edge!")
      }

      if(currentTrees[i-1]){
        if(currentTrees[i] > currentTrees[i-1] && currentTrees[i] >= tallest){
          if(i === line.indexOf(currentTrees[i])){
            setVisible(xCoord, yCoord, "VISIBLE FROM LEFT");
          }
        }
      }
    }

    // FROM RIGHT
    for(let i = 0; i < line.length; i++){
      const xCoord = i;
      const yCoord = linesArray.indexOf(line);
      const currentTrees = line.slice(-i-1);
      let tallest = Math.max(...currentTrees);

      if(currentTrees[0] > currentTrees[1] && currentTrees[0] >= tallest){
        setVisible(xCoord, yCoord, "VISIBLE FROM RIGHT");
      }
    }
  })
  
  let columns = [];

  for(let i = 0; i < linesArray[0].length; i++){
    const currentTrees = linesArray.map(line => line[i]); 
    columns.push(currentTrees)
  }

  columns.forEach(col => {
    // FROM TOP
    for(let i = 0; i < col.length; i++){
      const xCoord = i;
      const yCoord = columns.indexOf(col);
      const currentTrees = col.slice(0, xCoord+1);
      let tallest = Math.max(...currentTrees);

      if(currentTrees[i-1]){
        if(currentTrees[i] > currentTrees[i-1] && currentTrees[i] >= tallest){
          if(i === col.indexOf(currentTrees[i])){
            setVisible(yCoord, xCoord, "VISIBLE FROM TOP");
          }
        }
      }
    }

    // FROM BOTTOM
    for(let i = 0; i < col.length; i++){
      const xCoord = i;
      const yCoord = columns.indexOf(col);
      const currentTrees = col.slice(-i-1);
      let tallest = Math.max(...currentTrees);

      if(currentTrees[0] > currentTrees[1] && currentTrees[0] >= tallest){
        setVisible(yCoord, xCoord, "VISIBLE FROM BOTTOM");
      }
    }
  })

  return (Object.keys(visible).length)
}

// 3165 is too high

console.log(
  treehouse(fs.readFileSync("./day8input.txt", { encoding: "utf-8" }))
);
