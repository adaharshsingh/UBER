const userModel= require('../models/user.model');
const bcrypt= require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser= async(req,res,next)=>{
    const token = req.cookies.token||req.headers.authorization?.split(' ')[ 1 ];
    if(!token)
    {
        return res.status(401).json({message:'Please login to access this resource'});
    }
    const isBLacklisted= await  userModel.findOne({token:token});
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
}