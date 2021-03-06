const express = require ('express');
const router = express.Router();
const Task = require ('../models/task');
const auth = require('../middleware/auth');

/*Post Task */
router.post('/tasks' , auth, async (req, res) => {

    const task = new Task ({
        ...req.body, //es6 operation to copy all values from req.body
        owner: req.user._id
    })

    try{
        await task.save();
        res.status(201).send(task);
    }catch (err){
        res.status(400).send(err);
    }

})

//***********fetch tasks **********/

router.get('/tasks' , auth , async (req,res) => {

    try{
        const tasks = await Task.find({owner: req.user._id});
        res.send(tasks);
    }catch(err){
        res.status(500).send();
    }

})

router.get('/tasks/:id' , auth ,async (req,res) => {
    const _id = req.params.id

    try{
        const task = await Task.findOne({_id , owner: req.user._id})

        if(!task){
            return res.status(404).send();
        }
        res.send(task);

    }catch(err){
        res.status(500).send();
    }
    
})

// **** Patch/Update Task  ***** //

router.patch('/tasks/:id', auth , async (req,res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description' , 'completed'];
    const isValidOperation = updates.every((update)=> {
        return allowedUpdates.includes(update);
    })

    if (!isValidOperation){
        res.status(400).send( {error:'Invalid Update'})
    }

    try{
        const task = await Task.findOne( { _id: req.params.id , owner: req.user._id});


        if (!task){
            return res.status(404).send();
        }
        updates.forEach(( update )=> {
            task[update] = req.body[update];
        })
        await task.save();
        
        res.status(201).send(task);
    }catch(err){
        res.status(400).send(err);
    }
})

/* Delete task */

router.delete('/tasks/:id' , auth , async (req,res) => {
    try{
        const task = await Task.findOneAndDelete({_id : req.params.id , owner: req.user.id});
        if (!task){
            return res.status(404).send();
        }
        res.send(task);
    }catch(err){
        res.status(500).send();
    }
})

module.exports = router;