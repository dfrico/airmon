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

function airmon(station = '08') {
  // Calling from node, not as import:
  if(process.argv[1].indexOf('air.js') != -1){

    // We can pass station as argument
    if(!process.argv[2]) {
      console.log("\nEstaciones disponibles:\n%s.\nPor defecto: %s",
        Object.values(zones).join(', '), zones[station]);
    }
    else station = process.argv[2]

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
      var dominantColor = ColorThief.getColor(sourceImage);
      let [r, g, b] = dominantColor
      let text = ""

      // TODO: return promise with result
      if (g > r && g > b)
        return('\x1b[32m%s\x1b[0m', '\nAir quality is fine');
      else if (r == g)
        return('\x1b[33m%s\x1b[0m', '\nAir quality could be better');
      else return('No idea, code is: %s', String(dominantColor));
      //TODO: check other color codes

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

airmon()

exports.air = airmon;
exports.graph = detail;
