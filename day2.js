let fs = require('fs');

function rochambeau(text) {
  const lines = text.split('\r\n')
  // holds the counts for how many times each possible round happens
  const roundsObj = {
    'A X': 0,
    'A Y': 0,
    'A Z': 0,
    'B X': 0,
    'B Y': 0,
    'B Z': 0,
    'C X': 0,
    'C Y': 0,
    'C Z': 0,
  };
  // holds the total points
  let points = 0;
  // each possible round's point values for both part 1 and 2
  const scores = [4, 8, 3, 1, 5, 9, 7, 2, 6];
  const round2scores = [3, 4, 8, 1, 5, 9, 2, 6, 7];
  // counts the rounds
  lines.forEach(line => {
    roundsObj[line]++;
  })
  // puts those round counts into an array in the same order as the point values
  let numRounds = Object.values(roundsObj)
  // loops through each possible round and multiplies by the same round's point value
  for(let i = 0; i < numRounds.length; i++) {
    let totalScore = numRounds[i] * round2scores[i];
    points += totalScore
  }
  console.log(points)
}

console.log(rochambeau(fs.readFileSync('./day2input.txt', {encoding: 'utf-8'})));