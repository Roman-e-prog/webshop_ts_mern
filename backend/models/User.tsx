const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    vorname:{type:String, required:true},
    nachname:{type:String, required:true},
    username:{type:String, required:true },
    email:{type:String, required:true },
    street:{type:String, required:true },
    number:{type:String, required:true },
    plz:{type:String, required:true },
    city:{type:String, required:true },
    password:{type:String, required:true },
    isAdmin:{type:Boolean, default:false},
}, 
    {timestamps:true}
)

module.exports = mongoose.model('User', UserSchema);