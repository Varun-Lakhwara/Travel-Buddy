import { Button, Select, TextInput, Spinner } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });

  console.log(sidebarData);

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPost(data);
        setLoading(false);
        if (data.post.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();
    navigate(`/Search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = post.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set(startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPost([...post, ...data.post]);
      if (data.post.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 boder-b md:border-r md:min-h-screen border-gray-400">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-3">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="Adventure">Adventure</option>
              <option value="Cruises">Cruises</option>
              <option value="Leisure">Leisure</option>
              <option value="Family">Family</option>
              <option value="Solo">Solo</option>
              <option value="Backpackers">Backpackers</option>
              <option value="Business">Business</option>
              <option value="Cultural">Cultural</option>
              <option value="Budget">Budget</option>
              <option value="Camping">Camping</option>
              <option value="Heritage">Heritage</option>
              <option value="Religious">Religious</option>
              <option value="Beach">Beaches</option>
              <option value="Wildlife">Wildlife</option>
            </Select>
          </div>
          <Button gradientMonochrome="purple" type="submit">
            Filter
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="font-semibold text-3xl sm:border-b border-gray-300 p-3 mt-5 flex justify-center ">
          Posts Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && post.length === 0 && (
            <p className="text-xl text-gray-500">No posts found.</p>
          )}

          {!loading &&
            post &&
            post.map((post) => {
              <PostCard key={post.id} post={post}></PostCard>;
            })}

          {showMore && (
            <button
              className="text-teal-500 text-lg hover:underline p-7 w-full"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
        {loading && (
          <div className="flex justify-center items-center min-h-screen">
            <Spinner size="xl" />
          </div>
        )}
      </div>
    </div>
  );
}
