'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();
  const [user,setUser] = useState({
    email:'',
    password:'',
    username:'',
  })
  const [buttonDisabled,setButtonDisabled] = useState(false);
  const [loading,setLoading] = useState(false);
  

  const onSignup = async ()=>{

    try {
      setLoading(true);
      axios.post('api/users/signup',user)
      console.log('succesfully created')
      router.push('/login')
    } catch (error:any) {
      toast.error(error.message)
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  } 

  useEffect(()=>{
    if (user.email.length>0 && user.username.length>0 && user.password.length>0){
      setButtonDisabled(false);
    }
    else{
      setButtonDisabled(true)
    }
  },[user])


  return (
    <>
    {/* <div>Signup</div>
  <div className='flex'> 
  <h1> {loading?'processing': 'signup'  } </h1>
    <hr/>
    <label htmlFor="username">username</label>
    <input className='p-2 border-gray-300 rounded-lg' type="text" id='username' value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder='username'/>
    <label htmlFor="email">email</label>
    <input className='p-2 border-gray-300 rounded-lg' type="email" id='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='email'/>
    <label htmlFor="password">password</label>
    <input className='p-2 border-gray-300 rounded-lg' type="password" id='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='password'/>
    <button className='p-2'  onClick={onSignup} >{buttonDisabled? 'no signup' : 'signup'}</button>
    <Link href='/login' className='p-2' >Visit Login</Link>
    </div> */}

<div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-purple-700 underline">
                {loading? 'processing' : 'Sign Up'}
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                    <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Username
                        </label>
                        <input
                        id='username' value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})} placeholder='username'
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Email
                        </label>
                        <input
                        id='email' value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})} placeholder='email'
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            className="block text-sm font-semibold text-gray-800"
                        >
                            Password
                        </label>
                        <input
                         id='password' value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})} placeholder='password'
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                  
                    <div className="mt-6">
                      {!buttonDisabled &&
                      <button  onClick={onSignup} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                      SignUp
                    </button>
                      }
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}Already have an account?{" "}
                    <Link href='/login' className='p-2' >Visit Login </Link>
                </p>
            </div>
        </div>

    </>
  )
}

