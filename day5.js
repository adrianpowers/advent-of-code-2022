let fs = require("fs");

function crateMover(text) {
  const lines = text.split("\r\n");
  const formatted = lines.map((line) =>
    line.split(" ").map((line) => line.trim())
  );
  const locations = [
    {},
    { 1: ["[H]", "[C]", "[R]"] },
    { 2: ["[B]", "[J]", "[H]", "[L]", "[S]", "[F]"]},
    { 3: ["[R]", "[M]", "[D]", "[H]", "[J]", "[T]", "[Q]"]},
    { 4: ["[S]", "[G]", "[R]", "[H]", "[Z]", "[B]", "[J]"]},
    { 5: ["[R]", "[P]", "[F]", "[Z]", "[T]", "[D]", "[C]", "[B]"]},
    { 6: ["[T]", "[H]", "[C]", "[G]"]},
    { 7: ["[S]", "[N]", "[V]", "[Z]", "[B]", "[P]", "[W]", "[L]"]},
    { 8: ["[R]", "[J]", "[Q]", "[G]", "[C]"]},
    { 9: ["[L]", "[D]", "[T]", "[R]", "[H]", "[P]", "[F]", "[S]"]},
  ];

  const instructions = formatted.splice(10);
  instructions.forEach((instruction) => {
    const amountToMove = instruction[1];
    const from = instruction[3];
    const to = instruction[5];
    const locationFrom = locations[from];
    const locationTo = locations[to];
    const boxesFrom = Object.values(locationFrom)[0];
    const boxesTo = Object.values(locationTo)[0];
    for (let i = 0; i < amountToMove; i++) {
      const movingBox = boxesFrom.pop();
      boxesTo.push(movingBox);
    }
  });

  let solutionStr = [];

  locations.forEach(location => {
    const boxes = Object.values(location).flat() 
    if(boxes[boxes.length-1]) {
      const lastBox = boxes[boxes.length-1]
      const chars = lastBox.split("")
      solutionStr.push(chars[1])
    }
  })

  console.log(solutionStr.join(''))
}

function crateMover9001(text){
  const lines = text.split("\r\n");
  const formatted = lines.map((line) =>
    line.split(" ").map((line) => line.trim())
  );

  const locations = [
    {},
    { 1: ["[H]", "[C]", "[R]"] },
    { 2: ["[B]", "[J]", "[H]", "[L]", "[S]", "[F]"]},
    { 3: ["[R]", "[M]", "[D]", "[H]", "[J]", "[T]", "[Q]"]},
    { 4: ["[S]", "[G]", "[R]", "[H]", "[Z]", "[B]", "[J]"]},
    { 5: ["[R]", "[P]", "[F]", "[Z]", "[T]", "[D]", "[C]", "[B]"]},
    { 6: ["[T]", "[H]", "[C]", "[G]"]},
    { 7: ["[S]", "[N]", "[V]", "[Z]", "[B]", "[P]", "[W]", "[L]"]},
    { 8: ["[R]", "[J]", "[Q]", "[G]", "[C]"]},
    { 9: ["[L]", "[D]", "[T]", "[R]", "[H]", "[P]", "[F]", "[S]"]},
  ];

  const instructions = formatted.splice(10);
  
  instructions.forEach((instruction) => {
    const amountToMove = instruction[1];
    const from = instruction[3];
    const to = instruction[5];
    const locationFrom = locations[from];
    const locationTo = locations[to];
    const boxesFrom = Object.values(locationFrom)[0];
    const boxesTo = Object.values(locationTo)[0];
    const movingBoxes = boxesFrom.splice(boxesFrom.length-amountToMove)
    movingBoxes.forEach(box => boxesTo.push(box))
  });

  let solutionStr = [];

  locations.forEach(location => {
    const boxes = Object.values(location).flat() 
    if(boxes[boxes.length-1]) {
      const lastBox = boxes[boxes.length-1]
      const chars = lastBox.split("")
      solutionStr.push(chars[1])
    }
  })

  console.log(solutionStr.join(''))
}


console.log(
  crateMover9001(fs.readFileSync("./day5input.txt", { encoding: "utf-8" }))
);
