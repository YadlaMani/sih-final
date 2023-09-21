'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const[notifications,setNotifications] = useState(null)
  const [profile, setProfile] :any = useState(null)

    const getUserDetails = async()=>{
      const res = await axios.get('api/users/getdeliverynotifications')
      setProfile(res.data.profiledata)
      console.log(res.data.profiledata.DeliveryNotifications)
    }

    useEffect(()=>{
      getUserDetails()
    },[])

    const setUserToTransporter = async()=>{
        try {
            const res = await axios.get('api/users/setusertotransporter')
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
     {profile.isTransPorter === false ? <>
     
     Your Delivery Notifications Here
     
     </> : <>
     {profile.isVerifiedWithMobile === false ? <> <Link href={'/verifymobile'} > Verify Mobile</Link> </> : <> Your Phone Number Is Verified Click Below Button For Confirmation
      <br /><button onClick={setUserToTransporter} >Become Transporter</button></> }
     </>
     }
    </>
  )
}


