'use client';

import axios from 'axios'
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import React, { ReactNode, use, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';


export default function ManagePage() {
    const router = useRouter();
    const [add,setAdd] = useState(false)
    const [storedetails,setStoreDetails] = useState({name:'',description:''})
    const [selectedStore,setSelectedStore] = useState(null);
    const [editstoredetails,setEditStoreDetails] = useState({storeid:null,name:'',description:''})
    const [productdetails,setProductdetails] = useState({storeid:null,name:'',description:'',price:0,imageurl:'',category:''})
    const [stores,setStores]:any = useState()
    const [selectedOperation,setSelectedOperation] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [user, setUser] :any   = useState()
    const [profile, setProfile] :any = useState()



    const getUserDetails = async()=>{
      const res = await axios.get('api/users/me')
      setUser(res.data.userdata)
      setProfile(res.data.profiledata)
    }

    // -------------------------------UPLOAD FUNCTIONS FOR CLOUDINARY----------------------------------------------

    const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      setSelectedFile(file);
    };
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      console.log(selectedFile);
    };
  
    const UploadToCloudinary = async() =>{
      try {
          if (selectedFile?.type === 'image/png' || selectedFile?.type === 'image/jpeg' || selectedFile?.type === 'image/jpg'){
              
            const formdata = new FormData();
            formdata.append('file', selectedFile)
            formdata.append('upload_preset','cvrhackthon')
            const uploadResponse = await fetch(
              "https://api.cloudinary.com/v1_1/dvudkkxl4/image/upload",
              {
                method: "POST",
                body: formdata,
              }
            );
            const uploadedImageData = await uploadResponse.json();
            const imageUrl = uploadedImageData.url;
            return imageUrl
          }
          else{
              toast.error('Please upload only images')
          }
      } catch (error) {
          console.log(error);
      }
  
    } 

    const Add = async()=>{
      if (add === true){
        setAdd(false)
        setStoreDetails({name:'',description:''})
      }
      else{
        setAdd(true)
      }
    }
// -------------------------------------------------

const setupStore = async(a:string,key:any)=>{
  setSelectedOperation(a)
  setSelectedStore(key)
  if(a ==='EDIT'){
    setEditStoreDetails({...editstoredetails,storeid:key})
  }
  if(a ==='ADDPROD'){
    setProductdetails({...productdetails,storeid:key})
  }
}
  
