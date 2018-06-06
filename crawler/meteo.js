const https = require("https");

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
        // console.log(d.fint, verbose)
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

function processData(alldata, estaciones) {
    for(obj of alldata){
        // foreach station
        let {id, data} = obj;
        console.log(estaciones.filter(e => e.id==id)[0].nombre, ":\n", data, '\n')
    }
}

function meteo() {
    const estaciones = [
        {"nombre": "MADRID AEROPUERTO", "id": "3129"},
        {"nombre": "MADRID, CIUDAD UNIVERSITARIA", "id": "3194U"},
        {"nombre": "MADRID, CUATRO VIENTOS", "id": "3196"},
        {"nombre": "MADRID, RETIRO", "id": "3195"}
    ]

    let responses = [];
    let completed_requests = 0;

    for (let e of estaciones) {
        let {id} = e;

        getData(id, (data) => {
            responses.push({id, data});
            completed_requests++;

            if(completed_requests == estaciones.length){
                processData(responses, estaciones);
            }
        });
    }
}

meteo();