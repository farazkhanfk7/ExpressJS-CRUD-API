const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../members');

//all json members
router.get('/',function(req,res){
    res.json(members);
});

// single json members
router.get('/:id',(req,res)=>{
    const found = members.some(member => member.id == req.params.id);
    if(found){
        res.json(members.filter(member => member.id == req.params.id));
    }else{
        res.json({msg:`The member with id:${req.params.id} doesn't exist`});
    }
});

// post it
router.post('/',(req,res)=>{
    const newUser = {
        id:uuid.v4(),
        name: req.body.name,
        email : req.body.email
    }

    if(!newUser.name || !newUser.email){
        return res.status(400).json({msg:"please include a name and email"});
    }

    members.push(newUser);
    //res.json(members);
    res.redirect('/');
});

// update it
router.put('/:id',(req,res)=>{
    const found = members.some(member => member.id == req.params.id);
    if(found){
        const updateUser = req.body;
        members.forEach(member=>{
            if(member.id == req.params.id){
                if(updateUser.name){
                    member.name = updateUser.name;
                }else{
                    member.name = member.name;
                }
                if(updateUser.email){
                    member.email = updateUser.email;
                }else{
                    member.email = member.email;
                }

                res.json({msg:"Member updated",member})
            }
        });
    }else{
        res.status(400).json({msg:`The member with id:${req.params.id} doesn't exist`});
    }
});

//to delete
router.delete('/:id',(req,res)=>{
    const found = members.some(member => member.id == req.params.id);
    if(found){
        res.json({
            msg:"user deleted", 
            members: members.filter(member => member.id != req.params.id)});
    }else{
        res.json({msg:`The member with id:${req.params.id} doesn't exist`});
    }
});

module.exports = router;

