

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
    total_votes: Number,
    uploaded_at: {type: Date},
    artist: {type: String, required: true},
    category: {type: String, required: true},
    url: String
});


xmasSchema.statics.getImages = function(req, next) {
    var project = null;
    var group  = null;
    var schema = this;
    var step = configModel.getStep(function(step) {
        switch(step){
          case 1:
            project = {category: 1, url: 1};
            group = {
                _id: "$category",
                total: {
                    $sum: 1
                },
                items: {
                    $push: "$$ROOT"
                }
            };
            break;
          case 2:
            project = {category: 1, url: 1, votes: 1};
            group = {
                _id: "$category",
                total: {
                    $sum: 1
                },
                items: {
                    $push: "$$ROOT"
                }
            };
            break;
          case 3:
            project = {category: 1, url: 1, votes: 1, artist:1, total_votes:1};
            group = {
                _id: "$category",
                items: {
                    $push: "$$ROOT"
                },
                total: {
                    $sum: "$$ROOT.total_votes"
                },
            };
            break;
        }

        schema.aggregate([
                {
                    $project: project
                },
                {
                    $group: group
                }
            ])
            .exec(function(err, result) {
                if (err) {
                    return next(err);
                }

                if (step == 1) {
                    req.objects = result;
                    return next();
                } else if (step == 2) {
                    _.each(result, function(category) {
                        if (!req.isAuthenticated()) {
                            _.each(category.items, function(item) {
                                delete item.votes;
                            });
                        } else {
                            _.each(category.items, function(item) {
                                var check_vote = _.find(item.votes, function(vote) {
                                    if (String(vote) == String(req.user._id)) {
                                        return true;
                                    } else {
                                        return false;
                                    }
                                });

                                delete item.votes;

                                if (check_vote) {
                                    item['voted'] = true;
                                } else {
                                    item['voted'] = false;
                                }
                            });
                        }
                    });

                    req.objects = result;
                    return next();
                } else if (step === 3) {
                    _.each(result, function(category) {
                        _.each(category.items, function(item) {
                            item['total'] = item.votes.length;
                            item['percent'] = parseFloat((item.votes.length * 100) / category.total);
                        });
                        var item_most_voted = _.max(category.items, function(item) {
                            return item.percent;
                        });
                        item_most_voted["winner"] = true;
                    });

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

                    if (!_.find(categories_votes[0].items, function(vote) {
                        if (String(vote) == String(req.user._id)) {
                            return true;
                        } else {
                            return false;
                        }
                    })) {
                        result.votes.push(req.user);
                        result.total_votes = result.votes.length;
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
                                votes_to_delete.total_votes = votes_to_delete.votes.length;
                                votes_to_delete.save();

                                result.votes.push(req.user);
                                result.total_votes = result.votes.length;
                                result.markModified('votes');
                                result.save();
                            } else {
                                result.votes.push(req.user);
                                result.total_votes = result.votes.length;
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
