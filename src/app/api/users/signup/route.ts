import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest,NextResponse } from 'next/server';
import Profile from '@/models/profileModel';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';
import Cart from '@/models/cartModel';
connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody
        const user = await User.findOne({email})
        if (user){
            return NextResponse.json({error:'user already exists'},{status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = new User({
            username,
            email,
            password:hashedPassword,
        })
        const savedUser = await newUser.save()
        const newProfile  = new Profile({
            userId:savedUser._id,
        })
        const savedProfile = await newProfile.save()
        const newCart  = new Cart({
            profileId:savedProfile._id,
        })
        const savedCart = await newCart.save()
        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})
        return NextResponse.json({message:'user created',success:true})
        } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}