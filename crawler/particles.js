const http = require("http");

function processData(rows, callback) {

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

    let day, hour;
    let response = {};

    Object.keys(values).map(k =>{
        // for each zone
        // 24h * N particles
        day = Array.from({length: 24}, () => []); // avoid Array(24).fill([])

        values[k].map((row) => {
            // for each row (1 particle) in zone data:

            let attr = row.split(";");
            attr
                .slice(8) // filtering pre-useful values
                .filter(v => !isNaN(v)) // filtering V/N columns
                .map((value, h) =>{ // 24 times
                    // traduccion id-particula (string)
                    let particula = magnitudes[attr[3]];

                    // day[h].push(value);
                    day[h][particula] = Number(value);
                    // console.log(`pushing particle ${particula} on hour ${h} with value ${value}. \
                    //     Day has length ${day.length} and hour ${h} has ${day[h].length} entries`)
                });
        });

        hour = new Date().getHours()-1;
        if(day[hour]["NO"]!==undefined && day[hour]["NO"]===0 && day[hour]["NO2"]!==undefined
            && day[hour]["NO2"]===0 && day[hour]["NOx"]!==undefined && day[hour]["NOx"]===0) {
            // console.log("Fixing...");
            hour = new Date().getHours()-2;
        }

        let {ica, ica_p} = getIndex(day[hour]);
        // console.log(`zona ${k}, ICA ${index}`);

        response[k] = {...day[hour], ICA: Number(ica.toFixed(2)), ica_p, date_p: getDate(hour)};
    });
    console.log(`Particles data from ${hour}h`);
    // console.log(response)
    if (callback) callback(response);
    else console.log(response);
}

function getIndex(obj) {
    /* reference for Common Air Quality Index (CAQI)/ICA:
    * https://en.wikipedia.org/wiki/Air_quality_index#Europe
    */

    // filtering valid values
    let filtered = {}, normalized = {};
    // {particle: max possible value}
    const valid = {"NO2": 400, "O3": 240, "Particulas<10um": 180, "Particulas<2.5um": 110};
    Object.keys(obj).map(k=>{
        if(Object.keys(valid).indexOf(k)>=0) filtered[k] = obj[k];
    });

    Object.keys(filtered).map(k => {
        normalized[k] = filtered[k]/valid[k];// valid value / max value
    });

    const maxnorm = Math.max(...Object.values(normalized));
    const particle = Object.keys(filtered).filter(k=>normalized[k]===maxnorm)[0];
    const maxval = filtered[particle];

    switch (particle) {
        case "NO2":
        case "NOx":
                if (maxval>0 && maxval<50)
                    return { ica: (maxval*25)/50, ica_p: particle};
                else if (maxval>=50 && maxval<100)
                    return { ica: (maxval*50)/100, ica_p: particle};
                else if (maxval>=100 && maxval<200)
                    return { ica: (maxval*75)/200, ica_p: particle};
                else if (maxval>=200 && maxval<400)
                    return { ica: (maxval*100)/400, ica_p: particle};
                else if (maxval>=400)
                    return { ica: 100, ica_p: particle};
                else
                    return { ica: -1, ica_p: particle};
        case "O3":
                if (maxval>0 && maxval<60)
                    return { ica: (maxval*25)/60, ica_p: particle};
                else if (maxval>=60 && maxval<120)
                    return { ica: (maxval*50)/120, ica_p: particle};
                else if (maxval>=120 && maxval<180)
                    return { ica: (maxval*75)/180, ica_p: particle};
                else if (maxval>=180 && maxval<240)
                    return { ica: (maxval*100)/240, ica_p: particle};
                else if (maxval>=240)
                    return { ica: 100, ica_p: particle};
                else
                    return { ica: -1, ica_p: particle};
        case "Particulas<10um":
                if (maxval>0 && maxval<50)
                    return { ica: maxval, ica_p: particle};
                else if (maxval>=50 && maxval<90)
                    return { ica: (maxval*75)/90, ica_p: particle};
                else if (maxval>=90 && maxval<180)
                    return { ica: (maxval*100)/180, ica_p: particle};
                else if (maxval>=180)
                    return { ica: 100, ica_p: particle};
                else
                    return { ica: -1, ica_p: particle};
        case "Particulas<2.5um":
                if (maxval>0 && maxval<15)
                    return { ica: (maxval*25)/15, ica_p: particle};
                else if (maxval>=15 && maxval<30)
                    return { ica: (maxval*50)/30, ica_p: particle};
                else if (maxval>=30 && maxval<55)
                    return { ica: (maxval*75)/55, ica_p: particle};
                else if (maxval>=55 && maxval<110)
                    return { ica: (maxval*100)/110, ica_p: particle};
                else if (maxval>=110)
                    return { ica: 100, ica_p: particle};
                else
                    return { ica: -1, ica_p: particle};
        default:
            console.error("Err in ICA val:", particle, maxval);
            break;
    }
    return { ica: -1, ica_p: particle};
}

function particles(callback) {
    let options = {
        hostname: "www.mambiente.munimadrid.es",
        //port: 443,
        path: "/opendata/horario.csv",
        method: "GET",
        headers: {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "User-Agent": "Mozilla/5.0"
        }
    };

    const req = http.request(options, (res) => {
        let csv = "";
        res.on("data", (d) => {
            csv += String(d);
        });
        res.on("end", function() {
            // Processing csv data
            let rows = csv.split("\n");

            // TODO: dont filter by zone, separate in processData
            processData(rows, callback);
        });
    });

    req.on("error", (e) => {
        console.error(`Req error. ${e}`);
    });
    req.end();
}

function getDate(hour) {
    // meteo date format
    // 2018-08-16T08:00:00
    let d = new Date();
    return `${d.getUTCFullYear()}-${String(d.getMonth()).length===1 ? "0"+(d.getMonth()+1) : d.getMonth()+1}-${d.getDate()}T${String(hour).length===1 ? "0"+hour : hour}:00:00`;
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

// console.log(`${Object.keys(zones).length} zones`);
if(process.argv[1].indexOf("particles.js") != -1 )
    particles(data => console.table(data));

exports.p = particles;
