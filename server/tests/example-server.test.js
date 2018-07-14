const request = require('supertest');
const expect = require('expect');

const app = require('./../example-server');
const {User} = require('./../mdoles/user');

beforeEach((done) => {
    User.remove({}).then(() => done());
});


describe('POST /user', () => {
    it('should create new user', (done) => {
        var email = 'naya@naya.com';
        
         request(app)
         .post('/users')
         .send({email})
         .expect(200)
         .expect((res) => {
             expect(res.body.email).toBe(email);
         })
         .end((err, res) => {
             if (err) {
                 return done(err);
             }
         
         
         User.find().then((user) => {
            expect(user.length).toBe(1);
            expect(user[0].email).toBe(email);
            done();
         }).catch((err) => done(err));
        });
    });
});