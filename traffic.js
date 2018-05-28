const https = require('https');
const http = require('http');
const fs = require('fs');
const parseString = require('xml2js').parseString;

function traffic() {
  let options = {
    hostname: 'informo.munimadrid.es',
    //port: 443,
    path: '/informo/tmadrid/pm.xml',
    method: 'GET',
    headers: {
      // 'Accept': 'application/xml'
    }
  };

  const req = http.get(options, (res) => {
    let xml = '';

    process.stdout.write("Downloading data");
    res.on('data', (d) => {
      process.stdout.write(".");
      xml += d;
    }).on('end', () => {
      process.stdout.write("\n");
      // console.log(xml)
      parseString(xml, function (err, result) {
        data = result["pms"]["pm"];
        // console.log(Object.keys(result))
        size = Object.keys(data).length;
        console.log(`${size} entries.`);
        for (var i = 0; i < size; i++) {

          /*
          attr: codigo, descripcion, accesoAsociado, intensidad, ocupacion,
          carga, nivelServicio, intensidadSat, error, subarea
          */

          station = locations.filter(l => l[0].slice(1,l[0].length-1)==data[i]["codigo"][0]);
          station = station[0] ? station[0] : null;
          console.log(`Ocupación: ${data[i]["intensidad"][0]}/${data[i]["intensidadSat"][0]}.\
\t Coord x:${station[4]}, y:${station[5]}.\t Nombre: "${data[i]["descripcion"][0]}".`);

          if(i>10) break;
        }
        console.log("etc.")
      });
    });

  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

exports.traffic = traffic;

locations = []
fs.readFile('./traffic_locations.csv', 'utf8', (err, data) => {
  if (err) throw err;
  console.log("Loading locations")
  data
    .split('\n')
    .map(d => {
      d = d.slice(0, -1) //unnecessary removal of \r ?
      locations.push(d.split(";"))
    })

  console.log("Loading traffic")
  traffic()
});