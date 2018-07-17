const express = require('express');

const authMW = require('../middlewares/auth');
const validMW = require('../middlewares/validator');

const { users_get_all, users_get_one, 
        users_create_one, users_authentication, 
        users_update_one, users_delete_one} = require('../controllers/userControllers');

const router = express.Router();

router.get('/', users_get_all);
router.get('/:id', authMW, users_get_one);
router.post('/signup', validMW, users_create_one);
router.post('/login', validMW, users_authentication);
router.put('/update/:id', validMW, users_update_one);
router.delete('/delete/:id', users_delete_one);

module.exports = router;