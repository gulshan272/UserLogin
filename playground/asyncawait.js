require('../src/db/mongoose') ;
const User=require('../src/models/user');

// Task.findByIdAndDelete('').then((task)=>
// {
//     console.log(task);
//     return Task.countDocuments({completed:false})
// }).then((result)=>{
//     console.log(result);
// }).catch((e)=>
// {
//     console.log(e);  
// });

const updateandcount= async(id,age)=>{
const user=await User.findByIdAndUpdate(id,{age})
const count=await User.countDocuments({age})
//return count
return user
}
updateandcount('5d14370b09af2d0b44ad0564',2).then((count)=>
{
    console.log(count);
}).catch((e)=>{
console.log(e);
})
