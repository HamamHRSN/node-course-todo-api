// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


// var user = {name:'Hamam', age:34};
// var {name} = user;
// console.log(name);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
    return  console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');  

    // db.collection('Todos').insertOne({
    //     text:'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return  console.log('Unable to insert todo', err);
    //         }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
        
    // });

// db.collection('users').insertOne({
//     _id:1, 
//     name:'Hamam Hamou',
//      age: 34,
//      location:'Märsta' 
// }, (err, result) => {
//      if (err) {
//          return console.log('Unable to insert users', err);
//      }
//      console.log(JSON.stringify(result.ops));
 

// db.collection('users').insertOne({
//     name:'Hamam Hamou',
//      age: 34,
//      location:'Märsta'
// }, (err, result) => {
//      if (err) {
//          return console.log('Unable to insert users', err);
//      }
//     //  console.log(JSON.stringify(result.ops[0]._id));
//     console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));

// });

    client.close();
});