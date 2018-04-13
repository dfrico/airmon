const airjs = require('./air.js');
const airmon = airjs.air;
const graph = airjs.graph;

const scrapper = require('./scrapper.js')
const particles = scrapper.particles;

const fs = require('fs');
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.telebot);

let data = {};

let station = '49'
// airmon(station)
// graph(station)
// particles(station)

function loadData(){
  fs.readFile('users.json', (err, data) => {
    if (err) throw err;
    let users = JSON.parse(data);
    console.log(users);
  });
}

function saveData(){
  let data = JSON.stringify(data, null, 2);

  fs.writeFile('users.json', data, (err) => {
      if (err) throw err;
      console.log('Data written to file');
  });
}

bot.on(['/start', '/hello'], (msg) => {
  text = 'Welcome! Send me your location (or not) \
    if you want to receive air quality updates near you';

  let replyMarkup = bot.keyboard([
    [bot.button('location', 'Send my location')],
    ['How about no']
  ], {
    resize: true
  });

  data.chat_id = msg.chat.id;

  return bot.sendMessage(msg.from.id, text, {
    replyMarkup
  });
});

bot.on('location', msg => {

  console.log(msg.location);
  return bot.sendMessage(msg.from.id, 'Thanks for that!', {
    replyMarkup: 'hide'
  });

});

bot.on(/no/, (msg) => {
  return bot.sendMessage(msg.from.id, 'Ok, send me the location later if you want to!', {
    replyMarkup: 'hide'
  });
});

// TODO: locate nearest station and set data.station
// TODO: method to use detail img graph from airjs

/*
 * pseudo-cron
 */
bot.on('tick', () => {
  if (!data.chat_id ) return;

  // text = airmon('49')
  text = "probando..."

  return bot.sendMessage(data.chat_id, text)
    .catch(function(err) {
      if(err.error_code && err.error_code == 403){
        console.log('User asked bot to stop')
        bot.stop();
      }
    });
});

bot.start();
