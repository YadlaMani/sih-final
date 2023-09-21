import {connect} from '@/dbConfig/dbConfig';
import { NextRequest,NextResponse } from 'next/server';
import Profile from '@/models/profileModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Community from '@/models/communityModel';

connect()

export async function POST(request:NextRequest){
    try {
        const userId = await getDataFromToken(request)
        const reqBody = await request.json()
        const {name} = reqBody
        const profile = await Profile.findOne({userId:userId})
        const community = await Community.findOne({name:name})
        profile.communityId = community._id
        await profile.save()
        return NextResponse.json({message:'Updated',success:true})
    }
    catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message},{status:500})

    }


}