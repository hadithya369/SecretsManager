const User = require('../models/User');
const bcrypt = require('bcrypt');

const testPage = async(req, res) => {
    res.status(200).json({'msg':'helloooo'});
}

module.exports = {testPage};