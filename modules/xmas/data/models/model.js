
/**
 * @file Xmas.js
 * Xmasspace Xmas model
 * @desc MongoDB Xmas object model
 */


var mongoose = require('mongoose'),
    rek = require('rekuire'),
    moduleSchema = rek('modules/xmas/data/schemas/schema'),
    schema = mongoose.model('Xmas', moduleSchema);

module.exports = schema;
