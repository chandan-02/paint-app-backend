//validation middleware
const asyncHandler = require('../middleware/asyncHandler');
const ErrorResponse = require('../utils/ErrorResponse');
const { validationCheck, } = require('../middleware/validationCheck');
//models
const Paint = require("../model/paint");


exports.savePaint = asyncHandler(async (req, res) => {
    const { name, json, } = req.body;
    const schemaData = { name, json, user: req.user.userid };
    let validation = validationCheck(schemaData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const data = await Paint.create(schemaData);
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.updatePaint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { json, } = req.body;
    const schemaData = { json };
    let validation = validationCheck(schemaData);
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const data = await Paint.findOneAndUpdate({ _id: id }, schemaData, { returnOriginal: false });
        return res.status(201).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.getAllPaint = asyncHandler(async (req, res) => {
    try {
        const data = await Paint.find({ user: req.user.userid }).select('name')
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

exports.getSinglePaint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Paint.findOne({ _id: id })
        return res.status(200).json({ success: true, data });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})


exports.deletePaint = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Paint.deleteOne({ _id: id });
        return res.status(201).json({ success: true, data: `Deleted Successfully` });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
})

