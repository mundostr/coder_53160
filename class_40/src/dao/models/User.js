import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'adoptme_users';

const schema = new mongoose.Schema({
    first_name:{
        type: String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role: {
        type:String,
        default:'user'
    },
    pets:{
        type:[
            {
                _id:{
                    type:mongoose.SchemaTypes.ObjectId,
                    ref:'Pets'
                }
            }
        ],
        default:[]
    }
})

const userModel = mongoose.model(collection,schema);

export default userModel;