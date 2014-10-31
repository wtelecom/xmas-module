

var mongoose = require('mongoose'),
    rek = require('rekuire'),
    moduleSchema = rek('modules/xmas/data/schemas/xmas'),
    model = mongoose.model('Xmas', moduleSchema);

module.exports = model;