/*
*
*
*/

var mongoose = require('mongoose'),
    rek = require('rekuire'),
    _ = require('underscore');

var xmasSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
	},
	votes: [{ type: mongoose.Schema.Types.ObjectId,
			 ref: 'Account'}],
	uploaded_at: {type: Date},
	artist: String,
	category: {type: String},
	url: String
});


module.exports = xmasSchema;


