const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');

const userSchema= new mongoose.Schema({
    fullName:{
        firstName:{
            type :String,
            required: true,
            minlength:[3, 'It should be atleast 3 character long']
        },
        lastName:{
            type :String,
            minlength:[3, 'It should be atleast 3 character long']
        }
    },
    email:{
            type :String,
            required: true,
            unique:true,
            minlength:[5, 'It should be atleast 5 character long']
        },
    password:{
        type: String,
        required: true,
        select:false
    },
    socketId: {
        type:String
    }
})


userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
    return token;
}
userSchema.methods.comparePassword= async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword=async function (password) {
    return await bcrypt.hash(password,10);
    
}

const userModel= mongoose.model('user',userSchema);
module.exports= userModel;