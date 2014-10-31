function vote_image(model){
    return function(req,res,next){
        model.voteImage(model);
    };
};
module.exports = load_images_with_author_votes;
