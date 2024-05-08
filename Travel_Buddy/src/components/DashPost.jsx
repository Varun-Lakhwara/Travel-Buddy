import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashPost() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPost, setUserPost] = useState([]);
  const [showMore,setShowMore] = useState(true);
  console.log(userPost);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPost(data.posts);
          if(data.posts.length < 9){
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._Id]);

  const handleShowMore = async() =>{
    const startIndex = userPost.length;
    try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIdex=${startIndex}`);
        const data = await res.json();
        if(res.ok){
            setUserPost((prev) => [...prev, ...data.posts]);
            if(data.posts.length < 9){
                setShowMore(false);
              }
        }
    } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-200
     scrollbar-thumb-slate-400 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-900 ">
      {currentUser.isAdmin && userPost.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>

            {userPost.map((post) => {
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 ">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocalDatestring()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.title}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>

                  <Table.Cell>
                    <Link to={`/post/${post.category}`}>{post.category}</Link>
                  </Table.Cell>

                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>

                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`update-post/$(post._id)`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>;
            })}
          </Table>
          {
            showMore && (
                <button onClick={handleShowMore} className="text-teal-700 w-full self-center text-sm py-7">
                    Show more
                </button>
            )
          }
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
}
