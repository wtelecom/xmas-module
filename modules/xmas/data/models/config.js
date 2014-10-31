

var mongoose = require('mongoose'),
    rek = require('rekuire'),
    moduleSchema = rek('modules/xmas/data/schemas/config'),
    model = mongoose.model('Config', moduleSchema);

module.exports = model;