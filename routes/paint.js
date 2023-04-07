const express = require("express");
const router = express.Router();

// controller 
const { deletePaint, getAllPaint, getSinglePaint, savePaint, updatePaint, getAllPaintPublic, likePaint } = require('../controller/paint');
const { ApiAuthentication } = require('../middleware/apiAuth');

router.route('/save').post(ApiAuthentication, savePaint);
router.route('/update/:id').put(ApiAuthentication, updatePaint);
router.route('/all').get(ApiAuthentication, getAllPaint);
router.route('/single/:id').get(ApiAuthentication, getSinglePaint);
router.route('/:id').delete(ApiAuthentication, deletePaint);
/* 
* New routes untested
*/
router.route('/all/public').get(ApiAuthentication, getAllPaintPublic);
router.route('/like/:id').put(ApiAuthentication, likePaint);

module.exports = router;