const express = require('express');
const router = express.Router();

const Admin = require('../controller/index/index');
const Upload = require('../controller/api/upload');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/sign', Admin.sign);
router.post('/login', Admin.login);
router.post('/upload', Upload.uploadRecode);

module.exports = router;
