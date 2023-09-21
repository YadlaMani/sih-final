import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Profile from "@/models/profileModel";
import User from "@/models/userModel";
import { NextResponse,NextRequest } from "next/server";

connect();

export async function GET(request:NextRequest){
    try {

        const userId = await getDataFromToken(request)
        const profile = await Profile.findOne({userId:userId}).populate('DeliveryNotifications')
        console.log(profile)
        return NextResponse.json({
            message:'user found',
            profiledata:profile
        })
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}