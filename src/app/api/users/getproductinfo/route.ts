import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Product from "@/models/productModel";
import Store from "@/models/storeModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function POST(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json()
        const {id} = reqBody
        const product = await Product.findOne({_id:id})
        return NextResponse.json({
            message:'Store found',
            data:product
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}