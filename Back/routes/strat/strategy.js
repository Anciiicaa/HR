var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy
var passportJwt = require("passport-jwt")
var userModel = require("../../models/userModel")
const {config} = require('../../conn/config');

var localOptions ={
    usernameField: "email"
}

passport.use(new LocalStrategy(localOptions, async function(email, password, done){

    var user = await userModel.findOne({email:email})

    if (!user)
    {
        done(null, null, {
            message: "Credentials not valid"
        })
    }
    else
    {
        var validacija = user.validatePassword(password)

        if (validacija)
        {
            done(null, user)
        }
        else
        {
            done(null, null, {
                message: "Credentials not valid"
            })
        }
    }
}))

var jwtOptions = {
    secretOrKey: config.secret,
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken()
}


passport.use(new passportJwt.Strategy(jwtOptions, async function(jwt_payload,done){
    var user = await UserModel.findById(jwt_payload._id)
    console.log(jwt_payload)
    if (!user)
    {
        done(null, null, {
            message: "Credentials not valid!"
        })
    }
    else
    {
        done(null, user)
    }

}))

passport.authorizeRoles = (...roles) => (req,res,next) => {
    
    var validno = roles.find(role=> role === req.user.getRole())

    if (validno)
    {
        req.role = req.user.getRole()
        next()
    }
    else{
        res.status(403)
        res.send("Not Authorized")
    }

}


passport.log = () => (req,res,next) =>{
    req.logovano = true
    console.log("Ulogovan korisnik: "+req.user.email)

    next()
}

module.exports = passport