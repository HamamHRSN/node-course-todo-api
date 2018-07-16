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





// var User = mongoose.model('users',{
//     name:{
//          type: String,
//          trim: true,
//          minlength: 1

//     },
//     email:{
//         type:String,
//         minlength: 5,
//         required: true,
//         trim: true,
        
//     },
//     password: {
//         type: String,
//         minlength:5
//     } 
    
// });

// var user = new User({
//   name: 'Rouaa Aljebbeh         ',
//   email: 'rouaa@gmail.             com',
//   password:'123abc'   
// });
// user.save().then((doc) => {
//     console.log('Saved User', doc);
    
// }, (e) => {
//     console.log('Unable to save User');
    
// });