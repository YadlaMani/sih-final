'use client';

import axios from 'axios'
import React from 'react'

export default function MobileVerifyPage() {

    const VerifyMobile = async()=>{
      try {
        const res = await axios.post('api/users/verifymobile')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div><button className='text border-l-amber-500' onClick={VerifyMobile} > click me</button></div>
  )
}