const setUserToVendor = async()=>{
  try {
    const res = await axios.post('api/users/setusertovendor')
    console.log(res)
  } catch (error) {
    console.log(error)
    
  }
}

  // -------------------------------ADDING STORE---------------------------------------
    const CreateStore = async ()=>{
      try {
        if (storedetails.name !=''){
        const response = await axios.post('api/users/createstore',storedetails)
        console.log('succesfuly created',response)
        router.push('/profile')
        location.reload()
        }
        else{
          toast.error('Please fill all fields')
        }
  
      } catch (error:any) {
        console.log('creating failed',error.message)
        toast.error(error.message)
      }
    } 
  
    //  ------------------------------- UPDATE STORE --------------------------------

    const Updatestore = async ()=>{
      try {
        if (editstoredetails.name !=''){
        const response = await axios.post('api/users/updatestore',editstoredetails)
        console.log('succesfuly update',response)
        router.push('/manage')
        location.reload()
        }
        else{
          toast.error('Please fill all fields')
        }
  
      } catch (error:any) {
        console.log('creating failed',error.message)
        toast.error(error.message)
      }
    } 
  // ----------------------------------ADDING PRODUCT------------------------------------
  const AddProduct = async ()=>{
    try {
      const imageUrl = UploadToCloudinary();
      imageUrl.then((value:string)=>{
        productdetails.imageurl = value
      }).then( async ()=>{
        if (productdetails.name !='' || productdetails.price != 0 || productdetails.imageurl !='' || productdetails.storeid !=null || productdetails.category !=''){
        const response = await axios.post('api/users/addproduct',productdetails)
        console.log('succesfuly added',response)
        router.push('/manage')
        }
        else{
          toast.error('Please fill all fields')
        }
      }).then(()=>{
        location.reload()
      })
    } catch (error:any) {
      console.log('adding failed',error.message)
      toast.error(error.message)
    }
  } 
  // ----------------------------GET STORES INFORMATION------------------------------------------
  const getStores = async ()=>{
    const res = await axios.get('api/users/getstores')
    setStores(res.data.data)
  }
  useEffect(()=>{
    getStores()
    getUserDetails()
  },[])
  
    return (
      <>
      {(user != null || undefined && profile != null || undefined ) && 
      <>{profile.isVendor === true ?  <> 
    <h1>--------------------------------------STORES-------------------------------------------------</h1>
    {stores != undefined || null  ? stores.map((store:any)=>{
      return( 
        <div className="card" key={store._id}>
          <div>
          <h5 className="card-title">{store.name}</h5>
          <p >{store.description}</p>
          <button onClick={(e)=>{e.preventDefault();setupStore('EDIT',store._id)}} >Edit Store</button>
          <button onClick={(e)=>{e.preventDefault();setupStore('VIEW',store._id)}}>View Store</button>
          <button onClick={(e)=>{e.preventDefault();setupStore('ADDPROD',store._id)}} >Add Product</button>
          <Link href={`/manage/${store._id}`} >got to store</Link>
          </div>
        </div>
        )
      })
    : <>
    No stores
    </>
    }
    

      { (stores!=null ||undefined) && stores.map((store:any)=>{
        return (
          <div key={store._id} >
          <div>
            <h1>-----------------------------------EDIT STORE------------------------------------------</h1>
            {(selectedOperation=== 'EDIT' && selectedStore == store._id ) && <>
            <div className="card" key={store._id}>
            <p>Editing : {editstoredetails.storeid}</p>
            <input  value={editstoredetails.name} onChange={(e)=>setEditStoreDetails({...editstoredetails,name:e.target.value})} placeholder='store name' type="text"/>
            <input  value={editstoredetails.description} onChange={(e)=>setEditStoreDetails({...editstoredetails,description:e.target.value})} placeholder='store desc' type="text"/>
            <button onClick={Updatestore}>Update Store</button>
            </div>
            </>}
          </div>
          <div>
          <h1>-----------------------------------VIEW STORE------------------------------------------</h1>
          {(selectedOperation=== 'VIEW' && selectedStore == store._id ) && <>
          {(store.products.length > 0 ) ? <>
          {store.products.map((product:any)=>{
            return <div key={product._id} className="m-10 mx-4 max-w-screen-lg overflow-hidden rounded-xl border shadow-lg md:pl-8">
          <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
            <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
              <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">{product.name}</h2>
              <p className="mt-2 text-lg">{store.name}</p>
              <p className="mt-2 text-lg">{product.price}</p>
              <p className="mt-4 mb-8 max-w-md text-gray-500">{product.description}</p>
              <button  className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-purple-600 px-6 py-2 text-white transition">
                <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Edit Details </span>
                <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            <div className="order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-2/5">
              <Image width={1080} height={720} alt='any image' className="h-full w-full object-cover" src={`${product.imageurl}`} loading="lazy" />
            </div>
          </div>
        </div>

          })}
          </> : <>No Products</> }
          </>}
          </div>
        <div>
        <h1>-----------------------------------ADD PRODUCT------------------------------------------</h1>
        {(selectedOperation=== 'ADDPROD' && selectedStore == store._id ) && <>
        <p>Adding To {store.name}</p>
        <input  value={productdetails.name} onChange={(e)=>setProductdetails({...productdetails,name:e.target.value})} placeholder='product name' type="text"/>
          <input  value={productdetails.description} onChange={(e)=>setProductdetails({...productdetails,description:e.target.value})} placeholder='product desc' type="text"/>
          <input  value={productdetails.price} onChange={(e)=>setProductdetails({...productdetails,price:Number(e.target.value)})} placeholder='product price' type="number"/>
          <input  value={productdetails.category} onChange={(e)=>setProductdetails({...productdetails,category:e.target.value})} placeholder='product category' type="text"/>
          <div className="App">
          <form onSubmit={handleSubmit}>
            <input type="file" onChange={handleFileInput} />
          </form>
        </div>
          <button onClick={(e)=>{e.preventDefault();AddProduct()}}>Add Product</button>
        
        </> }

          
        </div>
          </div>
        )
      })}

      <div>
        <h1>--------------------------------------ADD STORE-------------------------------------------------</h1>
        <button onClick={Add} >Add Store</button>
        {add && 
        <>
          <input  value={storedetails.name} onChange={(e)=>setStoreDetails({...storedetails,name:e.target.value})} placeholder='store name' type="text"/>
          <input  value={storedetails.description} onChange={(e)=>setStoreDetails({...storedetails,description:e.target.value})} placeholder='store desc' type="text"/>
          <button onClick={CreateStore}>Create Store</button>
        </>
        }
      </div>
      </> : <>
      
      {profile.isVerifiedWithMobile === false ?
      <> <Link href={'/verifymobile'} > Verify Mobile</Link> </>
      :
      <>
      {profile.communityId === null || undefined ?
       <> <Link href={'/verifycommunity'} > Set Community</Link> </> :
       <>
       Your Phone Number Is Verified Click Below Button For Confirmation
      <br /><button onClick={setUserToVendor} >Become Vendor</button>
      </> }
      </> }
      
      </> }
     </> }
      </>
  
    )
  }
  