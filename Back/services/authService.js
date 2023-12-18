const userModel = require('../models/userModel');

saveUser = function(body)
{
    if(body.email && body.username && body.password)
    {
        var newUser = new userModel(body.email,body.username,body.password);
        return newUser.saveUser();
    }
    else
        return undefined;
}

login = function(body)
{
    if(body.email && body.password)
    {
        return userModel.login(body.email,body.password);
    }
    else{
        return undefined
    }
}


module.exports = {
    saveUser,
    login
}