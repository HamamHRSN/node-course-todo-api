// const mongoose = require('mongoose');

// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/TodoApp');

require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');
var {authenticate} = require('./middleware/authenticate.js');
 


var app = express();
var port = /*process.env.PORT ||*/ 3000;

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


app.delete('/todos/:id', (req, res) => {

    // get the id 

    var id = req.params.id;


    // validate the id -> not valid ? return (404) 
      if (!ObjectID.isValid(id)) {
        return  res.status(404).send();
      }

    // remove todo by id 
       // success 
       // error
       // 400 with empty body
       Todo.findByIdAndRemove(id).then((todo) => {
           if (!todo) {
            return  res.status(404).send();
           }
           res.send({todo});
       }).catch( (e) => {
           res.status(400).send();
       });
});


app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return  res.status(404).send();
      }
    
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set:body}, {new:true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }  
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
}); 


app.post('/users', (req, res) => {
    
    var body = _.pick(req.body, ['email', 'password']);
    // var user = new User({
    //      email: req.body.email,
    //      password: req.body.password
    // });
    var user = new User(body);

    // User.findByToken
    // user.generateAuthToken

    user.save().then(() => {
        // res.send(user);
        return user.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.get('/users/me', authenticate, (req, res) => {
    //   var token = req.header('x-auth');

    //   User.findByToken(token).then((user) => {
    //       if (!user) {
    //         return Promise.reject();
    //       }

    //       res.send(user);
    //   }).catch((e) => {
    //      res.status(401).send();
    //   });
    res.send(req.user);
});

app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    //  res.send(body);
    User.findByCredentails(body.email, body.password).then((user) => {
        // res.send(user);
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);

        });
    }).catch((e) => {
        res.status(400).send();
    });
});

app.delete('/users/me/token', authenticate, (req, res) => {
     req.user.removeToken(req.token).then(() => {
         res.status(200).send()
     }, () => {
         res.status(400).send();
     });
});


app.listen(port, () => {

       console.log(`Started up at port: ${port}`);
});

module.exports = {app};