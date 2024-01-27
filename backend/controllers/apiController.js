const Secret = require('../models/Secret');

const createPassword = async (req, res) => {

    // Username same as requested username
    if(req.params.username !== req.user) return res.sendStatus(401);
    
    // password doesn't exist
    const foundUser = await Secret.findOne({ username: req.params.username,  secretName: req.params.secretname}).exec();
    if (foundUser) return res.status(403).json({'msg': 'Already Exists'}); //Unauthorized 

    try{
        const result = await Secret.create({
            "username": req.params.username,
            "secretName": req.params.secretname,
            "secrets": req.body
        });
        console.log(result);

        return res.status(201).json({'Success': 'Secret Created'});
    }
    catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}

const getPassword = async (req, res) => {

    // Username same as requested username
    if(req.params.username !== req.user) return res.sendStatus(401);
    
    // secret doesn't exist
    const foundSecret = await Secret.findOne({ username: req.params.username,  secretName: req.params.secretname}).exec();
    if (!foundSecret) return res.status(401).json({'msg': 'Secret doesn\'t exist'}); //Unauthorized 

    return res.status(201).json(foundSecret);
}

const updatePassword = async (req, res) => {

    // Username same as requested username
    if(req.params.username !== req.user) return res.sendStatus(401);
    
    try{
        const update = { $set: {} };
        for (const field in req.body) {
            update.$set[`secrets.${field}`] = req.body[field];
        }
        const result = await Secret.updateOne({username: req.params.username, secretName: req.params.secretname}, update, {strict: false});
        if(!result) res.sendStatus(400);
        else
            return res.status(201).json({'msg':'Updated Successfully'});
    }
    catch(err){
        return res.sendStatus(500);
    }
}

const getAllPasswords = async (req, res) => {

    // Username same as requested username
    if(req.params.username !== req.user) return res.sendStatus(401);
    
    // secret doesn't exist
    const foundSecret = await Secret.find({ username: req.params.username}).exec();
    if (!foundSecret) return res.status(401).json({'msg': 'Secret doesn\'t exist'}); //Unauthorized 

    try{
        return res.status(201).json(foundSecret);
    }
    catch(err){
        return res.sendStatus(500);
    }
}

const deletePassword = async (req, res) => {

    // Username same as requested username
    if(req.params.username !== req.user) return res.sendStatus(401);
    
    // secret doesn't exist
    const result = await Secret.deleteOne({ username: req.params.username,  secretName: req.params.secretname});
    if (result.deletedCount===0) return res.status(401).json({'msg': 'Secret doesn\'t exist'}); //Unauthorized 

    return res.status(201).json({'msg':'Deleted Successfully'});
}

module.exports = { createPassword, getPassword, updatePassword, getAllPasswords, deletePassword };