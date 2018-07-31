const https = require("https");
const fs = require("fs");

function getData(id, callback) {
    let options = {
        hostname: "opendata.aemet.es",
        path: `/opendata/api/observacion/convencional/datos/estacion/${id}`,
        method: "GET",
        headers: {
            "api_key":  process.env.aemet,
            "Accept": "application/json"
        }
    };

    let req = https.get(options, (res) => {
        let buffer = "";

        res.on("data", (d) => {
            buffer += d;
        }).on("end", () => {
            const metadata = JSON.parse(buffer);

            if(metadata.estado==200){
                req = https.get(metadata.datos, (res) => {
                    buffer = "";

                    res.on("data", (d) => {
                        buffer += d;
                    }).on("end", () => {
                        const body = JSON.parse(buffer);

                        //console.log(estaciones.filter(e => e.id==id)[0].nombre, metadata.descripcion)
                        callback(parseData(body))
                    });
                });
            }
            else{
                callback([])
                //console.log(`Err getting data from ${estaciones.filter(e => e.id==id)[0].nombre} (${metadata["estado"]})`);
            }
        });
    });

    req.on("error", (e) => {
        console.error(e);
    });
    req.end();
}

function parseData(data) {

    //const date = parse(d["fint"]).strftime("%d-%m %H:%M")

    const txts = [
        " temp: VALUE°C,",
        " presión: VALUE (hPa),",
        " humedad: VALUE (%),",
        " viento: VALUE (m/s),",
        " precipitación: VALUE (l/m2)"
    ]
    const keys = [
        //"ubi",
        "ta",
        "pres",
        "hr",
        "vv",
        "prec"
    ]

    let day = []

    for(d of data) {
        let {verbose, values} = parseKeys(keys, txts, d)
        day.push([d.fint].concat(values))

        // TODO: pasar de array con valores a dict usable por console.log ¿?
        // console.log(d.fint, values)
    }
    // console.log()
    return day;

}

function parseKeys(keys, txts, obj) {
    let verbose = "", values  = [];

    keys.map((key, i) => {
        value = obj[key] ? obj[key] : 0;
        verbose += txts[i].replace("VALUE", String(value))
        values.push(value)

    });
    return {verbose, values}
}

function processData(alldata, estaciones, callback) {
    let i = 0;
    let response = {}

    const keys = [
        //"ubi",
        "temp (°C)",
        "presión (hPa)",
        "humedad (%)",
        "viento (m/s)",
        "precipitación (l/m2)"
    ]

    for(obj of alldata){
        // foreach station
        let {id, data} = obj;
        if(data.length==0) continue;
        data = data
            .map(d => d.splice(1))
            .map(d => {
                i = 0;
                return d.reduce((obj, attr) => {
                    obj[keys[i]] = attr
                    i++;
                    return obj
                }, {})
            });

        // console.log(estaciones.filter(e => e.id==id)[0].nombre, ":\n", data, '\n')
        estaciones = locations.filter(l => l[6]==id)
        estaciones.map(e => response[e[0]] = data[data.length-1]);
    }
    callback(response)
}

function NN(estaciones) {
    for (let zona of locations) {
        // zona: 35;Pza. del Carmen;40.41920833333333;-3.7031722222222223;4474524.28;440345.85;3195;MADRID, RETIRO
        nearest = getNN(zona[2], zona[3], estaciones)
        console.log(`${zona.join(";")};${nearest.id};${nearest.nombre}`)
    }
}

function getNN(x, y, estaciones) {
    x = Number(x), y = Number(y)
    let data = estaciones
        .sort((a, b) => {
            let ay = a.lon, ax = a.lat, by = b.lon, bx = b.lat;
            let a_distance = Math.sqrt(Math.pow((ax-x), 2) + Math.pow((ay-y), 2));
            let b_distance = Math.sqrt(Math.pow((bx-x), 2) + Math.pow((by-y), 2));
            // console.log(a_distance, b_distance, x, y, a.lat, a.lon, b.lat, b.lon)
            if (a_distance < b_distance)
                return -1;
            if (a_distance > b_distance)
                return 1;
            return 0;
        });
    return data[0];
}

function meteo(callback) {
    const estaciones = [
        {
            "nombre": "MADRID AEROPUERTO",
            "id": "3129",
            "lat": 40.466667,
            "lon": -3.555556
        },{
            "nombre": "MADRID, CIUDAD UNIVERSITARIA",
            "id": "3194U",
            "lat": 40.451667,
            "lon": -3.724167
        },{
            "nombre": "MADRID, CUATRO VIENTOS",
            "id": "3196",
            "lat": 40.375556,
            "lon": -3.786111
        },{
            "nombre": "MADRID, RETIRO",
            "id": "3195",
            "lat": 40.411944,
            "lon": -3.678056
        }
    ];

    let responses = [];
    let completed_requests = 0;


    fs.readFile("./csv/coordinates.csv", "utf8", (err, data) => {
        if (err) throw err;
        console.log("Loading locations");
        data
            .split("\n")
            .map(d => {
                // d = d.slice(0, -1); //unnecessary removal of \r ?
                locations.push(d.split(";"));
            });
        
        for (let e of estaciones) {
            let {id} = e;

            getData(id, (data) => {
                responses.push({id, data});
                completed_requests++;

                if(completed_requests == estaciones.length){
                    processData(responses, estaciones, callback);
                }
            });
        }
    });
}

let locations = [];

// meteo();

exports.m = meteo;
