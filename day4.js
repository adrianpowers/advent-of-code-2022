let fs = require("fs");

function fullyContains(text) {
  const lines = text.split("\r\n");
  const splitLines = lines.map(line => line.split(","))
  let total = 0;
  splitLines.forEach(range => {
    let range1 = range[0].split("-").map(number => parseInt(number))
    let range2 = range[1].split("-").map(number => parseInt(number))
    // PART ONE LOGIC
    if(range1[0] >= range2[0] && range1[1] <= range2[1]){
      total++;
    } else if(range1[0] <= range2[0] && range1[1] >= range2[1]){
      total++;
    // PART TWO LOGIC
    } else if(range1[0] >= range2[0] && range1[0] <= range2[1]){
      total++;
    } else if(range2[0] >= range1[0] && range2[0] <= range1[1]){
      total++;
    }
  })
  console.log(total)
}

console.log(fullyContains(fs.readFileSync("./day4input.txt", { encoding: "utf-8" })));
