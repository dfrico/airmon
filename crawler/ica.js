const request = require("request");
const cheerio = require("cheerio");

/*
function contains(selector, text) {
    var elements = document.querySelectorAll(selector);
    return 
}
*/

function eltiempo() {
    request("https://www.eltiempo.es/calidad-aire/madrid", function (error, response, body) {
        if(error) console.log(error); // Print the error if one occurred
        // console.log(response && response.statusCode); // Print the response status code if a response was received

        let $ = cheerio.load(body);
        let names = ["ARTURO SORIA","BARAJAS - PUEBLO","BARRIO DEL PILAR", "CASA DE CAMPO", "CASTELLANA",
            "CUATRO CAMINOS-PABLO IGLESIAS", "EL PARDO", "ENSANCHE DE VALLECAS", "ESCUELAS AGUIRRE", "FAROLILLO",
            "FERNANDEZ LADREDA-OPORTO", "JUAN CARLOS I", "MAJADAHONDA", "MENDEZ ALVARO", "MORATALAZ",
            "PLAZA CASTILLA-CANAL", "PLAZA DE ESPAÑA", "PLAZA DEL CARMEN", "PUENTE DE VALLECAS", "RAMÓN Y CAJAL",
            "RETIRO", "SANCHINARRO", "TRES OLIVOS", "URBANIZACION EMBAJADA", "VILLAVERDE"];
    
        let query = $("tr");
        let result = {};

        Object.keys(query).map(k =>{
            let tr = query[k];
            try {
                let name = tr.children[1].children.filter(a => a.type==="text").map(b=>b.data)[0].replace(/[\n\t\r]/g,"");
                let ica = tr.children[3].children.filter(a => a.type==="tag").map(b=>b.children.filter(d=>d.type==="text"))[0][0].data;

                // console.log(`"${name}": ${ica}`);
                if(names.indexOf(name)>0){
                    result[name] = Number(ica);
                }
            } catch (err) {
                // console.error(err);
            }
        });
        console.table(result);
    });
}

eltiempo();