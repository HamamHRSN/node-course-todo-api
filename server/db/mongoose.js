const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(/*process.env.MONGODB_URI || 'mongodb://hamamhamou:salmahr0@ds139251.mlab.com:39251/todos' || */ 'mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};