/*
*
*
*/

var mongoose = require('mongoose'),
    rek = require('rekuire'),
    _ = require('underscore');

var configSchema = new mongoose.Schema({
    steps: [String],
    current_step: String, 
    categories: [String]
});

configSchema.statics.getCurrentStep = function(){
    this.find(function(err, config){
        return config.current_step; 
    })
}

module.exports = configSchema;