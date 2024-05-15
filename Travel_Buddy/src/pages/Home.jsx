import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import ContactForm from "../components/ContactForm";
import About from "./About";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getposts');
        const data = await res.json();
        setPosts(data.posts);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-6 lg:p-28 p-3 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold lg:text-6xl">
          Welcome to TravelBuddy
        </h1>
        <Link
          to="/Search"
          className="text-xs sm:text-sm text-teal-500 font-bold hover:underline"
        >
          View all posts{" "}
        </Link>
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="flex flex-wrap gap-4">
              {posts.map((post) => {
                <PostCard key={post.id} post={post}></PostCard>;
              })}
            </div>
            <Link
              to="/Search"
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
        <div className="">
        <div className="">
       <div className="bg-custom-color p-10 border-8 border-new-color rounded-2xl !rounded-tr-none !rounded-bl-none">
              <About/>
          </div>
       </div>
          
      <div className="p-5 h-screen flex items-end justify-center gap-3 dark:bg-slate-700">
        <div className="border-4 border-teal-500 rounded-2xl !rounded-tr-none !rounded-bl-none p-10 bg-slate-800">
        <ContactForm/>
        </div>
      </div>
      
        </div>
      
    </div>
    
  );
}
