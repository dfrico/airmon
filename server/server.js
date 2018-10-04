/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "get|_" }] */
const express = require('express');
const { MongoClient } = require('mongodb');
const assert = require('assert');
const cors = require('cors');

const fs = require('fs');
const http = require('http');
const https = require('https');

const app = express();
const httpport = process.env.PORT || 3000;
const httpsport = 8443;


const url = 'mongodb://localhost:27017/';

function getDate(hour) {
    // date format
    // 2018-08-16T08:00:00
    const d = new Date();
    if (hour < 0) {
        return `${d.getUTCFullYear()}-${String(d.getMonth() + 1).length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${String(d.getDate() - 1).length === 1 ? `0${d.getDate() - 1}` : d.getDate() - 1}T${24 + hour}:00:00`;
    }
    return `${d.getUTCFullYear()}-${String(d.getMonth() + 1).length === 1 ? `0${d.getMonth() + 1}` : d.getMonth() + 1}-${String(d.getDate()).length === 1 ? `0${d.getDate()}` : d.getDate()}T${String(hour).length === 1 ? `0${hour}` : hour}:00:00`;
}

function getWeather(callback) {
    const id = '3117735'; // Madrid, ES
    const token = '';

    const options = {
        hostname: 'api.openweathermap.org',
        // port: 443,
        path: `/data/2.5/weather?id=${id}&units=metric&APPID=${token}`,
        method: 'GET',
        headers: {
            Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'User-Agent': 'Mozilla/5.0',
        },
    };

    const req = http.request(options, (res) => {
        let chunk = '';
        res.on('data', (d) => {
            chunk += String(d);
        });
        res.on('end', () => {
            const data = JSON.parse(chunk);
            const { weather, main, wind } = data;
            const result = {
                weather: weather[0].main,
                weather_desc: weather[0].description,
                temp: main.temp,
                pressure: main.pressure,
                humidity: main.humidity,
                wind: wind.speed,
            };
            // console.table(result);
            callback(result);
        });
    });

    req.on('error', (e) => {
        console.error(`Req error. ${e}`);
    });
    req.end();
}

MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
    assert.equal(null, error);
    const db = client.db('airmon');

    app.use(cors());
    app.use(express.static('public'));

    const privateKey = fs.readFileSync(process.env.sslkey, 'utf8');
    const certificate = fs.readFileSync(process.env.sslcert, 'utf8');
    const credentials = { key: privateKey, cert: certificate };

    // your express configuration here
    app.listen(httpport, () => {
        console.log(`http server listening on http://localhost:${httpport}`);
    });

    const httpsServer = https.createServer(credentials, app);
    httpsServer.listen(httpsport, () => {
        console.log(`https server listening on http://localhost:${httpsport}`);
    });

    /*
    *   All data (up to a date) for a station
    */

    app.get('/rest/api/station/:id', (req, res) => {
        const { id } = req.params;
        const { time } = req.query;

        console.log(`Request on '/rest/api/station/${id}' on ${new Date()}. Time: ${time}`);
        if (id) {
            db.collection(id).find().toArray((err, results) => {
                let data = [];
                results.map((r) => {
                    const { _id, ...other } = r;
                    data.push(other);
                    return r;
                });
                switch (time) {
                case '24h':
                    data = data.slice(data.length - 24);
                    console.log(`${data.length} entries in response`);
                    break;
                case '7d':
                    data = data.slice(data.length - 168);
                    console.log(`${data.length} entries in response`);
                    break;
                default:
                    console.log('No time given:', req.params);
                    break;
                }
                res.json({ data });
            });
        } else {
            console.error('No id given:', req.params);
        }
    });

    /*
    *   Last data for all stations (map)
    */

    app.get('/rest/api/status/', (req, res) => {
        let date;
        const d = new Date();
        if (d.getMinutes() < 40) {
            date = getDate(d.getHours() - 2);
        } else date = getDate(d.getHours() - 1);

        console.log(`Request on '/rest/api/status/' on ${new Date()}. Data from ${date}`);
        const keys = ['4', '8', '11', '16', '17', '18', '24', '27', '35', '36', '38', '39', '40', '47', '48', '49', '50', '54', '55', '56', '57', '58', '59', '60'];
        const data = {};

        keys.map((k) => {
            if (k === '4') {
                db.collection(k).find().toArray((err, result) => {
                    if (err) console.error(err);
                    const results = result.filter(r => r.ICA !== undefined);

                    const r = results[results.length - 1];
                    console.log(r);
                    data[k] = {
                        ica: r.ICA,
                        part: r.ica_p,
                        traffic: r['Traffic density (%)'],
                    };
                    // console.log(k, r.date_t, data[k].ica);

                    if (Object.keys(data).length === keys.length) {
                        res.json(data);
                    }
                });
            } else {
                db.collection(k).find().toArray((err, result) => {
                    if (err) console.error(err);
                    // console.log(date, results);
                    const results_ICA = result.filter(r => r.ICA !== undefined);
                    const r_ICA = results_ICA[results_ICA.length - 1];
                    const results_meteo = result.filter(r => r.date_m !== undefined);
                    const r_meteo = results_meteo[results_meteo.length - 1];
                    const r = {...r_ICA, ...r_meteo};

                    try {
                        console.log(Object.keys(r));
                        data[k] = {
                            ica: r.ICA,
                            part: r.ica_p,
                            traffic: r['Traffic density (%)'],
                            humedad: r['humedad (%)'],
                            temp: r['temp (°C)'],
                        };
                        console.log(k, r[0].date_t, data[k].ica);
                    } catch (exception) {
                        console.log(exception);
                    }

                    if (Object.keys(data).length === keys.length) {
                        res.json(data);
                    }
                });
            }
            return k;
        });
    });
});

module.exports = app;
