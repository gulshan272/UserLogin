const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task=require('./models/task')
const {sendWelcomeMail,sgSendCancelMail}=require ('./emails/account')
const path = require('path')
const t=path.resolve('package.json');
console.log(t)
const app = express()
const port = process.env.PORT 
const multer=require('multer')
app.use(express.json())


const upload=multer({
    dest:'images',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb)
   {
       if(!file.originalname.match(/\.(doc|docx)$/))
       {
           return cb(new Error('Please upload a DOc'))
       }cb(undefined,true)
   }
   
})

app.post('/upload',upload.single('upload'),(req,res)=>
{
    res.send()
},(error,req,res,next)=> res.status(400).send({error:error.message})



)
app.post('/users',async (req, res) => {
    const user = new User(req.body)

    // user.save().then(() => {
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
   try{
 await user.save()
 sendWelcomeMail(user.email,user.name)
 res.status(201).send(user)
   }catch(e){

   }res.status(400).send(e);
})

app.post('/tasks',async(req,res)=>
{
     const task=new Task(req.body)
    //  task.save().then(()=>
    //  {
    //  res.status(201).send(task);
    //  }).catch((e)=>
    //  {
    //     res.status(400).send(e);
    //  })
    try{
await task.save()

res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
    })

app.get('/users/:id',async(req,res)=>
{
    const _id= req.params.id;
//     User.findById(_id).then((user)=>
//     {
// if(!user)
// { //console.log(user);
  
//  return   res.status(404).send();
// }res.send(user);
//     }).catch((e)=>
//     {
//         return res.status(500).send(e)
//     })
try{
const user=await User.findById(_id)
if(!user){
return   res.status(404).send();
} res.send(user);
}catch(e){
    res.status(500).send(e)
}
})
app.patch('/user/:id',async(req,res)=>
{   const updates=Object.keys(req.body)
    const allowedUpdtes=['name','email','password','age']
    const isValidOperation=updates.every((update)=>allowedUpdtes.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error:'Invalid Updates!'})
    }

    try{
const user=await User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,runValidators:true})
if(!user)
{
    return res.status(404).send()
}res.send(user)

    }catch(e)   
    {
res.staus(400)
    }
})
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})