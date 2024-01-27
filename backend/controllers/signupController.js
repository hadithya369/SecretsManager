const User = require('../models/User');
const bcrypt = require('bcrypt');

const regNewUser = async(req, res) => {
    const {user, pwd} = req.body;
    // Check if request contains user and password
    if(!user || !pwd) return res.status(400).json({"msg": "Username and password are required"});

    // Check for duplicate users
    const dup = await User.findOne({username: user}).exec();
    if(dup) return res.status(409).json({'msg': `User ${user} already exists`}); // Conflict

    try{
        const hashedPwd = await bcrypt.hash(pwd, 10);

        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });
        console.log(result);

        res.status(201).json({'success': `New user ${user} created`});
    }
    catch(err){
        console.log(err);
        res.status(500).json({'msg': 'Couldnt create user'});
    }
}

module.exports = {regNewUser};