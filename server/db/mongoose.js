const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(/*process.env.MONGODB_URI*/ 'mongodb://<dbuser>:<dbpassword>@ds139251.mlab.com:39251/todoapp' || 'mongodb://localhost:27017/TodoApp');


module.exports = {mongoose};