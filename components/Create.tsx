import Link from "next/link";
import { resolve } from "path";
import React, { useState } from "react";
import { useRouter } from "next/router";
import {ClipLoader} from 'react-spinners';
 
function Create() {
    const [content , setContent]=useState('');
    const [loading , setLoading] =useState(false)
    const router = useRouter();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true)


        const user =JSON.parse(localStorage.getItem('user'));
        if(!user){
            setLoading(false)
            alert("User data not found in local storage");
            return;
        }

        const postData ={
            user: user.name,
            profileImage:user.profile,
            content:content
        };

        try{
            const response =await fetch("http://127.0.0.1:5000/predict",{
                method: "POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(postData)
            });

            const result  =await response.json()
            setLoading(false)
            if(response.ok){
              console.log(result);
              router.push('all-post')

            }else{
              alert("Prediction failed: "+result.error)
            }

        }catch (error){
            console.error("Error:",error)
            setLoading(false);
            alert("An error occurred while predicting the post")
        }
    }


  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-4">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-5 text-white text-center text-2xl font-bold sm:text-3xl">
          Create Post
        </h1>
        <form 
        onSubmit={handleSubmit}
        className="mb-0 space-y-4 rounded-lg bg-gray-900 p-4 shadow-lg sm:p-6 lg:p-8">
          <div>
            <label htmlFor="postContent" className="sr-only">
              Post
            </label>
            <div>
              <textarea
                id="postContent"
                rows={6}
                value={content}
                onChange={(e)=> setContent(e.target.value)}
                placeholder="Create your Post"
                className="w-full rounded-lg border-gray-200 p-4 text-sm shadow-sm"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="block w-full bg-indigo-600 rounded-lg px-5 py-3 text-sm font-medium text-white"
          >
            {loading?(
              <div>
                <div className="flex justify-center">
                <ClipLoader color ='#ffffff' size={20}/>
                </div>

              </div>
            ):('Predict Post')}
          </button>

          <p className="text-center text-sm text-gray-500">
          <Link

          href={"/all-post"}
          >
                      Go Back to All Post
          </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Create;
