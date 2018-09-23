const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const cron = require("node-cron");

const partjs = require("./particles.js");
const metjs = require("./meteo.js");
const trafjs = require("./traffic.js");

const particles = partjs.p;
const meteo = metjs.m;
const traffic = trafjs.t;

const domain = process.env.aws;
if(!domain) {
    console.error("No url for mongoDB instance");
    process.exit();
}
const url = `mongodb://${domain}:27017/`;

function buildData(table, rows, type) {
    Object.keys(table).map(k => {
        let obj = {};
        obj[type] = table[k];
        rows[k] = {...rows[k], ...obj};
    });
}

function printData(data) {
    let printable = {};
    Object.keys(data).map(k => {
        let {particles, meteo, traffic} = data[k];
        printable[k] = {...particles, ...meteo, ...traffic};
    });
    console.table(printable);
}

function processData(rows, mode) {
    printData(rows);

    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        assert.equal(null, err);
        const db = client.db("airmon");

        Object.keys(rows)
            .map(k => {
                let {particles, meteo, traffic} = rows[k];
                if(mode==="test") k="test";
                // note: particles & meteo hours may be 1-2h delayed.
                // hour_t is correct ("current" hour and search key)

                // Updating particles data
                // console.log(`Updating particles data from ${particles.date_p}`);
                try{
                    db
                        .collection(k)
                        .update(
                            {"date_t": { $eq: particles.date_p }},
                            { $set: particles })
                        .then(r => console.log(`Particles ${particles.date_p}:`, r.result))
                        .catch(e => console.error(e));
                } catch(e) {
                    console.error(e);
                }

                // Updating meteo data
                // console.log(`Updating meteo data from ${meteo.date_m}`);
                try{
                    db
                        .collection(k)
                        .update(
                            {"date_t": { $eq: meteo.date_m }},
                            { $set: meteo })
                        .then(r => console.log(`Meteo ${meteo.date_m}:`, r.result))
                        .catch(e => console.error(e));
                } catch(e) {
                    console.error(e);
                }

                // Inserting new row (with traffic)
                // console.log(`Inserting traffic data from ${traffic.date_t}`);
                try {
                    db
                        .collection(k)
                        .insertOne(traffic, {w: 1}, (err, r) => {
                            try {
                                assert.equal(null, err);
                                assert.equal(1, r.insertedCount);
                                // console.log(`Result: ${r.result}`);
                            }catch(e) {
                                console.error(`error in callback: ${e}`);
                            }
                        });
                }catch(e) {
                    console.error(e);
                }
            });
        client.close();
    });
}

function crawler(mode) {
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

    // console.log("Loading particles data");
    console.log();
    particles(data_p => {
        buildData(data_p, rows, "particles");
        // console.log("Loading meteo data");
        meteo(data_m => {
            buildData(data_m, rows, "meteo");
            // console.log("Loading traffic data");
            traffic(data_t => {
                buildData(data_t, rows, "traffic");
                processData(rows, mode);
            });
        });
    });
}

function schedule() {
    let task = cron.schedule("35 * * * *", function() { // 1h delay
        crawler("prod");
    }, false);

    task.start();
}

let options = {
    test: false
};

process.argv.map(arg => {
    var keyValue = arg.split("=");
    var key = keyValue[0];

    if (key === "--test" || key === "--t" || key==="test") {
        options.test = true;
    }
});

if(options.test){
    crawler("test");
} else {
    schedule();
}
