function vote_image(model){
    return function(req,res,next){
        model.voteImage(model);
    };
};
module.exports = vote_image;
