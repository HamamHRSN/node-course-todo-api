// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
    return  console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');  
    
    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
        
    //      console.log('Unable to fetch Todos', err);
    // });


    // db.collection('Todos').find({completed: false}).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
        
    //      console.log('Unable to fetch Todos', err);
    // });

    // db.collection('Todos').find({
    //     _id: new ObjectID('5b3aee9f709b5c22e8fd7693')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
        
    //      console.log('Unable to fetch Todos', err);
    // });


    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`Todos count: ${count}.`);
    // }, (err) => {
        
    //      console.log('Unable to fetch Todos', err);
    // });

    db.collection('users').find({name:'Hamam Hamou'}).toArray().then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        
         console.log('Unable to fetch Todos', err);
    });


    // client.close();
});