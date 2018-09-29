const a = [], b = [], m = 0;

function s(i) {
  let j = 0;
  while (++j < 17) {
    if (!a[j]) {
      a[b[i] = j] = 1;
      switch (i) {
        case 1:
        case 2:
        case 3:
        case 5:
        case 6:
        case 7:
        case 9:
        case 10:
          s(i + 1);
          break;
        case 11:
          if (b[6] + b[7] + b[10] + b[11] === 34) s(12);
          break;
        case 4:
        case 8:
        case 12:
          if (b[i - 3] + b[i - 2] + b[i - 1] + b[i] === 34) s(i + 1);
          break;
        case 13:
          if (b[1] + b[5] + b[9] + b[13] === 34 && b[4] + b[7] + b[10] + b[13] === 34) s(14);
          break;
        case 14:
        case 15:
          if (b[i - 12] + b[i - 8] + b[i - 4] + b[i] === 34) s(i + 1);
          break;
        case 16:
          console.log(b);
      }
      a[j] = 0;
    }
  }
}
s(1);

