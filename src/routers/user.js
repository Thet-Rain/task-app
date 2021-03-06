const express = require('express');
const router = new express.Router;
const User = require('../models/user');
const auth = require('../middleware/auth');

router.post('/users', async (req , res) => {
    const user = new User (req.body)

    try{
        
        const token = await user.generateAuthToken()
        res.status(201).send({user,token});
    }catch(e){
        res.status(400).send(e);
    }

})

//** LOGIN * */
router.post('/users/login', async (req,res) => {
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user,token});
    }catch(e){
        res.status(400).send();
    }
})

//** LOGOUT */
router.post('/users/logout', auth, async (req,res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save();

        res.send()
    }catch(e){
        res.status(500).send();
    }
})

//**** LOG OUT ALL */
router.post('/users/logoutall' , auth , async (req,res) => {
    try{
        req.user.tokens = [];
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
})

//*********feth user*************//
router.get('/users/me' , auth, async (req, res) => {
    
    res.send(req.user);
})

// **** Patch/Update user ****////

router.patch('/users/me', auth , async (req,res) => {
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','password','age'];
    const isValidOperation = updates.every((update)=>{
        return allowedUpdates.includes(update);
    })

    if (!isValidOperation){
        return res.status(400).send({ error: 'Invalid REquest'})
    }
    
    try{
        updates.forEach((update)=> {
            req.user[update] = req.body[update];
        })

        await req.user.save();
        res.send(req.user);

    }catch(err){
        res.status(400).send(err);
    }
})

//***** Delete User ****/

router.delete('/users/me', auth , async (req,res) => {
    try{
        
        await req.user.remove()
        res.send(req.user);
    }catch (err){
        res.status(500).send();
    }
})

module.exports = router;