
const AdminModel = require('../../models/admin');
const crypto = require('crypto');
const dtime = require('time-formater');
class Admin {
    async sign(req, res, next) {
        let account = req.body.username;
        let password = req.body.password;
        let checkPassword = req.body.check_password;
        if (password !== checkPassword) {
            res.render('index', { error: 'password and check password must be same!'});
        } else {
            if (account && password && checkPassword) {
                try {
                    const admin = await AdminModel.findOne({ user_name: account });
                    if (admin) {
                        console.log('user has exist!');
                        res.redirect('/');
                    } else {
                        const md5 = crypto.createHash('md5');
                        let newPassword = md5.update(password).digest('hex');
                        let newAdmin = AdminModel({
                            user_name: account,
                            password: newPassword,
                            status: 1,
                            create_time: dtime().format('YYYY-MM-DD HH:mm'),
                        });

                        const newadmin = await newAdmin.save();
                        if (newadmin) {
                            res.redirect('/');
                            console.log('sign success');
                        } else {
                            console.log('save failed!')
                        }
                    }
                } catch (e) {
                    console.log('sign failed');
                }

            } else {
                res.send({
                    status: 0,
                    type: 'login message',
                    message: 'Please complete your information!'
                });
                res.end();
            }
        }

    }

    async login(req, res, next) {
        let account = req.body.username;
        let password = req.body.password;
        if (account && password) {
            const md5 = crypto.createHash('md5');
            let newPassword = md5.update(password).digest('hex');
            try {
                const admin = await  AdminModel.findOne({ user_name: account, password: newPassword });
                if (admin) res.redirect('/users');
                else {
                    res.render('index', { error: 'username or password is wrong' });
                    res.end();
                }
            } catch (e) {

            }
        }
    }
}

module.exports = new Admin();