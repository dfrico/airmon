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
        let data = result["pms"]["pm"];
        // console.log(Object.keys(result))
        let size = Object.keys(data).length;
        console.log(`${size} entries.`);

        for (var i = 0; i < size; i++) {

          /*
          attr: codigo, descripcion, accesoAsociado, intensidad, ocupacion,
          carga, nivelServicio, intensidadSat, error, subarea
          */
          try{
            let station = locations.filter(l => l[0].slice(1,l[0].length-1)==data[i]["codigo"][0]);
            // console.log(data[i]["codigo"][0])
            station = station[0] ? station[0] : [];

            zone = getNN(station[4].replace(',','.'), station[5].replace(',','.'))
            // console.log(`Ocupación: ${data[i]["intensidad"][0]}/${data[i]["intensidadSat"][0]}.\
// \tCoord x:${station[4]}, y:${station[5]}.\tZona: ${zone}.\tNombre: "${data[i]["descripcion"][0]}".`)

            zones[zone].push({[data[i]["codigo"][0]]: `${((Number(data[i]["intensidad"][0])/Number(data[i]["intensidadSat"][0]))*100).toFixed(2)}%` })

          }
          catch(err){
            // console.log(err)
          }
        }

        for(z of Object.keys(zones)){
          console.log(`${z}: ${zones[z].length}`)
        }
      });
    });

  });

  req.on('error', (e) => {
    console.error(e);
  });
  req.end();
}

function getNN(x, y) {
  let data = refCoordinates
    .sort((a, b) => {
        let ay = a[4], ax = a[5], by = b[4], bx = b[5];
        let a_distance = Math.sqrt(Math.pow((ax-x), 2) + Math.pow((ay-y), 2))
        let b_distance = Math.sqrt(Math.pow((bx-x), 2) + Math.pow((by-y), 2))
        if (a_distance < b_distance)
          return -1;
        if (a_distance > b_distance)
          return 1;
        return 0;
    })
  return data[0][0];
}

let locations = [], refCoordinates = [], zones = {};

fs.readFile('./traffic_locations.csv', 'utf8', (err, data) => {
  if (err) throw err;
  console.log("Loading locations")
  data
    .split('\n')
    .map(d => {
      d = d.slice(0, -1) //unnecessary removal of \r ?
      locations.push(d.split(";"))
    })

  fs.readFile('./coordinates.csv', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("Loading coordinates for air monitoring stations")
    refCoordinates = data
      .split('\n')
      .map(d => {
        d = d.slice(0, -1) //unnecessary removal of \r ?
        zones[d.split(";")[0]] = []
        return d.split(";")
      })
    console.log("Loading traffic")
    traffic()
  });
});

exports.traffic = traffic;