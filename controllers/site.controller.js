const express = require('express');
const app     = express();
const path    = require('path');
const router  = express.Router();
const request = require('ajax-request');
const bcrypt  = require('bcryptjs');
const multer  = require('multer');
const Image   = require('../models/image.model');
const User    = require('../models/user.model');
const isEmpty = require('is-empty');

module.exports = {
	index: function (req, res) {
	    // render is ejs property it directy looks views folder
		request('url', function(err, res, body) {});

		request({
		url: 'http://localhost:5000/user',
		method: 'GET',
		}, function(err, response, body) {
	    	res.render('index',{title: "Home",data:body});
		});
	},

	image: function (req, res) {
		Image.find(function(err,user){
			if (err) return next(err);
	        // var hash = product.password;
	        // res.send(user);
	    res.render('image',{title: "Image",data:user});
		});
	},

	delete_image: function (req, res) {
		Image.findByIdAndRemove(req.params.id, function (err) {
	        if (err) return next(err);
	        res.send('Deleted successfully!');
	    })
	},

	login_page: function(req,res){
		res.render('login',{title: "Login"});
	},

	login: function(req,res){
		email = req.body.email;
		password = req.body.password;

		// var query = {email: email, password: password};


		User.find({email},function(err,product){
			// var data = JSON.parse(product);
			// res.send(product);
			product.forEach(function(value) {
				var hash = value.password;
				bcrypt.compare(password, hash, function(err, response) {
			    	// console.log(response);
			    	res.redirect('/');
				});
			});
			// if(!isEmpty(product)){
			// 	res.redirect('/');
			// }else{
			// 	res.render('404',{title: "Login failed"});
			// }
		});
	}
}

// exports.index = function (req, res) {
//     // render is ejs property it directy looks views folder
// 	request('url', function(err, res, body) {});

// 	request({
// 	url: 'http://localhost:5000/user',
// 	method: 'GET',
// 	}, function(err, response, body) {
//     	res.render('index',{title: "Home",data:body});
// 	});
// };

// exports.image = function (req, res) {
// 	Image.find(function(err,user){
// 		if (err) return next(err);
//         // var hash = product.password;
//         // res.send(user);
//     res.render('image',{title: "Image",data:user});
// 	});
// };

// exports.delete_image = function (req, res) {
// 	Image.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// };

// exports.login = function(req,res){
// 	email = req.body.email;
// 	password = req.body.password;

// 	var query = {email: email, password: password};


// 	User.find({email},function(err,product){
// 		if(!isEmpty(product)){
// 			res.redirect('/');
// 		}else{
// 			res.render('404',{title: "Login failed"});
// 		}
// 	});
// };

// exports.login_page = function(req,res){
// 	res.render('login',{title: "Login"});
// };