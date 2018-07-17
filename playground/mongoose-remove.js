const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');



// To remove evrything from database use remove({}) with carly prases as remove all objects 
// Todo.remove({}).then((result) => {
//      console.log(result);
     
// });
 



// we can use id without new ObjectID() in mongoose

// finding object property like text:'somthing todo' or even _id any property from the object i wanna deleted
// Todo.findOneAndRemove({_id:'5b4d4cbef05f2c5ac8e306bc'}).then((res) => {
//     console.log(res);
    
// });

Todo.findByIdAndRemove('5b4d4cbef05f2c5ac8e306bc').then((res) => {
    console.log(res);
    
});