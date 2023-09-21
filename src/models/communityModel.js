import mongoose from 'mongoose';

const communitySchema = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    famousFor: {
        type:String,
        required: true
    },
    majorDescription:{
        type:String,
        default:""
    },
    minorDescription:{
        type:String,
        default:""
    },
    Stores:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stores',
        nullable:true
    }],
})

const Community = mongoose.models.communities || mongoose.model('communities',communitySchema);

export default Community;