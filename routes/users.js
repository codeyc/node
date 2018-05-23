const express = require('express');
const router = express.Router();
const Users = require('../controller/users/users');

/* GET users listing. */
router.get('/', Users.users);
router.get('/data/:id', Users.data);
router.get('/data/detail/:index', Users.detail);
router.get('/data/detail/more/:index/:i', Users.more);
router.get('/data/ConfigPreset/:index', Users.Config);

module.exports = router;
