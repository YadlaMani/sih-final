import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Profile from '@/models/profileModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect()

export async function POST(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const profile = await Profile.findOne({userId:userId})
        profile.isVerifiedWithMobile = true
        await profile.save()
        return NextResponse.json({message:'Updated',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }


}