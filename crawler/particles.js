const https = require("https");
const http = require("http");

function processData(rows) {

    let values = Object.assign({}, zones);
    Object.keys(zones).map(k => values[k] = []);
    rows.map(r => !isNaN(r.split(";")[2]) ? values[r.split(";")[2]].push(r) : "");
    // Object.keys(zones).map(k => console.log(zones[k], ":", values[k].length));
    // zones: id-name
    // values: id-rows

    const magnitudes = {
        "1": "SO2",
        "6": "CO",
        "7": "NO",
        "8": "NO2",
        "9": "Particulas<2.5um",
        "10": "Particulas<10um",
        "12": "NOx",
        "14": "O3",
        "20": "Tolueno",
        "30": "Benceno",
        "35": "Etilbenceno",
        "37": "Metaxileno",
        "38": "Paraxileno",
        "39": "Ortoxileno",
        "42": "Hidrocarburos",
        "43": "Metano CH4",
        "44": "Hexano"
    };

    let day;

     Object.keys(values).map(k =>{
        // for each zone
        // 24h * N particles
        day = Array.from({length: 24}, e => []); // avoid Array(24).fill([])

        values[k].map((row) => {
            // for each row (1 particle) in zone data:

            let attr = row.split(";");
            attr
                .slice(8) // filtering pre-useful values
                .filter(v => !isNaN(v)) // filtering V/N columns
                .map((value, h) =>{ // 24 times
                    // traduccion id-particula (string)
                    let particula = magnitudes[attr[3]];

                    day[h].push(value);
                    console.log(`pushing particle ${particula} on hour ${h} with value ${value}. \
                        Day has length ${day.length} and hour ${h} has ${day[h].length} entries`)
                });
        });
        console.log(`Data for ${zones[k]}`);
        console.table(day);
        process.exit();
     });
}

function particles() {
    let options = {
        hostname: "datos.madrid.es",
        //port: 443,
        path: "/egob/catalogo/212531-10515086-calidad-aire-tiempo-real.csv",
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Accept-Encoding": "gzip, deflate",
            "User-Agent": "Mozilla/5.0"
        }
    };

    const req = https.request(options, (res) => {
        res.on("data", (d) => {
            process.stdout.write(d);
        });

        if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
            // The location for some (most) redirects will only contain the path
            // not the hostname, detect this and add the host to the path.
            let url = res.headers.location;
            options.path = url.split(".es")[1].replace(" ", "");
            options.hostname = url.split("/")[2];

            http.get(options, (res) => {
                let csv = "";
                res.on("data", (d) => {
                    csv += String(d);
                });
                res.on("end", function() {
                    // Processing csv data
                    let rows = csv.split("\n");

                    // TODO: dont filter by zone, separate in processData
                    processData(rows);
                });

            }).on("error", (e) => {
                console.error(e);
            });

        } else {
            console.error("Err in the request");
        }

    });

    req.on("error", (e) => {
        console.error(e);
    });
    req.end();
}

exports.particles = particles;

const zones = {
    "8": "Escuelas Aguirre",
    "4": "Plaza de España",
    "11": "Avda. Ramón y Cajal",
    "16": "Arturo Soria",
    "17": "Villaverde",
    "18": "Farolillo",
    "24": "Casa de Campo",
    "27": "Barajas Pueblo",
    "35": "Pza. del Carmen",
    "36": "Moratalaz",
    "38": "Cuatro Caminos",
    "39": "Barrio del Pilar",
    "40": "Vallecas",
    "47": "Mendez Alvaro",
    "48": "Castellana",
    "49": "Parque del Retiro",
    "50": "Plaza Castilla",
    "54": "Ensanche de Vallecas",
    "55": "Urb. Embajada",
    "56": "Pza. Fernández Ladreda",
    "57": "Sanchinarro",
    "58": "El Pardo",
    "59": "Juan Carlos I",
    "60": "Tres Olivos"
};

console.log(`${Object.keys(zones).length} zones`);

particles();

exports.p = particles;
