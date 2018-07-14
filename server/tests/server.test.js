const expect = require('expect');
const request = require('supertest');

var {app} = require('./../server');
var {Todo} = require('./../models/todo');


beforeEach((done) => {
  Todo.remove({}).then(() => done());
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

           Todo.find().then((todos) => {    // to collect the data same we do in MongoDB here over mongoose from database
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
                    expect(todos.length).toBe(0);
                    done();
                  }).catch((e) => done(e));
            });
            
    });


});