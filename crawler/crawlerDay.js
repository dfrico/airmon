const partjs = require("./particles.js");
const particles = partjs.p;

const metjs = require("./meteo.js");
const meteo = metjs.m;

function buildData(table) {
    Object.keys(table).map(k => {
        db[k].push(table[k])
    });

}

function processData() {
    Object.keys(db).map(k => console.log(db[k]));
}

let db = { // 24 tables, each with 1 (new) row 
    "8":  [],
    "4":  [],
    "11": [],
    "16": [],
    "17": [],
    "18": [],
    "24": [],
    "27": [],
    "35": [],
    "36": [],
    "38": [],
    "39": [],
    "40": [],
    "47": [],
    "48": [],
    "49": [],
    "50": [],
    "54": [],
    "55": [],
    "56": [],
    "57": [],
    "58": [],
    "59": [],
    "60": []
};

particles(data_p => {
	buildData(data_p);
	meteo(data_m =>{
		buildData(data_m)
		processData()
	});
});
