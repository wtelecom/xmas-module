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
    // console.log(req);
    // var current_step = configSchema.getCurrentStep();
    // this.find()
    //     .exec(function(err, images) {
    //         if (err) {
    //             return next(err);
    //         }
    //         req.objects = images;
    //         return next();
    //     });

    // db.xmas.aggregate({$group:{_id:"$category", no:{$sum:1}, images:{$push:"$$ROOT"}}})

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
