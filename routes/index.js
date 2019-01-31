const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
var path = require('path')
const site_controller = require('../controllers/site.controller.js');
const Image = require('../models/image.model');

router.get('/', site_controller.index);

router.get('/image', site_controller.image);

router.post('/login',site_controller.login);

router.get('/login',site_controller.login_page);

router.delete('/image/delete/:id',site_controller.delete_image);
// <---------------- image upload -------------->
const upload = multer({
  dest: './public/images',
}); 
router.post('/upload', upload.single('upload'), (req,res) => {
	// res.send(req.file);
	let image = new Image(
        {
            // name: req.file.filename+path.extname(req.file.originalname),
            name: req.file.filename,
        }
    );

    image.save(function (err) {
        if (err) {
            res.send('Image Added successfully');
        }
            res.redirect('/image');
        // res.send('Product Created successfully');
    })
});

module.exports = router;