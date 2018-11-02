var apiai = require('apiai');
const uuid = require('uuid/v4');
const xmlescape = require('xml-escape');
// var app = apiai("d546e25ac40c42a290ad1385f3a843c8");

// var request = app.textRequest('<Your text query>', {
//     sessionId: 'sessionId'
// });

// request.on('response', function(response) {
//     console.log(response);
// });

// request.on('error', function(error) {
//     console.log(error);
// });

// request.end();



module.exports = class ShopSite {

    get apiaiService() {
        return this._apiaiService;
    }

    set apiaiService(value) {
        this._apiaiService = value;
    }

    get botConfig() {
        return this._botConfig;
    }

    set botConfig(value) {
        this._botConfig = value;
    }

    get sessionIds() {
        return this._sessionIds;
    }

    set sessionIds(value) {
        this._sessionIds = value;
    }

    constructor(botConfig) {
        this._botConfig = botConfig;
        var apiaiOptions = {
            language: botConfig.apiaiLang,
        };

        this._apiaiService = apiai(botConfig.apiaiAccessToken, apiaiOptions);
        this._sessionIds = new Map();
    }



    processMessage(req, res) {
        // if (this._botConfig.devConfig) {
            console.log("body", req.body);
        // }
        if (req.body && req.body.From) {

            let chatId = req.body.From;
            let messageText = req.body.message;

            console.log(chatId, messageText);
                if (!this._sessionIds.has(chatId)) {
                    this._sessionIds.set(chatId, uuid());

                }

                let apiaiRequest = this._apiaiService.textRequest(messageText,
                    {
                        sessionId: this._sessionIds.get(chatId)
                    });

                apiaiRequest.on('response', (response) => {
                    if (ShopSite.isDefined(response.result)) {
                        let responseText = response.result.fulfillment.speech;

                        console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',response)

                        if (ShopSite.isDefined(responseText)) {
                            console.log('Response as text message');
                            res.json({data:responseText});
                            res.status(200).end("<Response><Message>" + xmlescape(responseText) + "</Message></Response>");
                        } else {
                            console.log('Received empty speech');
                        }
                    } else {
                        console.log('Received empty result')
                    }
                });

                apiaiRequest.on('error', (error) => console.error(error));
                apiaiRequest.end();
            }
            else {
                console.log('Empty message');
                return res.status(400).end('Empty message');
            }
           
    }

            static isDefined(obj) {
                if (typeof obj == 'undefined') {
                    return false;
                }

                if (!obj) {
                    return false;
                }

                return obj != null;
            }
}