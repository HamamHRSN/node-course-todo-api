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
var port = process.env.PORT || 3000;

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



app.listen(port, () => {

       console.log(`Started up at port: ${port}`);
});

module.exports = {app};