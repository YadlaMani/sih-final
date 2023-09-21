import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Store from '@/models/storeModel';
import Product from '@/models/productModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Cart from '@/models/cartModel';
import Profile from '@/models/profileModel';

connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const userId = await getDataFromToken(request)
        const profile  = await Profile.findOne({userId: userId})
        const {cartProducts } = reqBody
        const cart  = await Cart.findOne({profileId:profile._id})
        cart.products = []
        await cart.save()
        for (let i = 0; i < cartProducts.length; i++) {
            const product = await Product.find({_id:i})
            cart.products.push(product)
        }
        await cart.save()
        return NextResponse.json({message:'Product added',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }
}