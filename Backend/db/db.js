const mongoose= require('mongoose');

function connectToDb()
{
    mongoose.connect(process.env.ID).then (()=>{
        console.log('connected to Database');
    }).catch(err=>
        console.log('error in database')
    );
}
module.exports= connectToDb;