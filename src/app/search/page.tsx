'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { Key, use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProfilePage() {
  const[products,SetProducts] = useState([])
  const [user, setUser] :any   = useState(null)
  const [profile, setProfile] :any = useState([null])
  const[query, setQuery] :any = useState({name:''})
  const [cartProducts, setCartProducts]:any = useState([])
    const getUserDetails = async()=>{
      const res = await axios.get('api/users/me')
      setUser(res.data.userdata)
      setProfile(res.data.profiledata)
    }
    const getProducts = async()=>{
      try {
          await axios.post('api/users/getproductsforsearch',query).then((res)=>{
          SetProducts(res.data.data)
        })
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(()=>{
      getUserDetails()
      getProducts()
    },[])


    const AddToCartDatabase = async()=>{
      try {
        // await axios.post('api/users/addtocart',{cartProducts:cartProducts})
        console.log(cartProducts)
      } catch (error) {
        console.log(error)
      }
    }
    const AddToCart = async(id:Key)=>{
      try {

          const newArray = [...cartProducts]
          newArray.push(id)
          setCartProducts(newArray)
          console.log(cartProducts)
        
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <>
    {(cartProducts.length > 1) ? <>
    <button onClick={(e)=>{ e.preventDefault();AddToCartDatabase()}} >Finalize Cart {cartProducts.length -1 } </button>
    </>:<>No Products Added</>}
     {products.length > 0 && products.map((product:any)=>{
       return <div key={product._id} className="m-10 mx-2 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8">
       <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
         <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
           <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl"> <Link href={`/search/products/${product._id}`} >{product.name}</Link> </h2>
           <p className="mt-2 text-lg">{product.storeId.name}</p>
           <p className="mt-2 text-lg">{product.price}</p>
           <p className="mt-4 mb-8 max-w-md text-gray-500">{product.description}</p>
           <button onClick={(e)=>{e.preventDefault();AddToCart(product._id)}}  className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-purple-600 px-6 py-2 text-white transition">
             <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Add To Cart </span>
             <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
               <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
             </svg>
           </button>
           
         </div>

         <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
           <Image priority={false} width={1080} height={720} alt='any image' className="h-full w-full object-cover" src={`${product.imageurl}`} loading="lazy" />
         </div>
       </div>
     </div>
     })}
     
    </>
  )
}


