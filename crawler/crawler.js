const partjs = require("./particles.js");
const particles = partjs.p;

const metjs = require("./meteo.js");
const meteo = metjs.m;

const trafjs = require("./traffic.js")
const traffic = trafjs.t;

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const domain = process.env.aws;
if(!domain) {
    console.error("No url for mongoDB instance");
    process.exit();
}
const url = `mongodb://${domain}:27017/`;

function buildData(table) {
    Object.keys(table).map(k => {
            rows[k] = {...rows[k], ...table[k]};
    });
}

function processData() {
    // console.table(rows);

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        const db = client.db("airmon");

        Object.keys(rows)
        .slice(0,4) // trying only with 4 zones to begin with
        .map(k => {
            row = rows[k];

            /*try {
                // ideally:
                assert.equal(row["hour_p"], row["hour_m"])
            }catch(e) {
                console.log(e);
            }*/
            // TODO: update row with correct values (2h before) except traffic
            // let test = db.collection(k).find( { "hour_m": row["hour_m"] } );

            try {
                let doc = db
                .collection(k)
                .insertOne(row, {w: 1}, (err, r) => {
                    try {
                        assert.equal(null, err);
                        assert.equal(1, r.insertedCount);
                    }catch(e) {
                        console.error(`error in callback: ${e}`)
                    }
                });
                // console.log(doc)
            }catch(e) {
                console.log(e);
            }
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

// trying to connect to DB before doing anything
MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    client.close();
});

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
