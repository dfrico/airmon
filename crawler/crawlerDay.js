const partjs = require("./particles.js");
const particles = partjs.p;

const metjs = require("./meteo.js");
const meteo = metjs.m;

function buildData(table) {

}

particles();
meteo(buildData);

// mongoDB section
