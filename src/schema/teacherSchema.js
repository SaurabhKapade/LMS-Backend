const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const teacherSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'FirstName is required'],
        minlength:[3,'FirstName must be atleat 3 character long'],
        trim:true,
        maxlength:[20,'FirstName should be less than or eqal to 20 character']
    },
    lastName:{
        type:String,
        required:[true,'lastName is required'],
        minlength:[3,'lastName must be atleat 3 character long'],
        trim:true,
        maxlength:[20,'lastName should be less than or eqal to 20 character']
    },
    about:{
        type:String,
        minlength:[10,'Information must be atleast 10 character long'],
        maxlength:[150,'Information should be less than or equal to 150 character']
    },
    mobNo:{
        type:String,
        trim:true,
        maxlength:[10,'Mobile number should be of length 10'],
        minlength:[10,'Mobile number should be of length 10'],
        unique:[true,'Mobile number already in use'],
        required:[true,'Mobile number should be provided']
    },
    email:{
        type:String,
        trim:true,
        unique:[true,'e-mail alreay in use'],
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required:[true,'e-mail should be provided']
    },
    password:{
        type:String,
        required:[true,'password should be provided'],
        minlength:[6,'password should be minimum 6 character long'],
        select:false
    },
    role:{
        type:String,
        default:'Teacher'
    },
    created_courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course'
    }],
    avtar:{
        type:String
    },
    avatar_id:{
        type:String
    },
    about:{
        type:String,
        // minlength:[10,'Information must be atleast 10 character long'],
        maxlength:[150,'Information should be less than or equal to 150 character']
    },
    
},{timestamps:true});

teacherSchema.pre('save',async function(){
    this.password = await bcrypt.hash(this.password,10)
})

const Teacher = mongoose.model('Teacher',teacherSchema)
module.exports = Teacher