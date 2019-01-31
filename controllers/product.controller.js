const Product = require('../models/product.model');
const request = require('ajax-request');
const multer = require('multer');

//Simple version, without validation or sanitation

module.exports = {
    test: function(req,res){
        res.send('Greetings from the Test controller!');  
    },

    product_create:function(req,res){
        let product = new Product(
            {
                name: req.body.name,
                price: req.body.price,
                // image:{
                //     name:'test.jpg',
                //     description:'This is only test',
                // },
            }
        );

        product.save(function (err) {
            if (err) {
                res.send('Product Not Created successfully');
            }
                res.redirect('/products');
            // res.send('Product Created successfully');
        })
    },
    
    all_product:function(req,res){
        Product.find(function(err,product){
        if (err) return next(err);
            res.render('product',{title: "Products",data:product});
        });
    },

    add_product:function(req,res){
        res.render('add-product',{title: "Add Product"}); 
    },

    edit_product:function(req,res){
        var id = req.params.id;

        request({
        url: 'http://localhost:5000/products/'+id,
        method: 'GET',
        }, function(err, response, body) {
            res.render('edit-product',{title: "Edit Product",data:body});
        });
    },

    product_details:function (req, res) {
        Product.findById(req.params.id, function (err, product) {
            if (err) return next(err);
            res.send(product);
        })
    },

    product_update:function (req, res) {
        Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
            if (err) return next(err);
            res.send('Product udpated.');
        });
    },

    product_delete:function (req,res){
        Product.findByIdAndRemove(req.params.id, function (err) {
            if (err) return next(err);
            res.send('Deleted successfully!');
        })
    }
}

// module.exports.test = function (req, res) {
//     res.send('Greetings from the Test controller!');
// }; 

// exports.product_create = function (req, res) {
    // let product = new Product(
    //     {
    //         name: req.body.name,
    //         price: req.body.price,
    //         // image:{
    //         //     name:'test.jpg',
    //         //     description:'This is only test',
    //         // },
    //     }
    // );

    // product.save(function (err) {
    //     if (err) {
    //         res.send('Product Not Created successfully');
    //     }
    //         res.redirect('/products');
    //     // res.send('Product Created successfully');
    // })
// };

// exports.all_product = function (req,res){
	// Product.find(function(err,product){
	// 	if (err) return next(err);
 //        res.render('product',{title: "Products",data:product});
	// });
// }

// exports.add_product = function(req,res){
// 	res.render('add-product',{title: "Add Product"});
// }

// exports.edit_product = function(req,res){
//     var id = req.params.id;

//     request({
//     url: 'http://localhost:5000/products/'+id,
//     method: 'GET',
//     }, function(err, response, body) {
//         res.render('edit-product',{title: "Edit Product",data:body});
//     });
// }

// exports.product_details = function (req, res) {
//     Product.findById(req.params.id, function (err, product) {
//         if (err) return next(err);
//         res.send(product);
//     })
// };


// exports.product_update = function (req, res) {
//     Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
//         if (err) return next(err);
//         res.send('Product udpated.');
//     });
// };


// exports.product_delete = function (req,res){
// 	Product.findByIdAndRemove(req.params.id, function (err) {
//         if (err) return next(err);
//         res.send('Deleted successfully!');
//     })
// }

