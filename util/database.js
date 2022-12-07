const mongodb=require('mongodb')

const MongoClient=mongodb.MongoClient;

let _db;

const mongoConnect=(callback)=>{
  MongoClient.connect('mongodb+srv://Harsh:Harsh1005@cluster0.bubrebl.mongodb.net/shop?retryWrites=true&w=majority')
  .then(client=>{
    console.log('Connected');
    _db=client.db();
    callback();
  })
  .catch(err=>{
    console.log(err);
    throw err;
  })
}

const getDb=()=>{
  if(_db){
    return _db;
  }
  throw 'No databae found';
}

exports.mongoConnect=mongoConnect;
exports.getDb=getDb;