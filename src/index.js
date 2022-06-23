const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');


const app = express();
const port = process.env.PORT || 3000

// express middle ware

// app.use((req,res, next) => {
//     if (req.method === 'GET'){
//         res.send('Get requests are disabled')
//     } else{
//         next();
//     }
// })

//express middle ware for maintenanec mode

// app.use((req, res, next)=> {
//     res.status(503).send('Server currently down for maintainance')
// })



//parses json
app.use(express.json())

//router for user
app.use(userRouter);

//router for task
app.use(taskRouter);


app.listen(port, ()=>{
    console.log('Server is up on port ' + port);
})


// const Task = require('./models/task');
// const User = require('./models/user')

// const main = async () => {
//     // const task = await Task.findById('62b3ac152ef149a087759e67');
//     // await task.populate('owner'); // find user associated with task and populate with user data to owner
//     // console.log(task.owner);

//     const user = await User.findById('62b3ab45ac3d288812ee1292');
//     await user.populate('tasks')
//     console.log(user.tasks)


// }

// main();