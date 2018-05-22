const express = require('express');
const router = express.Router();
const Users = require('../controller/users/users');

/* GET users listing. */
router.get('/', Users.users);
router.get('/data/:id', Users.data);
router.get('/data/detail/:id', Users.detail);

module.exports = router;
