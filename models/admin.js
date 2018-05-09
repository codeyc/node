
const mongoose =require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    user_name: String,
    password: String,
    status: Number,    // 1: normal admin  2: root admin
    create_time: String,
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;