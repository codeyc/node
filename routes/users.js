const express = require('express');
const router = express.Router();
const UserData = require('../models/UserData');
const dtime = require('time-formater');

/* GET users listing. */
router.get('/', function(req, res, next) {
    UserData.find((err, doc) => {
        if (doc !== null) {
            res.render('users', { data: doc });
        }
    });

});

/*  data page  */
router.get('/data/:id', (req, res, next) => {
    let id = req.params.id;
    UserData.findById(id, (err, doc) => {
        res.render('data', {
            data: doc,
        });
    });
});

/*  detail page  */
router.get('/data/detail/:id', (req, res, next) => {
    let id = req.params.id;
    UserData.findById(id, (err, doc) => {
        console.log('doc:', doc);
        res.render('detail', {
            data: doc,
        });
    });
});

/* Usage Data Page */
router.get('data/usageData/:id', (req, res, next) => {
    res.render();
});

module.exports = router;
