const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/app-node');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

// 会保持连接直到你的应用关闭
db.once('open', () => {
    console.log('connection');
});

module.exports =  db;
