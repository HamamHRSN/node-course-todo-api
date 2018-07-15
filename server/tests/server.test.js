const expect = require('expect');
const request = require('supertest');

const {ObjectID} = require('mongodb');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');
var {User} = require('./../models/user');


// beforeEach((done) => {
//   Todo.remove({}).then(() => done());
// });

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
},
{
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
  });

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
        .post('/todos')
        .send({text})   // sending text:text es6 syntax that the text from variable up
        .expect(200)
        .expect((res) => {
           expect(res.body.text).toBe(text);
        })
        .end((err, res) => {    // here not using done but we use err and response
           if (err) {
               return done(err);               
           }

           Todo.find({text}).then((todos) => {    // to collect the data same we do in MongoDB here over mongoose from database
             expect(todos.length).toBe(1);
             expect(todos[0].text).toBe(text);
             done();    // the close of finding the results
           }).catch((e) => done(e))
        });
    });

    it('should not create todo with invilid body', (done) => {
            request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                  }).catch((e) => done(e));
            });
            
    });


    describe('GET /todos', () => {
        it('should get all todos', (done) => {
             request(app)
             .get('/todos')
             .expect(200)
             .expect((res) => {
                 expect(res.body.todos.length).toBe(2);
             })
             .end(done);
        });
    });



    describe('GET /todos/:id', () => {
       it('should return todo doc', (done) => {
       request(app)
       .get(`/todos/${todos[0]._id.toHexString()}`)
       .expect(200)
       .expect((res) => {
           expect(res.body.todo.text).toBe(todos[0].text);
       })
        .end(done);
       });


       it('should return 404 if todo not found', (done) => {
                var hexId = new ObjectID().toHexString();
          request(app)
          .get(`/todos/${hexId}`)
          .expect(404)
          .end(done);
       });
     

       it('should return 404 for non-object ids', (done) => {
        request(app)
        .get('/todos/123abc')
        .expect(404)
        .end(done);
     });

    });




});