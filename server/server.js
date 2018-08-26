const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const url = "mongodb://localhost:27017/";

function getDate(hour) {
    // date format
    // 2018-08-16T08:00:00
    let d = new Date();
    return `${d.getUTCFullYear()}-${String(d.getMonth()).length===1 ? "0"+(d.getMonth()+1) : d.getMonth()+1}-${d.getDate()}T${String(hour).length===1 ? "0"+hour : hour}:00:00`;
}

MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    assert.equal(null, err);
    const db = client.db("airmon");

    app.use(cors())

    // routes go here
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`)
    });

    /*
    *   All data (up to a date) for a station
    */

    app.get("/rest/api/station/:id", (req, res) => {
        console.log(req.params);
        let k = "test";

        db.collection(k).find().toArray((err, results) => {
            let data = [];
            results.map(r => {
                console.log(r.date_t)
                let {_id, ...other} = r;
                // if(other) console.table(other);
                data.push(other)
            });
            res.json({data: data});
        });
    });

    /*
    *   Last data for all stations (map)
    */

    app.get("/rest/api/status/", (req, res) => {
        let date, d = new Date();
        if(d.getMinutes()<40)
            date = getDate(d.getHours()-2);
        else date = getDate(d.getHours()-1);

        console.log(`Request on '/rest/api/status/'. Data from ${date}`);

        let keys = ["4", "8", "11", "16", "17", "18", "24", "27", "35", "36", "38", "39", "40", "47", "48", "49", "50","54", "55", "56", "57", "58", "59","60"];
        let data = {}

        keys.map(k => {
            db.collection(k).find({"date_t": { $eq: date}}).toArray((err, results) => {
                results.map(r => {
                    data[k] = {ica: r.ICA, part: r.ica_p};
                });

                if(Object.keys(data).length==keys.length) {
                    res.json(data);
                }
            });
            // res.json({patata: 1})
        });
    });
});
