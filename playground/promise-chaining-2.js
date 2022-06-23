require('../src/db/mongoose')

const Task = require('../src/models/task')

//62b1c3f8fcc71fc48b7bd17f

// Task.findByIdAndDelete('62b1c36af78f0739cd0d8b8b').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({task: false});
// }).then((count)=>{
//     console.log('Incompleted task/s - ' + count)
// }).catch((err)=>{
//     console.log(err);
// })

const deleteAndCount = async (id , bool) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed : bool})
    return count;
}

deleteAndCount('62b1c3f8fcc71fc48b7bd17f' , false).then((count)=>{
    console.log('incompleted tasks - ' + count);
}).catch((err)=> {
    console.log('error - ' + err);
})