const Post = require('../models/post');
const Pview = require('../models/pview');
const SharedPost = require('../models/share');


module.exports = {
	// pviews Create
	async pviewCreate(req, res, next) {
		// find the post by its id and populate pviews
		let modelObj;
		if(req.params.type === 'SHARED_POST'){
			modelObj = await SharedPost.findById(req.params.id).populate('pviews').exec();
		}else{
			modelObj = await Post.findById(req.params.id).populate('pviews').exec();
		}
		// filter post.pviews to see if any of the pviews were created by logged in user
		// .filter() returns a new array, so use .length to see if array is empty or not
		let havepviewed = modelObj.pviews.filter(pview => {
			return pview.author.equals(req.user._id);
		}).length;
		// check if havepviewed is 0 (false) or 1 (true)
		// if(havepviewed) {
		// 	// flash an error and redirect back to post
		// 	req.session.error = 'Sorry, you can only create one Comment per post.';
		// 	return res.send('alreadyCommented');
		// }

		// create the pview(saved with the help of pview model)
		//the author is not entered in the form so in the request coming from the "form" we add the author
		req.body.pview.author = req.user._id;
		let pview = await Pview.create(req.body.pview);
		// assign pview to post
		modelObj.pviews.push(pview);
		// save the post
		modelObj.save();
		// redirect to the post
		let ppview = await Pview.findById(pview._id).populate({path:'author', model:'User'});
		// req.session.success = 'Comment created!';
		res.json({modelObj, ppview});
	},
	// pviews Update
	async pviewUpdate(req, res, next) {
		await Pview.findByIdAndUpdate(req.params.pview_id, req.body.pview);
		let pview = await Pview.findById(req.params.pview_id).populate({
			path: 'author',
			model: 'User'
		});
		// req.session.success = 'Comment updated successfully!';
		res.json(pview);
	},
	// pviews Destroy
	async pviewDestroy(req, res, next) {
		// debugger;
		let post;
		if(req.params.type === 'SHARED_POST'){
			await SharedPost.findByIdAndUpdate(req.params.id, { //removing from the pview array 
				$pull: { pviews: req.params.pview_id }
			});	

			post = await SharedPost.findById(req.params.id);
		}else{
			await Post.findByIdAndUpdate(req.params.id, { //removing from the pview array 
				$pull: { pviews: req.params.pview_id }
			});	
			post = await Post.findById(req.params.id);

		}

		await Pview.findByIdAndRemove(req.params.pview_id);//removing from the collection
		// req.session.success = 'Comment deleted successfully!';
		res.json(post);
	}
}