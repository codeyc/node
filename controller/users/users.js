const UserData = require('../../models/UserData');

class Users {
    constructor() {
        this.database = null;
        this.data = this.data.bind(this);  // 改变data函数中的this指向
        this.detail = this.detail.bind(this);
        this.Config = this.Config.bind(this);
        this.more = this.more.bind(this);
    }
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
                this.database = doc;
                res.render('data', {
                    data: doc,
                });
            }
        } catch (e) {
            console.log('error:',e);
        }
    }

    async detail(req, res, next) {
        let index = req.params.index;
        res.render('detail', {
            data: this.database,
            index: index,
        })
    }

    async more(req, res, next) {
        let i = req.params.i;
        let index = req.params.index;
        res.render('more', {
            data: this.database,
            index: index,
            i: i,
        })
    }

    async Config(req, res, next) {
        let index = req.params.index;
        res.render('ConfigPreset', {
            data: this.database,
            index: index,
        });
    }
}

module.exports = new Users();