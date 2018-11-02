
const ShopSite = require('./apiai.js');
const ShopSiteConfig = require('./apiaiConfig.js');


const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');


const APIAI_ACCESS_TOKEN = "4d71e2695a9e436c9f15cb1e124373b3";
const APIAI_LANG = "en-US";


const botConfig = new ShopSiteConfig(APIAI_ACCESS_TOKEN, APIAI_LANG);
const bot = new ShopSite(botConfig);

const app = express();

app.set('port',(process.env.port || 5000))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.setHeader('Content-Type', 'application/json')
    // res.end();
    // Pass to next layer of middleware
    res.setHeader("Content-Type", "application/xml");

    next();
});


app.post('/',function(req,res){
	// console.log(req);
    console.log('POST sms received');

    try {
        bot.processMessage(req, res);
    } catch (err) {
        return res.status(400).send('Error while processing ' + err.message);
    }

    // res.json({data:"hello i'm a chatbot"})
});



app.listen(app.get('port'),function(){
	
	console.log("runing server")

});