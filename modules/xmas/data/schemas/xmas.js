

var mongoose = require('mongoose'),
    rek = require('rekuire'),
    _ = require('underscore'),
    configModel = rek('modules/xmas/data/models/config');


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


xmasSchema.statics.getImages = function(req, next) {
    var project = null;
    schema = this;
    var step = configModel.getStep(function(step) {
        if (step == 2) {
            project = {category: 1, url: 1};
        } else if (step == 3) {
        } else {
            project = {category: 1, url: 1};
        }

        schema.aggregate([
                {
                    $project: project
                },
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
            ])
            .exec(function(err, result) {
                if (err) {
                    return next(err);
                }

                req.objects = result;
                return next();
            });
    });
}

module.exports = xmasSchema;
