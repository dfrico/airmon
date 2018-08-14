const http = require("http");
const fs = require("fs");
const parseString = require("xml2js").parseString;

function traffic(callback) {
    let options = {
        hostname: "informo.munimadrid.es",
        path: "/informo/tmadrid/pm.xml",
        method: "GET"
    };

    let refCoordinates = [], zones = {};

    fs.readFile("./csv/coordinates.csv", "utf8", (err, data) => {
        // cross-reference airmon stations with traffic stations (coords)
        if (err) throw err;
        // console.log("Loading coordinates for air monitoring stations");
        refCoordinates = data
            .split("\n")
            .map(d => {
                d = d.slice(0, -1); // sometimes unnecessary removal of \r ?
                zones[d.split(";")[0]] = [];
                return d.split(";");
            });
        console.log("Loading traffic");

        const req = http.get(options, (res) => {
            let xml = "";

            process.stdout.write("Downloading data");
            res.on("data", (d) => {
                process.stdout.write(".");
                xml += d;
            }).on("end", () => {
                process.stdout.write("\n");

                parseString(xml, function (err, result) {
                    if(err) throw err;
                    let data = result["pms"]["pm"];
                    let size = Object.keys(data).length;
                    console.log(`${size} entries.`);

                    for (var i = 0; i < size; i++) {

                        /*
                        attr: idelem, descripcion, accesoAsociado, intensidad, ocupacion,
                        carga,nivelServicio, intensidadSat, error, subarea, st_x, st_y
                        */
                        try{
                            station = data[i]
                            let zone = getNN(station["st_x"][0].replace(",","."), station["st_y"][0].replace(",","."), refCoordinates);
                            // console.log(`(${zone}) \t${station["idelem"][0]}: \t${station["intensidad"]}/${station["intensidadSat"]}`)
                            let ratio = ((Number(station["intensidad"][0])/Number(station["intensidadSat"][0]))*100).toFixed(2);
                            zones[zone].push({[data[i]["idelem"][0]]: `${ratio}%` });

                        }
                        catch(err){
                            // console.log(err)
                        }
                    }
                    let total = 0;

                    for(let z of Object.keys(zones)){
                        total += zones[z].length;
                        sum = zones[z].reduce((a,b) => {
                            val = Object.values(b)[0];
                            return a+Number(val.slice(0, val.length-1));
                        }, 0)
                        mean = (sum/zones[z].length).toFixed(2)
                        // console.log(`${z}: ${zones[z].length} values. Mean value: ${}%`);
                        zones[z] = {
                            "Traffic density (%)": Number(mean),
                            "hour_t": new Date().getHours(),
                            "date": new Date()
                        };
                    }
                    console.log(`${total} out of ${size}. ${size-total} entries filtered (due to errors in data)`);
                    callback(zones)
                });
            });
        });

        req.on("error", (e) => {
            console.error(e);
        });
        req.end();
    });
}

function getNN(x, y, refCoordinates) {
    let data = refCoordinates
        .sort((a, b) => {
            let ay = a[4], ax = a[5], by = b[4], bx = b[5];
            let a_distance = Math.sqrt(Math.pow((ax-x), 2) + Math.pow((ay-y), 2));
            let b_distance = Math.sqrt(Math.pow((bx-x), 2) + Math.pow((by-y), 2));
            if (a_distance < b_distance)
                return -1;
            if (a_distance > b_distance)
                return 1;
            return 0;
        });
    return data[0][0];
}

function getDate() {
    return `${new Intl.DateTimeFormat('en-GB').format()}-${String(date.getHours()).length == 1 ? '0'+date.getHours() : date.getHours()}:${String(date.getMinutes()).length == 1 ? '0'+date.getMinutes() : date.getMinutes()}`
}

// traffic(d => console.table(d))

exports.t = traffic;
