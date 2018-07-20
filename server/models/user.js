const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

//   {
//     email: 'hamamhamou.hrsa@gmail.com',
//     password: 'ggcjhgvghgkjkjhl',
//     tokens: [{
//         access: 'auth',
//         token: 'ghvghvhgvvhbszzdfxfchghh'
//     }]
//   }

var UserSchema = new mongoose.Schema({
     
    email:{
        type:String,
        minlength: 5,
        required: true,
        trim: true,
        unique: true,
        validate:{
            validator: validator.isEmail, 
            message: `{VALUE} is not a valid email.`
        }     
    },
    password:{
       type: String,
       require: true,
       minlength: 6
    },
    tokens: [{
        access: {
              type: String,
              requierd: true
        }, 
        token: {
            type: String,
            requierd: true
        }
    }]


});

UserSchema.methods.toJSON = function () {
 
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

    user.tokens = user.tokens.concat([{access, token}]);

   return  user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('users', UserSchema);

// var User = mongoose.model('users',{
    
//     // email:{
//     //     type:String,
//     //     minlength: 5,
//     //     required: true,
//     //     trim: true,
//     //     unique: true,
//     //     validate:{
//     //         validator: (value) => {
//     //              return validator.isEmail(value)
//     //         }, 
//     //         message: `{VALUE} is not a valid email.`
//     //     }  
//     // } 
    
//     email:{
//         type:String,
//         minlength: 5,
//         required: true,
//         trim: true,
//         unique: true,
//         validate:{
//             validator: validator.isEmail, 
//             message: `{VALUE} is not a valid email.`
//         }     
//     },
//     password:{
//        type: String,
//        require: true,
//        minlength: 6
//     },
//     tokens: [{
//         access: {
//               type: String,
//               requierd: true
//         }, 
//         token: {
//             type: String,
//             requierd: true
//         }
//     }]


// });

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