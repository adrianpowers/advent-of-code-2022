let fs = require("fs");

function priorities(text) {
  const lines = text.split("\r\n");
  const splitLines = lines.map((line) => {
    const midpoint = line.length / 2;
    const firstHalf = line.slice(0, midpoint);
    const secondHalf = line.slice(midpoint, line.length);
    return [firstHalf, secondHalf];
  });
  const priorities = [];
  splitLines.forEach((line) => {
    const firstLineChars = line[0].split("");
    const secondLineChars = line[1].split("");
    let commonLetter = null;
    for (let i = 0; i < firstLineChars.length; i++) {
      if (secondLineChars.includes(firstLineChars[i])) {
        commonLetter = firstLineChars[i];
      }
    }
    let priorityCode = commonLetter.charCodeAt(0);
    if (commonLetter === commonLetter.toLowerCase()) {
      priorityCode -= 96;
    } else {
      priorityCode -= 38;
    }
    priorities.push(priorityCode);
  });
  let total = 0;
  priorities.forEach((priority) => {
    total += priority;
  });
  console.log(total);
}

function trios(text) {
  const lines = text.split("\r\n");
  let groups = [];
  const priorities = [];
  for (let i = 0; i < lines.length; i += 3) {
    let group = [];
    group.push(lines[i]);
    group.push(lines[i + 1]);
    group.push(lines[i + 2]);
    groups.push(group);
  }
  groups.forEach((group) => {
    const firstElfChars = group[0].split("");
    const secondElfChars = group[1].split("");
    const thirdElfChars = group[2].split("");
    let commonLetter = null;
    for (let i = 0; i < firstElfChars.length; i++) {
      if (
        secondElfChars.includes(firstElfChars[i]) &&
        thirdElfChars.includes(firstElfChars[i])
      ) {
        commonLetter = firstElfChars[i];
      }
    }
    let priorityCode = commonLetter.charCodeAt(0);
    if (commonLetter === commonLetter.toLowerCase()) {
      priorityCode -= 96;
    } else {
      priorityCode -= 38;
    }
    priorities.push(priorityCode);
  });
  let total = 0;
  priorities.forEach(priority => {
    total+=priority;
  })
  console.log(total);
}

console.log(trios(fs.readFileSync("./day3input.txt", { encoding: "utf-8" })));
