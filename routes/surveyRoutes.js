const express = require('express');

const { surveys_get_all, surveys_get_by_owner, surveys_get_one,
        surveys_create_one, surveys_update_one, surveys_delete_one } = require('../controllers/surveyControllers');

const authMW = require('../middlewares/auth');
//const validMW = require('../middlewares/validator');

const router = express.Router();

router.get('/', surveys_get_all);
router.get('/personal/:owner', surveys_get_by_owner);
router.get('/:id', surveys_get_one);
router.post('/create', authMW, surveys_create_one);
router.put('/update/:id', surveys_update_one);
router.delete('/delete/:id', surveys_delete_one);

module.exports = router;