// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/FaselitiesStudy', (err, client) => {
    if (err) {
    return  console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('FaselitiesStudy');  
    
    db.collection('Lisence').insertOne({ 
            name:'Hamam Hamou',
             age: 34,
             location:'Märsta' 
        }, (err, result) => {
             if (err) {
                 return console.log('Unable to insert users', err);
             }
             console.log(JSON.stringify(result.ops));
        });

    // client.close();
});