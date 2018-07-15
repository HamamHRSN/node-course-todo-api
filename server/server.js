// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

var express = require('express');
var bodyParser = require('body-parser');

var {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
// var {User} = require('./models/user.js');
 


var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    //  console.log(req.body);
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc) => {
        // console.log('Saved Todo' , doc);
        res.send(doc);
        
        }, (e) => {
        //    console.log('Unable to Save todo', e);
        res.status(400).send(e);
           
        });
     
});



app.get('/todos', (req, res) => {
     Todo.find().then((todos) => {
         res.send({todos})
     }, (e) => {
        res.status(400).send(e);
     });
});

app.get('/todos/:id', (req, res) => {
//   res.send(req.params);
var id = req.params.id;
if (!ObjectID.isValid(id)) {
    // console.log('ID not valid');
    res.status(404).send();  
}
Todo.findById(id).then((todo) => {
    if (!todo) {
        // console.log('Unable to find id');
      return  res.status(404).send();
    }
    res.send({todo});
}).catch((e) => {
    res.status(404).send(); 
})

});



app.listen(3000, () => {

       console.log('Started on port 3000');
});

module.exports = {app};









// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String
//     },
//     completed:{
//         type: Boolean
//     },
//     completedAt: {
//         type: Number
//     }
// });

// var Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true

//     },
//     completed:{
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default:null
//     }
// });


// var newTodo = new Todo({
//     text:'Cook dinner'
// });

// newTodo.save().then((doc) => {
//     console.log('Saved Todo', doc);
    
// }, (e) => {
//     console.log('Unable to save Todo',e);
    
// });

// var otherTodo = new Todo({
//     text: 'Feed the cat',
//     completed:true,
//     completedAt:123
// });
// otherTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
    
// }, (e) => {
//     console.log('Unable to Add otherTodo', e);
    
// })

// var otherTodo2 = new Todo({
//     text: 'Edit the video',
// });
// otherTodo2.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2));
    
// }, (e) => {
//     console.log('Unable to Add otherTodo', e);
    
// })




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