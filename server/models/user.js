var mongoose = require('mongoose');



var User = mongoose.model('users',{
    
    email:{
        type:String,
        minlength: 5,
        required: true,
        trim: true,
        
    } 
    
});

module.exports = {User};