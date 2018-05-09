const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const dtime = require('time-formater');
const db = require('../db/db');   // connect mongodb
const crypto = require('crypto');
const qs = require('querystring');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/sign', (req, res, next) => {
    let account = req.body.username;
    let password = req.body.password;
    let checkPassword = req.body.check_password;
    if (password !== checkPassword) {
        res.render('index', { error: 'password and check password must be same!'});
    } else {
        if (account && password && checkPassword) {
            Admin.findOne({ user_name: account }, (err, doc) => {
                if (!err) {
                    if (doc) {
                        /*res.send({
                            status: 0,
                            type: 'USER_HAS_EXIST',
                            message: 'user has existed!',
                        });*/
                        console.log('user has exist!');
                        res.redirect('/');
                    } else {
                        const md5 = crypto.createHash('md5');
                        let newPassword = md5.update(password).digest('hex');
                        let newAdmin = Admin({
                            user_name: account,
                            password: newPassword,
                            status: 1,
                            create_time: dtime().format('YYYY-MM-DD HH:mm'),
                        });

                        newAdmin.save((err, response) => {
                            if (err) {
                                console.log('login error:', err);
                            } else {
                                console.log(response);
                                res.send('this is node');
                            }
                        });
                    }
                } else {
                    res.send('this is error:', err);
                }
            })
        } else {
            res.send({
                status: 0,
                type: 'login message',
                message: 'Please complete your information!'
            })
        }
    }

});

router.post('/login', (req, res, next) => {
    let account = req.body.username;
    let password = req.body.password;
    if (account && password) {
        const md5 = crypto.createHash('md5');
        let newPassword = md5.update(password).digest('hex');
        Admin.findOne({ user_name: account, password: newPassword }, (err, doc) => {
            if (doc !== null) {
                res.redirect('/users');
            } else {
                res.render('index', { error: 'username or password is wrong' });
            }
        })
    }
});

/*router.get('/users', (req, res, next) => {
    res.render('users');
})*/


/*  Update Data  */
router.post('/upload', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods:POST,GET,OPTIONS");
    res.header("Access-Control-Allow-Headers:x-requested-with,content-type");
    console.log(req.body);
    res.json({'status':'1','data':'success!'});
});



module.exports = router;
