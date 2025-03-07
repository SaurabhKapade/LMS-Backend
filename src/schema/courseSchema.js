const mongoose = require('mongoose');
const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Title should be provided'],
        minlength:[10,'Title should be minimum 10 character long'],
        maxlength:[20,'Title should be less than or equal 20 character']
    },
    description:{
        type:String,
        required:[true,'description should be provided'],
        minlength:[10,'description should be minimum 10 character long'],
        maxlength:[20,'description should be less than or equal 20 character']
    },
    teacher:{
        type:mongoose.Types.ObjectId,
        ref:'Teacher',
        required:[true,'Instructor Name must be provided']   
    },
    thumbnail:{
        type:String
    },
    public_id:{
        type:String
    },
    category:{
        type:String,
        enum:['Data Science & Analytics','Banking & Finance','Software Development Courses','Programming Courses']
    },
    sessions:[{
        title:{
            type:String,
            // required:[true,'Module must have title'],
            minlength:[5,'title should be minimum 10 character long'],
            maxlength:[20,'title should be less than or equal 20 character']
        },
        session:{
           public_id:{
            type:String  // it is url for video session
           },
           secure_url:{
            type:String
           },
           comments:[{
             comment:{
                type:String
             },
             comment_creator:{
                type:mongoose.Types.ObjectId,
                ref:'Student'
             }
           }]
        }
    }],
    session_count:{
        type:Number,
        default:0
    },
    students_enrolled:{
        type:Number,
        default:0,
    },
    level:{
        type:String,
        enum:['Beginner','Intermediate','Advanced'],
    },
    price:{
        type:Number
    },
    outcomes:[{
        type:String
    }]
},{timestamps:true})
const Course = mongoose.model('Course',courseSchema);
module.exports = Course