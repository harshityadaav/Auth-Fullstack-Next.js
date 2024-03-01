"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
export default function changePssword() {
  const router = useRouter()
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const changePsswordHandler = async () => {
    if(!password || !confirmPassword){
      toast.error("First fill all fields")
      return;
    }
    if(password !== confirmPassword){
      toast.error("Both password are not same")
      return;
    }
    try {
      await axios.post("/api/users/changePassword", {
        password,
        confirmPassword,
      });
      toast.success('Password Changed Successfully')
      router.push('/profile')
    } catch (error: any) {
      toast.error(error.message)
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="mb-8 text-xl font-bold underline">Change Pssword Page</h1>
      <label htmlFor="password">Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />
      <button
        style={{
          border: "2px solid orange",
          padding: "5px 10px",
          borderRadius: "10px",
        }}
        onClick={changePsswordHandler}
      >
        Change Password
      </button>
    </div>
  );
}
