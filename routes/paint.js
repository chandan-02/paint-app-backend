const express = require("express");
const router = express.Router();

// controller 
const { deletePaint, getAllPaint, getSinglePaint, savePaint, updatePaint } = require('../controller/paint');
const { ApiAuthentication } = require('../middleware/apiAuth');

router.route('/save').post(ApiAuthentication, savePaint);
router.route('/update/:id').put(ApiAuthentication, updatePaint);
router.route('/all').get(ApiAuthentication, getAllPaint);
router.route('/single/:id').get(ApiAuthentication, getSinglePaint);
router.route('/:id').delete(ApiAuthentication, deletePaint);

module.exports = router;