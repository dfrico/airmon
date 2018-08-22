const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const url = "mongodb://localhost:27017/";

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

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
        console.log(`http://localhost:${port}`)
    });

    app.get("/rest/api/station/:id", (req, res) => {
        console.log(req.params);
        let k = "test";
        let date = getDate(new Date().getHours()-2);
        // db.collection(k).find({"date_t": { $eq: date}}).toArray((err, results) => {
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
        // res.send("Hello, world!")
    });
});