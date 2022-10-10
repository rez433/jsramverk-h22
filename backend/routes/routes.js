const express = require('express');
const router = express.Router();
const { getDocs, setDoc, upd8Doc, delDoc } = require('../docOps/docHandler');


router.route('/').get(getDocs).post(setDoc);

router.route('/:id').put(upd8Doc).delete(delDoc);



module.exports = router;
