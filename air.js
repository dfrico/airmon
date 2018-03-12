const ColorThief = require('color-thief-jimp');
const Jimp = require('jimp');
const http = require('http');
var drawInIterm = require('iterm2-image');

// geodata from: http://www.mambiente.munimadrid.es/sica/scripts/index.php

zones = {
    '47': 'Mendez Alvaro',
    '49': 'Retiro',
    '08': 'Escuelas Aguirre',
    '04': 'Plaza de España',
    '35': 'Plaza del Carmen'
    //TODO: scrapear el resto
}

station = '08'

if(!process.argv[2]) console.log("\nEstaciones disponibles: %s. Por defecto: %s", 
    Object.values(zones).join(', '), zones[station]);
else station = process.argv[2]

console.log('\nGetting data from station %s - %s\n', station, zones[station])

imageURL = 'http://www.mambiente.munimadrid.es/sica/datos/marker.'+station+'.png';
detail = 'http://www.mambiente.munimadrid.es/sica/datos/indice.'+station+'.png';

Jimp.read(imageURL, (err, sourceImage) => {
    if (err) {
        console.error('err1: '+err);
        return;
    }

    try{
        var dominantColor = ColorThief.getColor(sourceImage);
        let [r,g,b] = dominantColor

        if(g>r && g>b) console.log('\x1b[32m%s\x1b[0m', '\nAir quality is fine');
        else console.log(dominantColor)
        //TODO: check other color codes

        // Detail img
        http.get(detail, function(res) {
            if (res.statusCode === 200) {
                drawInIterm(res, function () {});
            }
        });

    } catch(err){
        console.log('err: '+err)
    }
});