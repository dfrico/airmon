# airmon
Monitoring air quality in Madrid.

1. Download or clone project, then `cd` it.
2. `npm install` on root directory (`airmon`).

## crawler

Get public data related to air particles, meteo and traffic conditions.

1. Specify the mongoDB server URL to save the data (`export aws="<URL>"`)
2.  Run crawler with `node crawler.js` or run each file individually (`particles.js`, `meteo.js` and `traffic.js`).

## webUI

Reactjs files for dashboard.

1. `cd webui`
2. `npm install`
3. `npm start` runs `webpack-dev-server` (webpack dev build)
4. Optional: deploy `build` directory with `now-cli`, `heroku` or similar.

## server

WIP.
