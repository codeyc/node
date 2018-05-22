const UserData = require('../../models/UserData');

class Users {
    async users(req, res, next) {
        try {
            const doc = await UserData.find();
            if (doc) {
                res.render('users', { data: doc });
            }
        } catch (e) {
            console.log('err:' ,e);
        }

    }

    async data(req, res, next) {
        let id = req.params.id;
        try {
            const doc = await UserData.findById(id);
            if (doc) {
                res.render('data', {
                    data: doc,
                });
            }
        } catch (e) {
            console.log('err:' ,e);
        }
    }

    async detail(req, res, next) {
        let id = req.params.id;
        try {
            const doc = await UserData.findById(id);
            if (doc) {
                res.render('detail', {
                    data: doc,
                });
            }
        }
         catch (e) {
            console.log('err:', e);
        }
    }
}

module.exports = new Users();