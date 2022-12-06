let fs = require("fs");

function signalFour(text) {
  const chars = text.split("")
  for(let i = 0; i < chars.length; i++){
    const charArray = chars.slice(i, i+4)
    const charSet = new Set(charArray);
    if(charSet.size === 4){ 
      return i+4;
    };
  }
}

function signalFourteen(text) {
  const chars = text.split("")
  for(let i = 0; i < chars.length; i++){
    const charArray = chars.slice(i, i+14)
    const charSet = new Set(charArray);
    if(charSet.size === 14){ 
      return i+14;
    };
  }
}
console.log(
  signalFourteen(fs.readFileSync("./day6input.txt", { encoding: "utf-8" }))
);
