//remember U can always add something in schema subtraction will cause huge problem
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;
const Topic = require('./topic');
const Post = require('./post')

const UserSchema = new Schema({
	email: {type: String, unique: true, required: true},
	profimage: {
		secure_url: { type: String, default: '/images/default-profile.jpg' },
		public_id: String
	},
	backimage: {
		secure_url: { type: String, default: '/images/backimg.jpg' },
		public_id: String
	},
	status: String,
	nickname: String,
	site: String,
	bornday: String,
	bornmonth: String,
	bornyear: String,
	location: String,
	bookmarks: [ 
		{
			type: Schema.Types.ObjectId, //this bookmark is nothing but an array of postids
			ref: 'Post'
		}
 	],
 	experience:[
         {//exp depends on contribution in each topic
             exp: Number,
             type: Schema.Types.ObjectId,
             ref: 'Topic'
         }
    ],
	followers: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	following: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	resetPasswordToken: String,  //creating unique password token using crypto
	resetPasswordExpires: Date
});
//User is deleted pviews,posts will also be deleted(need to figure it out)
// UserSchema.pre('remove', async function() { 
// 	await Posts.remove({
// 		_id: {
// 			$in: this.posts;
// 		}
// 	});
// });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);