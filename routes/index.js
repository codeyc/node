const express = require('express');
const router = express.Router();
const Admin = require('../models/admin');
const dtime = require('time-formater');
const db = require('../db/db');   // connect mongodb
const crypto = require('crypto');
const UserData = require('../models/UserData');



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
    try {
        let data = req.body;
        let Data = new UserData();
        Data.SerialNumber = data.SerialNumber;
        // UserInfo Data
        Data.UserInfo.PatientName = data.UserInfo.PatientName;
        Data.UserInfo.PatientEmail = data.UserInfo.PatientEmail;
        Data.UserInfo.DoctorEmail = data.UserInfo.DoctorEmail;
        Data.UserInfo.DeviceName = data.UserInfo.DeviceName;

        // Config Data
        let Config = {};
        Config.ComplianceTime = data.Config[0];
        Config.Language = data.Config[1];
        Config.Brightness = data.Config[2];
        Config.Audible = data.Config[3];
        Config.NightMode = data.Config[4];

        // Preset Data
        let Preset = [];
        for(let i = 0; i < data.Preset.length; i++) {
            Preset.push({
                PresetNumber: i + 1,
                ElectrodeSize: data.Preset[i][0],
                StimulationType: data.Preset[i][1],
                ModeSettings: data.Preset[i][2],
                TreatmentTime: data.Preset[i][3],
                NumberOfCycles: data.Preset[i][4],
                NextPresetToUse: data.Preset[i][5],
                BeatFrequency: data.Preset[i][6],
            })
        }

        let Usage = [];
        for(let i = 0; i < data.Usage.length; i++) {
            // Usage Data
            if(data.Usage[i][0] === 'U') {
                Usage.push({
                    Type: data.Usage[i][0],
                    DateOfTreatment: `${ data.Usage[i][1][0] } ${ data.Usage[i][1][1] }`,
                    PresetNumber: data.Usage[i][2],
                    MinOfUse: data.Usage[i][3],
                    MinOfPause: data.Usage[i][4],
                    Channel1MaxAmpUsed: data.Usage[i][5],
                    Channel1AverageAmpUsed: data.Usage[i][6],
                    Channel2MaxAmpUsed: data.Usage[i][7],
                    Channel2AverageAmpUsed: data.Usage[i][8],
                })
            } else {
                // Q & A
                Usage.push({
                    Type: data.Usage[i][0],
                    DateOfTreatment:`${ data.Usage[i][1][0] } ${ data.Usage[i][1][1] }`,
                    PainBefore: data.Usage[i][2],
                    PainAfter: data.Usage[i][3],
                    DecrMeds: data.Usage[i][4],
                    HelpWork: data.Usage[i][5],
                    HelpHome: data.Usage[i][6],
                })
            }
        }

        Data.UpdateData.push({
            ConfigData: Config,
            PresetData: Preset,
            UsageData: Usage,
            UpdateTime: dtime().format('YYYY-MM-DD HH:mm'),
        });

        // save data
        UserData.findOne({ 'SerialNumber' : req.body.SerialNumber }, (err, doc) => {
            if (!doc) {
                Data.save((err, response) => {
                    // 还未保存过的用户，会新增用户id
                    console.log('save done');
                    res.json({'status':'1','data':'success!'});
                    res.end();
                });
            } else {
                // 已经保存过的用户，在原来的数据上添加数据
                console.log('has exist');
                res.json({'status':'1','data':'data has exist'});
                res.end();
            }
        });
    } catch (e) {
        console.log(e)
    }
});



module.exports = router;
