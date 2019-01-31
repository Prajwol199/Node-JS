const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);

router.get('/', product_controller.all_product);

router.post('/create', product_controller.product_create);

router.get('/create', product_controller.add_product);

router.get('/:id', product_controller.product_details);

router.put('/:id/update', product_controller.product_update);

router.get('/:id/update', product_controller.edit_product);

router.delete('/:id/delete', product_controller.product_delete);

module.exports = router;