let fs = require("fs");

const monkeys = [
  {
    "Starting Items": [57],
    Operator: "*",
    Scale: 13,
    Test: 11,
    true: 3,
    false: 2,
  },
  {
    "Starting Items": [58, 93, 88, 81, 72, 73, 65],
    Operator: "+",
    Scale: 2,
    Test: 7,
    true: 6,
    false: 7,
  },
  {
    "Starting Items": [65, 95],
    Operator: "+",
    Scale: 6,
    Test: 13,
    true: 3,
    false: 5,
  },
  {
    "Starting Items": [58, 80, 81, 83],
    Operator: "*",
    Scale: "old",
    Test: 5,
    true: 4,
    false: 5,
  },
  {
    "Starting Items": [58, 89, 90, 96, 55],
    Operator: "+",
    Scale: 3,
    Test: 3,
    true: 1,
    false: 7,
  },
  {
    "Starting Items": [66, 73, 87, 58, 62, 67],
    Operator: "*",
    Scale: 7,
    Test: 17,
    true: 4,
    false: 1,
  },
  {
    "Starting Items": [85, 55, 89],
    Operator: "+",
    Scale: 4,
    Test: 2,
    true: 2,
    false: 0,
  },
  {
    "Starting Items": [73, 80, 54, 94, 90, 52, 69, 58],
    Operator: "+",
    Scale: 7,
    Test: 19,
    true: 6,
    false: 0,
  },
];

let monkeyInspectCount = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
};

function oneRound() {
  monkeys.forEach((monkey) => {
    let startingLength = monkey["Starting Items"].length;
    for (let j = 0; j < startingLength; j++) {
      // INSPECTION AND OPERATION
      let item = monkey["Starting Items"].shift();
      let assessed = item; 

      if (monkey["Operator"] === "*") {
        if (monkey["Scale"] === "old") {
          assessed = item * item;
        } else {
          assessed = item * monkey["Scale"];
        }
      } else if (monkey["Operator"] === "+") {
        if (monkey["Scale"] === "old") {
          assessed = item + item;
        } else {
          assessed = item + monkey["Scale"];
        }
      }

      monkeyInspectCount[monkeys.indexOf(monkey)]++;
      
      assessed = assessed % 19399380;

      // TEST

      if (assessed % monkey["Test"] === 0) {
        monkeys[monkey[true]]["Starting Items"].push(assessed);
      } else {
        monkeys[monkey[false]]["Starting Items"].push(assessed);
      }
    }
  });
}

function keepAway(rounds){
  for(let i = 0; i < rounds; i++){
    oneRound();
  }

  const inspects = Object.values(monkeyInspectCount).sort((a, b) => b - a);
  return inspects[0] * inspects[1];
}

function main(text) {
  const lines = text.split("\n").map((str) => str.trim());

  return keepAway(10000);
}

console.log(main(fs.readFileSync("./day11input.txt", { encoding: "utf-8" })));
