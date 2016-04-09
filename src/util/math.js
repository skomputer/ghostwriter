export function simpleTimeWave(time, slowness, max, min) {
  return Math.round(Math.sin(time / slowness) * max/2 + max/2) + min;
}

export function complexTimeWave(time, slowness, max, min) {
  // add three simple time waves with different slownesses
  slowness = slowness * 7;

  let three = simpleTimeWave(time, slowness/3, max/3, 0);
  let five = simpleTimeWave(time, slowness/5, max/3, 0);
  let seven = simpleTimeWave(time, slowness/7, max/3, 0);

  return three + five + seven + min;
}
