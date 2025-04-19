const userModel= require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');
const blacklistTokenModel= require('../models/blacklistToken.model');
const captainModel = require('../models/captain.model')

module.exports.authUser= async(req,res,next)=>{
    const token = req.cookies.token||req.headers.authorization?.split(' ')[ 1 ];
    if(!token)
    {
        return res.status(401).json({message:'Please login to access this resource'});
    }
    const isBLacklisted= await  blacklistTokenModel.findOne({token:token});
    if(isBLacklisted)
    {
        return res.status(401).json({message: 'Your LogIn time is expired, unauthorized access'});
    }
    try{
        const decoded = jwt.verify(token,process.env.SECRET_KEY);
        const user = await userModel.findById(decoded.id);
        req.user=user;
        return next();
    }
    catch(err)
    {
        return res.status(401).json({message:'Error, Unauthorized access'});
    }
};

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    
    if (!token) {
        return res.status(401).json({ message: 'Please login to access this resource' });
    }
    const isBlacklisted = await blacklistTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Your LogIn time is expired, unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const captain = await captainModel.findById(decoded._id);
        console.log(decoded.id)
        console.log(jwt.decode(token))
        req.captain = captain;
        console.log(captain)
        return next();
    } catch (err) {
        return res.status(401).json({ message: 'Error, Unauthorized access' });
    }
};