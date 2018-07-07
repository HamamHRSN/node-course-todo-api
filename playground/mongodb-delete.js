// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if (err) {
    return  console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');  
    
     // deleteMany

    //  db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result) => {
    //     console.log(result);
    //  });

     // deleteOne
     
        //  db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result) => {
        //     console.log(result);
        //  });

     // findOneAndDelete

    //  db.collection('Todos').findOneAndDelete({completed:false}).then((result) => {
    //     console.log(result);
    //  });



    // db.collection('users').deleteMany({name: 'Hamam Hamou'}).then((result) => {
    //    console.log(result);  
    // });


    db.collection('users').findOneAndDelete({_id:new ObjectID('5b3c5364709b5c22e8fd76ba')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));  
     });

    // client.close();
});