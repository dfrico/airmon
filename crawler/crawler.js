const partjs = require("./particles.js");
const particles = partjs.p;

const metjs = require("./meteo.js");
const meteo = metjs.m;

const trafjs = require("./traffic.js")
const traffic = trafjs.t;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const domain = "ec2-54-77-153-131.eu-west-1.compute.amazonaws.com"
const url = `mongodb://${domain}:27017/?retryWrites=true`;

function buildData(table) {
    Object.keys(table).map(k => {
            rows[k] = {...rows[k], ...table[k]};
    });
}

function processData() {
    console.table(rows);

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        const db = client.db("airmon");

        Object.keys(rows).map((k, i) => {
            row = rows[k];
            // console.log(`zone: ${k}`);

            // k = "test";
            console.log(k, i)
            try {
                // ideally:
                // assert.equal(row["hour_p"], row["hour_m"])
            }catch(e) {
                console.log(e);
            }

            if(i>4) {
                console.warn("\nboop, enough")
                client.close();
                process.exit();
            }
            // TODO: update row with correct values (2h before) except traffic
            /* db.collection(k).find( { "hour_m": 21 } ); */

            db.collection(k)
            .insertOne(row)
            .then(function(result) {
                console.log("all good");
                console.log(result);
            })
        });

        client.close();
    });
}

let rows = { // 24 tables, each with 1 (new) row
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

console.log("Loading particles data")
particles(data_p => {
    buildData(data_p);
    console.log("Loading meteo data")
    meteo(data_m => {
        buildData(data_m);
        console.log("Loading traffic data")
        traffic(data_t => {
                buildData(data_t);
                processData();
        })
    });
});
