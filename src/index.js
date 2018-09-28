const log = require('single-line-log').stdout;

const sequence = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const order = Math.pow(sequence.length, .5);
const total = sequence.reduce((a, b) => a * b, 1);

function magicSquares(order, sequence) {
  const allMagicSquares = [];
  let count = 0;
  let lastNow;

  let remainingTime = 0;
  const threshold = 10000;

  function next(path, tail) {
    if (tail.length) {
      tail.map((node, index) => {
        const newPath = path.concat();
        newPath.push(node);
        const newTail = tail.concat();
        newTail.splice(index, 1);
        next(newPath, newTail);
      });
    } else {
      count++;
      const square = pathToSquare(order, path);
      if (isMagicSquare(square)) {
        allMagicSquares.push(square);
      }

      if (count % threshold === 0) {
        const now = Date.now();
        const duration = now - lastNow;
        remainingTime = Math.round(duration * ((total - count) / threshold) / 1000);
        lastNow = now;
      }

      log(`Progress:${count}/${total}(${(count / total * 100) | 0}%); Remaining time:${remainingTime} seconds`);
    }
  }

  next([], sequence);
  return allMagicSquares;
}


function pathToSquare(order, path) {
  const square = [];
  for (let i = 0; i < order; i++) {
    square.push(path.slice(i * order, (i + 1) * order));
  }
  return square;
}

function isMagicSquare(square) {
  const order = square.length;
  let sum;
  let lashSum = 0;
  let backlashSum = 0;

  for (let i = 0; i < order; i++) {
    let rowSum = 0;
    let colSum = 0;
    for (let j = 0; j < order; j++) {
      rowSum += square[i][j];
      colSum += square[j][i];
      if (i === j) {
        backlashSum += square[i][j];
      }
      if (i + j === order - 1) {
        lashSum += square[i][j];
      }
    }
    if (rowSum !== colSum) {
      return false;
    }
    if (typeof sum === 'number' && sum !== rowSum) {
      return false;
    } else {
      sum = rowSum;
    }
  }

  return sum === lashSum && sum === backlashSum;
}

function printSquare(square) {
  const order = square.length;
  console.log('-----------------------------------');
  square.map(row => {
    console.log(row.join(','));
  });
  console.log('-----------------------------------');
}

const allMagicSquares = magicSquares(order, sequence);
console.log('');
allMagicSquares.map(printSquare);



