'use client'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

export default function MobileVerifyPage() {

    const [user, setUser] :any   = useState()
    const [profile, setProfile] :any = useState()
    const [community,setCommunity] = useState({name:'ANANTNAG'})
    // ----------------------------GET USER DATA--------------------------------------------------------
  
    const getUserDetails = async()=>{
      const res = await axios.get('api/users/me')
      setUser(res.data.userdata)
      setProfile(res.data.profiledata)
    }

  // ----------------------------------------GET USER LOCATION--------------------------------------------

  const getLocation =()=>{
    try {
      navigator.geolocation.getCurrentPosition((position)=>{
      updateLocation(position.coords.latitude,position.coords.longitude).then(()=>{
        location.reload()
      })
      })
    } catch (error:any) {
      toast.error(error)
    }
  }
  // ----------------------------------------UPDATE LOCATION--------------------------------------------

  const updateLocation = async(latitude:any,longitude:any)=>{
    try {
    const res = await axios.post('api/users/setlocation',{latitude:latitude,longitude:longitude})
    console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

    const VerifyCommunity = async()=>{
    //   getLocation()
    //   if( ((32.17 < profile.latitude) && (36.58 > profile.latitude)) && ((73.26 < profile.longitude) && (83.30 > profile.longitude)))
    // {
    //     return true
    // }
    // else{
    //     return false
    // }
    return true
    
    }
    const setCommunityForUser= async()=>{
        try {
        const verified = await VerifyCommunity()
        if( verified === true){
            const res = await axios.post('api/users/setcommunity',community)
            console.log(res)
        }else{
          console.log('You are not allowed to')
        }
        } catch (error) {
            console.log(error)
        }
    }




  return (
    <>
    <input type="text" placeholder='community name' value={community.name} onChange={(e)=>{setCommunity({name:e.target.value})}}/>
    <button onClick={setCommunityForUser} >click me</button>
    </>
  )
}
