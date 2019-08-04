//CURD Operation Perform

//const mongodb=require('mongodb');
//const MongoClient=mongodb.MongoClient;
const { MongoClient,ObjectID } =require('mongodb');
//const id=new ObjectID()
//console.log(id.id.length)//.getTimestamp());
const connectionURL=process.env.MONGODB_URL;
const databasename='taskmanager';
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>
{
    if(error)
    {
        console.log('Unable to connect',error);
    }
    console.log('Connected!!!');
    const db = client.db(databasename);
// db.collection('users').insertOne({_id:id,user:"Shashank",Age:27},(err,result)=>
// {
//     if(err)
//     {
//         return console.log('Unablr to insert user')
//     }else{
//         console.log(result.ops);
//     }

//});
// db.collection('users').findOne({name:'Shashank'},(err,data)=>
// {
//     if(err)
//     {
// return console.log('Unable to fetch');
//     }console.log(data);
// })
db.collection('users').find({Age:27}).toArray((error,user)=>
{
   console.log(user[0]); 
})

// const updatepromise=db.collection('users').updateOne({Age:27},{$set:{
//    name:'Gulshan' 
// }
// })
// updatepromise.then((result)=>
// {
//     console.log(result);
// }).catch((error)=>
// {
//     console.log(error);
// }
// )
db.collection('users').updateOne({Age:27},{$inc:{
        Age:-1 
     }
     }).then((result)=>
     {
         console.log(result);
     }).catch((error)=>
     {
         console.log(error);
     })
})