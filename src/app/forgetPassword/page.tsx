"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function forgetPassword() {
  const router = useRouter();
 const [email, setEmail] = useState('')

 const sendMail = (e: any) => {
    e.preventDefault()
    if(!email) {
      toast.error("First fill your mail")
      return
    }
    try {
        axios.post('/api/users/forgetPassword',{email})
        toast.success("Password send on your mail");
        router.push('/login')
    } catch (error: any) {
        toast.error(error.message)
    }
 }
  return ( 
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-8 text-xl font-bold underline">Forget Pssword Page</h1>
      <label htmlFor="email">Email</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <button style = {{border: "1px solid orange", padding : "5px 10px", borderRadius:"10px"}} onClick={sendMail}>Send</button>
    </div>
  );
}
