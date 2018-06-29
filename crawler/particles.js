const https = require("https");
const http = require("http");

function processData(rows, station) {

    let filtered = rows.filter(r => r.split(";")[2] == station);

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

    let day = [];
    while(day.length<24){
        day.push({});
    }

    filtered.map((row) => {

        let attr = row.split(";");
        attr
            .slice(8)
            .filter(v => !isNaN(v))
            .map((value, j) =>{
                // traduccion id-particula (string)
                let particula = magnitudes[attr[3]];
                day[j][particula] = value;
            });
    });

    console.log(`Data for ${zones[station]}`);
    console.table(day);
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
                    for(let z of Object.keys(zones).splice(0,4)){
                        processData(rows, z);
                    }
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
