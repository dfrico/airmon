const airjs = require("./air.js");
const airmon = airjs.air;
/*
const graph = airjs.graph;

const scrapper = require("./scrapper.js");
const particles = scrapper.particles;
*/
const fs = require("fs");
const TeleBot = require("telebot");
const bot = new TeleBot(process.env.telebot);

let data = {};
let lastTransmission = null;

// airmon(station)
//graph(station);
//particles(station);

function loadData(){
    fs.readFile("users.json", (err, data) => {
        if (err) throw err;
        let users = JSON.parse(data);
        console.log(users);
    });
}

function saveData(){
    let data = JSON.stringify(data);

    fs.writeFile("users.json", data, (err) => {
        if (err) throw err;
        console.log("Data written to file");
    });
}

bot.on(["/start", "/hello"], (msg) => {
    let text = "Welcome! Send me your location (or not) \
    if you want to receive air quality updates near you";

    let replyMarkup = bot.keyboard([
        [bot.button("location", "Send my location")],
        ["How about no"]
    ], {
        resize: true
    });

    // saving id and nearest station (def '49': retiro)
    data[msg.chat.id] = "49";
    console.log("Now "+Object.keys(data).length+" users");

    return bot.sendMessage(msg.from.id, text, {
        replyMarkup
    });
});

bot.on("location", msg => {

    console.log(msg.location);
    return bot.sendMessage(msg.from.id, "Thanks for that!", {
        replyMarkup: "hide"
    });

});

bot.on(/no/, (msg) => {
    return bot.sendMessage(msg.from.id, "Ok, send me the location later if you want to!", {
        replyMarkup: "hide"
    });
});

// TODO: locate nearest station and set data.station
// TODO: method to use detail img graph from airjs

/*
 * pseudo-cron
 */
bot.on("tick", () => {

    let d = new Date();

    if(d.getMinutes()==0 &&
    d.getHours() != lastTransmission){

    // foreach user
        Object.keys(data).map((chat_id) => {
            // get airmon data
            airmon(data[chat_id], (text) => {
                // send update by msg
                bot.sendMessage(chat_id, text)
                // verbose success
                    .then(() => console.log("msg sent to"+chat_id))
                // bot blocked by user
                    .catch(function(err) {
                        if(err.error_code && err.error_code == 403){
                            console.log("User "+chat_id+" asked bot to stop");
                            delete data[chat_id];
                            console.log("Now "+Object.keys(data).length+" users");
                        }
                    });
            });
        });
    }

    lastTransmission = d.getHours();

});

bot.start();
