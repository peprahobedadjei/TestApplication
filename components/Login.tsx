import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

function Login() {
  const [selectedProfile, setselectedProfile] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  console.log(selectedProfile);
  const images = [
    {
      name: "Image 1",
      src: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
    },
    {
      name: "Image 2",
      src: "https://wallpapers.com/images/hd/netflix-profile-pictures-5yup5hd2i60x7ew3.jpg",
    },
    {
      name: "Image 3",
      src: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-88wkdmjrorckekha.jpg",
    },
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      router.push("/all-post");
    }
  }, [router]);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (name && selectedProfile) {
      const user = { name, profile: selectedProfile };
      localStorage.setItem("user", JSON.stringify(user));
      router.push("/all-post");
    }
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="mb-8  text-center">
        <h1 className="text-white text-3xl font-bold">Create a Profile</h1>
      </div>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-8">
        {images.map((image) => (
          <div
            key={image.name}
            onClick={() => setselectedProfile(image.src)}
            className={`cursor-pointer text-center ${
              selectedProfile === image.src ? "border-4 border-indigo-800" : ""
            }`}
          >
            <div className="relative mb-2 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-700 hover:border-4 hover:border-red-500">
              <Image
                src={image.src}
                width={96}
                height={96}
                objectFit="cover"
                className="rounded-full"
                alt="Picture of the author"
              />
            </div>
            <p
              className={` text-center ${
                selectedProfile === image.src ? "text-red-500" : "text-white"
              }`}
            >
              {image.name}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-xs px-4 ">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="sr-only">
              Username
            </label>
            <div className="relative">
              <input
                id="name"
                type="text"
                placeholder="Enter a Username"
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
