'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { Key, ReactNode, use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';

export default function Page({ params }: { params: { id: Key } }) {
  const [store ,setStore] = useState(null)
  const [product,SetProduct] = useState(null)

  const GetProductInfo = async() =>{
    try {
        await axios.post('/api/users/getproductinfo',params).then((res)=>{
            console.log(res.data.data)
        })
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
    GetProductInfo()
  },[])
  
    return (
      <>
    {params.id}
      </>
  
    )
  }
  