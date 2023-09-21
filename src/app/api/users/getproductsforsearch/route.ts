import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Product from '@/models/productModel';
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {name} = reqBody
        const products = await Product.find({name:{$regex:`${name}`}}).populate('storeId')
        return NextResponse.json({
            message:'products fetched successfully',
            data:products
        })
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }


}