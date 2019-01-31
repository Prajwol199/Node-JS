const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/user.controller');

router.get('/test', user_controller.test);

router.get('/', user_controller.all_user);

router.post('/add',user_controller.add_user);

router.get('/add',user_controller.user_add);

router.get('/:id',user_controller.user_detail);

router.put('/update/:id',user_controller.update_user);

router.get('/update/:id',user_controller.edit_user);

router.delete('/delete/:id',user_controller.user_delete);

module.exports = router;