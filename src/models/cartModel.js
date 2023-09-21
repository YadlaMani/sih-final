import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    profileId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'profiles',
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products',
        default:[]
    }]
})

const Cart = mongoose.models.carts || mongoose.model('carts',CartSchema);

export default Cart;