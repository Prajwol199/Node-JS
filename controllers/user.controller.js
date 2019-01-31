const User = require('../models/user.model');
const request = require('ajax-request');
var bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

module.exports = {
	test: function (req, res) {
   		res.send('Greetings from the User Test controller!');
	},

	add_user: function (req,res){
		bcrypt.genSalt(10, function(err, salt) {
			bcrypt.hash(req.body.password, salt, function(err, hash) {
			    // Store hash in your password DB.
				let user = new User(
			        {
			            name: req.body.name,
			            email: req.body.email,
			            password: hash
			        }
			    );

			    user.save(function (err) {
			        if (err) {
			            res.send('User Not Created successfully');
			        }
			        	res.redirect('/');
			            // res.send('User Created successfully');
			    })
			});
		});
	},

	user_add: function(req,res){
		res.render('add-user',{title: "Add User"});
	},

	edit_user: function(req,res){
		var id = req.params.id;

		request({
		url: 'http://localhost:5000/user/'+id,
		method: 'GET',
		}, function(err, response, body) {
	    	res.render('edit-user',{title: "Edit User",data:body});
		});
	},

	all_user: function (req,res){
		User.find(function(err,user){
			if (err) return next(err);
	        // var hash = product.password;
	        res.send(user);
		});
	},

	user_detail: function (req,res){
		User.findById(req.params.id, function (err, product) {
	        if (err) return next(err);
	        // var hash = product.password;
	        res.send(product);
	    });
	},

	update_user: function (req,res){
		User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
	        if (err) return next(err);
	        res.send('Product udpated.');
	    });
	},

	user_delete: function(req,res){
		User.findByIdAndRemove(req.params.id, function (err) {
	        if (err) return next(err);
	        res.send('Deleted successfully!');
	    })
	}
}

// exports.test = function (req, res) {
//     res.send('Greetings from the User Test controller!');
// };

// exports.add_user = function (req,res){
// 	bcrypt.genSalt(10, function(err, salt) {
// 		bcrypt.hash(req.body.password, salt, function(err, hash) {
// 		    // Store hash in your password DB.
// 			let user = new User(
// 		        {
// 		            name: req.body.name,
// 		            email: req.body.email,
// 		            password: hash
// 		        }
// 		    );

// 		    user.save(function (err) {
// 		        if (err) {
// 		            res.send('User Not Created successfully');
// 		        }
// 		        	res.redirect('/');
// 		            // res.send('User Created successfully');
// 		    })
// 		});
// 	});
// }

// exports.user_add = function(req,res){
// 	res.render('add-user',{title: "Add User"});
// }

// exports.edit_user = function(req,res){
// 	var id = req.params.id;

// 	request({
// 	url: 'http://localhost:5000/user/'+id,
// 	method: 'GET',
// 	}, function(err, response, body) {
//     	res.render('edit-user',{title: "Edit User",data:body});
// 	});
// }

// exports.all_user = function (req,res){
// 	User.find(function(err,user){
// 		if (err) return next(err);
//         // var hash = product.password;
//         res.send(user);
// 	});
// }

// exports.user_detail = function (req,res){
// 	User.findById(req.params.id, function (err, product) {
//         if (err) return next(err);
//         // var hash = product.password;
//         res.send(product);
//     });
// }


// exports.update_user = function (req,res){
// 	User.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
//         if (err) return next(err);
//         res.send('Product udpated.');
//     });
// }

// exports.user_delete = function(req,res){
// 	User.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// }