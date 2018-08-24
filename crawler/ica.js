const request = require("request");
const cheerio = require("cheerio");

/*
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return 
}
*/

function ica(callback) {
    request("https://www.eltiempo.es/calidad-aire/madrid", function (error, response, body) {
        if(error) console.log(error); // Print the error if one occurred
        console.log(response.statusCode); // Print the response status code if a response was received

        let $ = cheerio.load(body);

        const zones = { // nombre, id
            "ESCUELAS AGUIRRE": "8",
            "PLAZA DE ESPAÑA": "4",
            "RAMÓN Y CAJAL": "11",
            "ARTURO SORIA": "16",
            "VILLAVERDE": "17",
            "FAROLILLO": "18",
            "CASA DE CAMPO": "24",
            "BARAJAS - PUEBLO": "27",
            "PLAZA DEL CARMEN": "35",
            "MORATALAZ": "36",
            "CUATRO CAMINOS-PABLO IGLESIAS": "38",
            "BARRIO DEL PILAR": "39",
            "PUENTE DE VALLECAS": "40",
            "MENDEZ ALVARO": "47",
            "CASTELLANA": "48",
            "RETIRO": "49",
            "PLAZA CASTILLA-CANAL": "50",
            "ENSANCHE DE VALLECAS": "54",
            "URBANIZACION EMBAJADA": "55",
            "FERNANDEZ LADREDA-OPORTO": "56",
            "SANCHINARRO": "57",
            "EL PARDO": "58",
            "JUAN CARLOS I": "59",
            "TRES OLIVOS": "60"
        };
    
        let query = $("tr");
        let result = {};

        Object.keys(query).map(k =>{
            let tr = query[k];
            try {
                let name = tr.children[1].children.filter(a => a.type==="text").map(b=>b.data)[0].replace(/[\n\t\r]/g,"");
                let ica = tr.children[3].children.filter(a => a.type==="tag").map(b=>b.children.filter(d=>d.type==="text"))[0][0].data;

                // console.log(name, ica);
                if(Object.keys(zones).indexOf(name)>=0){
                    result[zones[name]] = Number(ica); // 4: 35
                    // result[zones[name]] = {zona: name, ICA: Number(ica)}
                }
            } catch (err) {
                // console.error(err);
            }
        });
        callback(result);
    });
}

if(process.argv[1].indexOf("ica.js") != -1 )
    ica(m => console.table(m));

exports.i = ica;
