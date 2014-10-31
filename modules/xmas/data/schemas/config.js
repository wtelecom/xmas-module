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

module.exports = configSchema;