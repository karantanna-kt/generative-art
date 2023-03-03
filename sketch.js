let a = 0;
let b = 0;
let c = 0;
let d = 0;

let startA, startB, startC, startD;
let endA, endB, endC, endD;

let t = 0;
let tIncrement = 0.005;

function setup() {
  createCanvas(800, 800);
}

function draw() {
  background(0);

  // Align canvas in center of screen
  translate(width/2, height/2);

  // Use Perlin noise to smoothly transition between sets of values
  if (t >= 1) {
    startA = endA;
    startB = endB;
    startC = endC;
    startD = endD;
    do {
      endA = random(-6, 6);
    } while ((endA > -1.01 && endA < 1.01) || (endA > -0.4 && endA < 0.4));
    do {
      endB = random(-6, 6);
    } while ((endB > -1.01 && endB < 1.01) || (endB > -0.4 && endB < 0.4));
    do {
      endC = random(-6, 6);
    } while ((endC > -1.01 && endC < 1.01) || (endC > -0.4 && endC < 0.4));
    do {
      endD = random(-6, 6);
    } while ((endD > -1.01 && endD < 1.01) || (endD > -0.4 && endD < 0.4));
    t = 0;
  }

  a = lerp(startA, endA, t);
  b = lerp(startB, endB, t);
  c = lerp(startC, endC, t);
  d = lerp(startD, endD, t);

  noFill();
  stroke(255, 70);
  strokeWeight(1);

  let negR = -6;
  let posR = 6;

  let x0 = random(negR, posR);
  let y0 = random(negR, posR);

  deJong(a, b, c, d, x0, y0, 40000);

  t += tIncrement;
}

function deJong(a, b, c, d, x0, y0, iterations) {
  let x = x0;
  let y = y0;

  for (let i = 0; i < iterations; i++) {
    let nx = sin(a * y) - cos(b * x);
    let ny = sin(c * x) - cos(d * y);
    x = nx;
    y = ny;
    point(map(x, -3, 3, -width/2, width/2), map(y, -3, 3, -height/2, height/2));
  }
}

function keyPressed() {
  if (key === "s" || key === "S") {
    save("deJong_a" + a.toFixed(2) + "_b" + b.toFixed(2) + "_c" + c.toFixed(2) + "_d" + d.toFixed(2) + ".png");
  }
}
