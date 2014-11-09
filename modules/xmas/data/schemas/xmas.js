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


xmasSchema.statics.getImages = function(req, next){
    this.aggregate(
            {
                $group: {
                    _id: "$category",
                    total: {
                        $sum: 1
                    },
                    items: {
                        $push: "$$ROOT"
                    }
                }
            }
        )
        .exec(function(err, result) {
            if (err) {
                return next(err);
            }

            req.objects = result;
            return next();
        });

}

module.exports = xmasSchema;
