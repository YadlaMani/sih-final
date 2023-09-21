import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        require:true,
    },
    description:{
        type:String,
        default:''
    },
    stores:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'stores',
        nullable:true
    }],
    PhoneNumber:{
        type:Number,
        default:null
    },
    isVerifiedWithMobile:{
        type:Boolean,
        default:false
    },
    longitude:{
        type:Number,
        default:null
    },
    latitude:{
        type:Number,
        default:null
    },
    isVendor:{
        type:Boolean,
        default:false
    },
    isCustomer:{
        type:Boolean,
        default:false
    },
    isTransporter:{
        type:Boolean,
        default:false
    },
    DeliveryNotifications:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            VendorId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'profiles'
            },
            customerId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'profiles'
            } 
        }],
    ProductsNotifications:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products'
            },
            VendorId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'profiles'
            },
            customerId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'profiles'
            } 
        }
    ],
    communityId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'communities',
        default:null,
    },

})

const Profile = mongoose.models.profiles || mongoose.model('profiles',profileSchema);

export default Profile;