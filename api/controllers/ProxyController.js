/**
 * ProxyController
 *
 * @description :: Server-side logic for managing proxies
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var request = require('request'),
    baseURL = sails.config.api;

module.exports = {

  // Proxy request to API
  call: function(req, res){
    sails.log.debug("ProxyController:call:" + req.method + ":" + req.url);
    sails.log.debug("Before calling API service");

    API.call(req, {}, function (err, response, body) {
      sails.log.debug("API.call callback [" + response.statusCode + "]");
      if (!err) {
        sails.log.debug("ProxyController:call:success");
        sails.log.debug(body);
        return res.status(response.statusCode).json(body);
      } else {
        sails.log.debug("ProxyController:call:error");
        sails.log.debug(err);
        return res.status(500).json({error: err.message});
      }
    });
  }

};
