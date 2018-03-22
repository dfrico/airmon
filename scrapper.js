const https = require('https');
const http  = require('http');

let options = {
  hostname: 'datos.madrid.es',
  //port: 443,
  path: '/egob/catalogo/212531-10515086-calidad-aire-tiempo-real.csv',
  method: 'GET',
  headers: {
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'Mozilla/5.0'
  }
};

function processData(rows){

  let headers = rows[0].split(';')
  let hour  = new Date().getHours()
  let index = headers.indexOf('H'+hour)
  // console.log('Current hour ('+hour+') is at '+index)

  const station = '8'
  let filtered = rows.filter(r => r.split(';')[2]==station)

  const magnitudes = {
    '1':  'SO2',
    '6':  'CO',
    '7':  'NO',
    '8':  'NO2',
    '9':  'Particulas<2.5um',
    '10': 'Particulas<10um',
    '12': 'NOx',
    '14': 'O3',
    '20': 'Tolueno',
    '30': 'Benceno',
    '35': 'Etilbenceno',
    '37': 'Metaxileno',
    '38': 'Paraxileno',
    '39': 'Ortoxileno',
    '42': 'Hidrocarburos',
    '43': 'Metano CH4',
    '44': 'Hexano'
  }
  
  filtered.map((row) => {
    let attr = row.split(';')
    console.log(magnitudes[attr[3]]+': '+attr[index]+' ug/m3')
  })
}

const req = https.request(options, (res) => {
  // console.log('statusCode:', res.statusCode);
  // console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

  if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
    // The location for some (most) redirects will only contain the path
    // not the hostname, detect this and add the host to the path.
    // console.log('\nRedirecting...\n')
    url = res.headers.location
    options.path = url.split('.es')[1].replace(' ','');
    options.hostname = url.split('/')[2]
    // console.log('Performing request on: '+options.hostname)
    // console.log('Path: '+options.path)
    // console.log('User Agent: '+options.headers['User-Agent']+'\n')

    http.get(options, (res) => {
      // console.log('statusCode:', res.statusCode);
      // console.log('headers:', res.headers);

      let csv = ""
      res.on('data', (d) => {
        //process.stdout.write(d);
        csv += String(d)
      });
      res.on('end', function() {
        // process page
        rows = csv.split('\n')
        processData(rows)
      });

    }).on('error', (e) => {
      console.error(e);
    });

  } else {
    var data = '';

    res.on('data', function (chunk) {
      data += chunk;
    }).on('end', function () {
      // Do something with 'data'
    });
  }

});

req.on('error', (e) => {
console.error(e);
});
req.end();

