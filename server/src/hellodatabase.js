var MongoClient = require('mongodb').MongoClient;

//Connect to database named 'facebook'
var url = 'mongodb://localhost:27017/facebook';

MongoClient.connect(url, function(err, db) {
  if(err) {
    throw new Error("Could not connect to database: " + err);
  }
  else {
    console.log("Connected correctly to server.");
    mongoExample(db);
  }
});

function insertExample(db, callback) {
  var exampleDocument = {
    message: "Hello World!"
  };
  //Insert the example document into collection 'helloworld'.
  db.collection('helloworld').insertOne(exampleDocument, function(err, result) {
    if(err) {
      throw err;
    }
    else {
      //Success!
      console.log("Successfully updated database! The new object's ID is " + result.insertedId);
      callback(result.insertedId);
    }
  });
}

//Get a document from the helloworld document collection with a particular _id
function getHelloWorldDocument(db, id, callback) {
  //Our database query: Find an object with this _id
  var query = {
    "_id": id
  };
  //findOne returns the first object that matches the query.
  //Since _id must be unique, there will only be one object that matches
  db.collection('helloworld').findOne(query, function(err, doc) {
    if(err) {
      throw err;
    }
    else {
      //Success! If we found the document, then doc contains the document.
      //If we did not find the document, doc is null.
      callback(doc);
    }
  });
}

//Add a new document to helloworld collection, read the document, print the document
function mongoExample(db) {
  //Step 1: Insert the document
  insertExample(db, function(newId) {
    //Step 2: Read the document.
    getHelloWorldDocument(db, newId, function(doc) {
      //Step 3: Print the document.
      console.log("Wrote new object to helloworld collection:");
      console.log(doc);
    })
  })
}
