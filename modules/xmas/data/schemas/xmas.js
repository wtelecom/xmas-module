

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
    var schema = this;
    var step = configModel.getStep(function(step) {
        if (step == 2) {
            project = {category: 1, url: 1, votes: 1};
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
                if (step == 2) {
                    _.each(result, function(category) {
                        _.each(category.items, function(item) {
                            var check_vote = _.find(item.votes, function(vote) {
                                if (String(vote) == String(req.user._id)) {
                                    return true;
                                } else {
                                    return false;
                                }
                            });

                            if (check_vote) {
                                item['voted'] = true;
                            } else {
                                item['voted'] = false;
                            }
                        });
                    });

                    // TODO: Delete votes field
                    _.each(result, function(r) {
                        _.each(r.items, function(rr) {
                            var rr_without = _.omit(rr, 'votes');
                            console.log(rr);
                            console.log(rr_without);
                            // rr = rr.toObject();
                            rr = rr_without;
                        });
                    });

                    req.objects = result;
                    return next();
                } else if (step == 1) {
                    req.objects = result;
                    return next();
                }
            });
    });
}

xmasSchema.statics.voteImage = function(id, req, next) {
    var schema = this;
    if (req.user) {
        schema.aggregate({
            $group: {
                _id: "$category",
                items: {
                    $push: "$$ROOT.votes"
                }
            }
        })
        .exec(function(err, agg_result) {
            schema.findOne({_id: id})
                .exec(function(err, result) {
                    if (err)
                        return next(err);

                    var categories_votes = _.where(agg_result, {_id: result.category});

                    if (!_.find(categories_votes[0].items[0], function(vote) {
                        if (String(vote) == String(req.user._id)) {
                            return true;
                        } else {
                            return false;
                        }
                    })) {
                        result.votes.push(req.user);
                        result.markModified('votes');
                        result.save();

                        return next();
                    } else {
                        schema.findOne(
                            {
                                votes: String(req.user._id),
                                category: result.category
                            }
                        )
                        .exec(function(err, votes_to_delete) {
                            if (votes_to_delete) {
                                votes_to_delete.votes = _.reject(
                                    votes_to_delete.votes,
                                    function(vote) {
                                        if (String(vote) == String(req.user._id)) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                );
                                votes_to_delete.markModified('votes');
                                votes_to_delete.save();

                                result.votes.push(req.user);
                                result.markModified('votes');
                                result.save();
                            } else {
                                result.votes.push(req.user);
                                result.markModified('votes');
                                result.save();
                            }
                            return next();
                        });
                    }
                });
        });
    } else {
        return next();
    }
};

module.exports = xmasSchema;
