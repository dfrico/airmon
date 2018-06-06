const https = require("https");
const fs = require("fs");

function parseDeg(value) {
    return value
        .split(" ")
        .map(n =>
            n.split("")
                .filter(m => !isNaN(m)||(m===","))
                .join("")
                .replace(",",".")
        )
        .map(n => Number(n));
}

function coord(locations) {

    for(let l of locations){

        ((location) => {
            let [code, name, x_, y_] = location;

            let url = `https://epsg.io/trans?x=${x_}&y=${y_}&s_srs=4326&t_srs=25830`;
            const req = https.get(url, (res) => {
                let data = "";
                res.on("data", (d) => {
                    data += d;
                }).on("end", () => {
                    // console.log(data)
                    let {x, y} = JSON.parse(data);
                    console.log(`${code};${name};${y_};${x_};${y};${x}`);
                });
            });

            req.on("error", (e) => {
                console.log(url);
                console.error(e);
            });

            req.end();
        })(l);
    }
}

function init(){
    let locations = [];
    fs.readFile("./mad/air/ubicaciones.csv", "utf8", (err, data) => {
        if (err) throw err;
        console.log("Loading locations");
        data
            .split("\n")
            .map((d, i) => {
                if(i>0){
                    let attr = d.split(";");

                    let x = parseDeg(attr[2]);
                    x = x.map(n => n*-1);
                    x = (x[0]+x[1]/60+x[2]/3600);
                    let y = parseDeg(attr[3]);
                    y = (y[0]+y[1]/60+y[2]/3600);

                    locations.push([attr[0], attr[1], x, y]);
                }
            });

        console.log("Loading coordinates");
        console.log("Codigo;\tNombre;\ty1;\tx1;\ty2;\tx2");
        coord(locations);
    });
}

init();

/*

EPSG:25830 ETRS89 / UTM zone 30N to EPSG:4326 WGS 84
https://epsg.io/trans?x=436008.175534995&y=4472593.78531503&s_srs=25830&t_srs=4326

ESTE PARA GOOGLE->ETRS
EPSG:4326 WGS 84 to EPSG:25830 ETRS89 / UTM zone 30N (DECIMAL)
https://epsg.io/trans?x=-3.7123333333333335&y=40.424&s_srs=4326&t_srs=25830

ejemplos:
la latina etc   x:436008,175534995, y:4472593,78531503
plz españa      x:439572.94,        y:4475062.38

*/
