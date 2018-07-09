const partjs = require("./particles.js");
const particles = partjs.p;

const metjs = require("./meteo.js");
const meteo = metjs.m;

particles();
// TODO: change meteo output to console.table on verbose output
meteo();

// mongoDB section



