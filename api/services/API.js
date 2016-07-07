// Private variables and functions

var request = require('request'),
    baseURL = sails.config.api;

// Public variables and functions

exports.call = function(req, options, cb){
    sails.log.debug("API.call");

    var options = {
                   url    : baseURL + (options.url || req.url.substring("4")),
                   body   : req.body || undefined,
                   json   : req.body ? true : false,
                   method : options.method || req.method,
    };

    request(options, function (err, response, body) {
        sails.log.debug("API.call request callback");
        sails.log(err);
        sails.log(response.statusCode);
        cb(err, response, body);
    });
};
