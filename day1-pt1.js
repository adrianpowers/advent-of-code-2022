let fs = require('fs');

function calories(text) {
  const lines = text.split('\r\n\r\n')
  const elves = lines.map((elf) => {
    return elf.split('\r\n')
  })
  const totals = [];
  elves.forEach(elf => {
    let total = 0;
    elf.forEach(snack => {
      total += Number(snack);
    })
    totals.push(total)
  })
  totals.sort((a, b) => {
    return b - a;
  })
  console.log(totals[0]+totals[1]+totals[2])
}

console.log(calories(fs.readFileSync('./day1input.txt', {encoding: 'utf-8'})));