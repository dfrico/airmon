const ColorThief = require('color-thief-jimp');
const Jimp = require('jimp');
const http = require('http');
const drawInIterm = require('iterm2-image');

// geodata from: http://www.mambiente.munimadrid.es/sica/scripts/index.php

const zones = {
  '47': 'Mendez Alvaro',
  '49': 'Retiro',
  '08': 'Escuelas Aguirre',
  '04': 'Plaza de España',
  '35': 'Plaza del Carmen'
  // TODO: scrapear el resto
}

function airmon(station, callback) {
  // Calling from node, not as import:

  if(process.argv[1].indexOf('air.js') != -1 &&
    process.argv.indexOf('-v') != -1){

    // We can pass station as argument

    param = process.argv.filter(a => !isNaN(a))
    if(param.length == 0){
      console.log("\nEstaciones disponibles:\n%s.\nPor defecto: %s",
        Object.values(zones).join(', '), zones[station]);
    }
    else station = param[0]

    detail(station, draw=true)
    console.log('\nGetting data from station %s - %s\n', station, zones[station])
  }

  let imageURL = 'http://www.mambiente.munimadrid.es/sica/datos/marker.' + station + '.png';

  Jimp.read(imageURL, (err, sourceImage) => {
    if (err) {
      console.error('err1: ' + err);
      return;
    }

    try {
      let [r, g, b] = ColorThief.getColor(sourceImage);
      let text = ""

      if (g > r && g > b){
        text = 'Air quality is fine.';
        // colors!
        if(process.argv.indexOf('-c') != -1)
          text = '\x1b[32m\n' + text + '\x1b[0m';
      } else if (r == g) {
        text = 'Air quality could be better.';
        if(process.argv.indexOf('-c') != -1)
          text = '\x1b[33m\n' + text + '\x1b[0m';
      } else {
        console.log(r, g, b);
        text = 'Air quality is probably bad.';
      }

      callback(text)

    } catch (err) {
      console.log('err: ' + err)
    }
  });
}

function detail(station, draw=false) {
  let detailURL = 'http://www.mambiente.munimadrid.es/sica/datos/indice.' + station + '.png';

  if(draw){
    http.get(detailURL, function(res) {
        if (res.statusCode === 200) {
            drawInIterm(res, function () {});
        }
    });
  }

  return detailURL
}

airmon('08', (value)=>console.log(value))

exports.air = airmon;
exports.graph = detail;
