const Doc = require('../models/Docmnt');
const mongoose = require('mongoose');


// Get all Docs
const getDox = async (req, res) => {
    const dox = await Doc.find({}).sort({createdAt: -1});

    res.status(200).json(dox);
}

// Get single Doc
const getDoc = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'The id is not valid id'})
    }

    const doc = await Doc.findById(id);

    if (!doc) {
        return res.status(404).json({error: 'No Such A Document Found!'})
    }

    res.status(200).json(doc);
}


// Create new Doc
const cr8Doc = async (req, res) => {
    // in server.js we defined app.use(express.json())
    // so we have access to all req.body
    // so we can destructure req.body
    const {title, text} = req.body;
    
    // try to add doc to db
    try {
        const doc = await Doc.create({title, text});
        res.status(200).json(doc);

    } catch(error) {
        res.status(400).json({error: error.message})
    }

    res.json();
}



// Delete a Doc
const delDoc = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'The id is not valid id'})
    }

    const doc = await Doc.findByIdAndDelete({_id: id})

    if (!doc) {
        return res.status(404).json({error: 'No Such A Document Found!'})
    }

    res.status(200).json(doc);
}



// Update a Doc
const upd8Doc = async (req, res) => {
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'The id is not valid id'})
    }

    const doc = await Doc.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!doc) {
        return res.status(404).json({error: 'No Such A Document Found!'})
    }

    res.status(200).json(doc);
}


module.exports = {
    getDox,
    getDoc,
    cr8Doc,
    upd8Doc,
    delDoc
}
