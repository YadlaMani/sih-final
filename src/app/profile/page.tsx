'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] :any   = useState()
  const [profile, setProfile] :any = useState()

  // ----------------------------GET USER DATA--------------------------------------------------------

  const getUserDetails = async()=>{
    const res = await axios.get('api/users/me')
    setUser(res.data.userdata)
    setProfile(res.data.profiledata)
    console.log(res.data)
  }
  // -------------------------------------LOGOUT-----------------------------------------------
  const logout = async ()=>{
    try {
      await axios.get('api/users/logout')
      router.push('/signup')
    } catch (error:any) {
      console.log(error.message)
    }
  }
  // ---------------------------------------LOAD AT VISIT---------------------------------------------

  useEffect(()=>{
    getUserDetails()
  },[])




  return (
    <>
    ProfilePage
    <br/>
    <button onClick={logout} >logout</button>
    <br/> 
      {user != null && <><p>{user.username}</p>
      <p>{user.email}</p>
      <p>{profile.description}</p>
      <p>{user.isVerifiedWithEmail === false && profile.isVerifiedWithMobile === false  ?  'not verified' : 'verified' }</p> 


      {profile.isVendor === false ? <Link href={'/manage'} >Become Vendor</Link> : <Link href={'/manage'} >Manage Stores</Link> }
      {profile.isTransporter === false ? <Link href={'/managetransporter'} >Become Transporter</Link> : <Link href={'/managetransporter'} >Manage Notifications</Link> }
      {profile.isCustomer === false ? <Link href={'/managecustomer'} >Verify Details To Buy</Link> : <Link href={'/managecustomer'} >Your Orders</Link> }
      </>
      }
    <br />
    <br />

    </>
  )
}


