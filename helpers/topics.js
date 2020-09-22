const Topic  = require('../models/topic');

module.exports = {
	async isTopicCreator(req, res, next){
		const topic = await Topic.findById(req.params.id);

		if(req.user._id === topic.owner._id){
			req.creator = true;
			next();
		}else{
			req.creator = false;
			next();
		}		
	},

	findHub(req, res, next){
		
		debugger;
		if(req.query.hasOwnProperty('hub_title')){
			req.body.hub_title = req.query.hub_title;
			return next();
		}else{
			req.body.hub_title = 'hangout hub';
			return next();
		}

	}
}