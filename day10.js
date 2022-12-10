let fs = require("fs");

function noopnoop(text) {
  const lines = text.split("\n").map((str) => str.trim());

  let cycleObj = {};
  let cycle = 1;
  let x = 1;

  lines.forEach((line) => {
    const splitLine = line.split(" ");
    if (splitLine[0] === "noop") {
      cycle++;
      cycleObj[cycle] = cycle * x;
    }
    if (splitLine[0] === "addx") {
      cycle++;
      cycleObj[cycle] = cycle * x;
      x += Number(splitLine[1]);
      cycle++;
      cycleObj[cycle] = cycle * x;
    }
  });
  
  console.log(cycleObj["20"] + cycleObj["60"] + cycleObj["100"] + cycleObj["140"] + cycleObj["180"] + cycleObj["220"])
}

function CRTSim(text) {
  const lines = text.split("\n").map((str) => str.trim());

  let cycleObj = { "0": 0 };
  let cycle = 1;
  let x = 1;

  lines.forEach((line) => {
    const splitLine = line.split(" ");
    if (splitLine[0] === "noop") {
      cycleObj[cycle] = x;
      cycle++;
      cycleObj[cycle] = x;
    }
    if (splitLine[0] === "addx") {
      cycleObj[cycle] = x;
      cycle++;
      cycleObj[cycle] = x;
      x += Number(splitLine[1]);
      cycle++;
      cycleObj[cycle] = x;
    }
  });

  let crt = Array(6).fill([]);
  let currentCrt = Array(40).fill(".");
  let a = 1;
  let b = 40;

  for(let i = 1; i < 7; i++){
    let relevantPixels = Object.values(cycleObj).splice(a, 40) 
    for(let j = 0; j <= 39; j+=1){
      if(Math.abs(relevantPixels[j] - j) < 2){
        currentCrt[j] = "#"
      }
    }
    crt[i-1] = currentCrt;
    a = 40 * i + 1;
    b = 40 * ( i + 1 ); 
    currentCrt = Array(40).fill(".");
  }
  return crt.map(line => line.join(""));
}


console.log(
  CRTSim(fs.readFileSync("./day10input.txt", { encoding: "utf-8" }))
);
