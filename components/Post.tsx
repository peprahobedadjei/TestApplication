import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

function Post() {
  const [postsData, setPostsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/posts");
      const data = await response.json();
      setPostsData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts");
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")|| '{}');
    fetchPost();
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-12 lg:px-4">
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ClipLoader color="#4A90E2" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lag:gap-8">
          {postsData.map((post) => (
            <div key={post.id} className="rounded-lg">
              <article className="overflow-hidden rounded-lg border border-gray-100 shadow-sm">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      alt="Profile-Image"
                      src={post.profileImage}
                      width={100}
                      height={100}
                      className="h-12 w-12 rounded-full mr-4"
                    />
                  <div>
                  <h3 className={`text-2xl font-bold ${post.prediction ==='Disaster Tweet'? 'text-red-500':'text-gray-900'}`}>
                    <span className="text-white">Predicted As:</span>{" "}
                    <span className={`${post.prediction ==='Disaster Tweet' ?'text-red-500':'text-green-500' }`}>{post.prediction}</span>
                  </h3>
                  <h3 className="mt-2 text-sm font-medium text-gray-500">
                    By: {post.name}
                  </h3>
                </div>
                </div>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-white">
{post.content}
                </p>
                <div className="flex flex-col mt-4">
                  <div className="flex space-x-6">
                    <div className=" flex flex-col">
                      <h3 className="text-sm font-medium text-white">
                        {post.datetime}
                      </h3>
                      <h3 className="text-sm font-medium text-gray-500">
                        Sent Date
                      </h3>
                    </div>
                  </div>
                </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
