import Link from "next/link";
import React, { useEffect, useState } from "react";

function Header() {
    const[username, setusename]=useState('')

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"))
        if(user && user.name){
            setusename(user.name)
        }
    },[]);

  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl text-white font-bold sm:text-3xl">
              Welcome Back,{username}
            </h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Let write s post and predict using Machine Learning
            </p>
          </div>

          <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
            <Link 
            href={'/create-post'}
            className="block text-center rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring">
              Create a Post
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
