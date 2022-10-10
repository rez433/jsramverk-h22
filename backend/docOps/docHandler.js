const asyncHandler = require('express-async-handler');
const Documnt = require('./docModel');



// @desc    Get Docs
// @route   Get /api/docs
// @access  Private

const getDocs = asyncHandler(async(req, res) => {
    const docs = await Documnt.find();
    res.status(200).json(docs)
})




// @desc    Set Doc
// @route   POST /api/docs
// @access  Private

const setDoc = asyncHandler(async(req, res) => {
    if(!req.body.title) {
        res.status(400);
        throw new Error('please add a title')
    };
    if(!req.body.text) {
        res.status(400);
        throw new Error('please add a text')
    };

    const doc = await Documnt.create({
        title: req.body.title,
        text: req.body.text
    })

    res.status(204).json(doc)
})



// @desc    Update Doc
// @route   PUT /api/docs/:id
// @access  Private

const upd8Doc = asyncHandler(async(req, res) => {

    const doc = await Documnt.findById(req.params.id);

    if(!doc) {
        res.status(400);
        throw new Error('Document not Find!');
    }

    const updatedDoc = await Documnt.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

    res.status(204).json(updatedDoc);
})



// @desc    Delete Doc
// @route   DELETE /api/docs/:id
// @access  Private

const delDoc = asyncHandler(async(req, res) => {

    const doc = await Documnt.findById(req.params.id);

    if(!doc) {
        res.status(400);
        throw new Error('Document not Find!')
    }

    const deletedDoc = await Documnt.findByIdAndDelete(req.params.id)

    res.status(204).json(deletedDoc)
})



module.exports = {
    getDocs,
    setDoc,
    upd8Doc,
    delDoc
};
