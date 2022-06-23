require('../src/db/mongoose')

const User = require('../src/models/user')

//62b1bf0b87d1a63f4d632032

// User.findByIdAndUpdate('62b1c1474f8c79a45990f238',{age: 1}).then((user)=> {
//     console.log(user);
//     return User.countDocuments({age:1});
// }).then((count)=>{
//     console.log(count);
// }).catch((err)=> {
//     console.log(err);
// })

//Asyn Await Example
const updateAgeAndCount = async (id , age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({age});
    return count;
}

updateAgeAndCount('62b1c1474f8c79a45990f238', 2).then((count) => {
    console.log(count);
}).catch((err)=>{
    console.log(err);
})
