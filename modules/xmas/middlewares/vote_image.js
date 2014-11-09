function vote_image(model) {
    return function(req,res,next) {
        model.voteImage(req.params.id, req, next);
    };
};
module.exports = vote_image;
