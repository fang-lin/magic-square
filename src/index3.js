const log = require('single-line-log').stdout;
const { range } = require('lodash');

const order = 4;

function xSum(path) {
  return path.slice(path.length - order, path.length).reduce((a, b) => a + b, 0);
}

function ySum(path) {
  let sum = 0;
  for (let i = path.length - 1; i >= 0; i -= order) {
    sum += path[i];
  }
  return sum;
}

function uSum(path) {
  let sum = 0;
  for (let i = path.length - 1; i >= order - 1; i -= (order - 1)) {
    sum += path[i];
  }
  return sum;
}

function dSum(path) {
  let sum = 0;
  for (let i = path.length - 1; i >= 0; i -= (order + 1)) {
    sum += path[i];
  }
  return sum;
}

function magicSquares(order) {

  const sequence = range(1, Math.pow(order, 2) + 1) || [];
  const magicSum = (sequence[0] + sequence[sequence.length - 1]) * sequence.length / 2 / order;

  const result = [];

  function next(path, tail) {
    tail.map((node, index) => {
      const newPath = path.concat();
      newPath.push(node);
      const newTail = tail.concat();
      newTail.splice(index, 1);

      if (newPath.length % order === 0 && newPath.length > 0 && newPath.length !== sequence.length) {
        if (xSum(newPath) === magicSum) {
          next(newPath, newTail);
        }
      } else if (newPath.length === sequence.length - order + 1) {
        if (uSum(newPath) === magicSum && ySum(newPath) === magicSum) {
          next(newPath, newTail);
        }
      } else if (newPath.length > sequence.length - order + 1 && newPath.length !== sequence.length) {
        if (ySum(newPath) === magicSum) {
          next(newPath, newTail);
        }
      } else if (newPath.length === sequence.length) {
        if (dSum(newPath) === magicSum && xSum(newPath) === magicSum && ySum(newPath) === magicSum) {
          printSquare(pathToSquare(order, newPath));
        }
      } else {
        next(newPath, newTail);
      }
    });
  }

  next([], sequence);
  return result;
}

function pathToSquare(order, path) {
  const square = [];
  for (let i = 0; i < order; i++) {
    square.push(path.slice(i * order, (i + 1) * order));
  }
  return square;
}


function printSquare(square) {
  const order = square.length;
  console.log('-----------------------------------');
  square.map(row => {
    console.log(row.map(num => num > 9 ? `${num}` : ` ${num}`) .join('  '));
  });
  console.log('-----------------------------------');
}

const result = magicSquares(order);

