import mongoose from "mongoose";

mongoose.pluralize(null);

const collection = "adoptme_adoptions";

const schema = new mongoose.Schema({
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users'
    },
    pet:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Pets'
    }
})

const adoptionModel = mongoose.model(collection,schema);

export default adoptionModel;