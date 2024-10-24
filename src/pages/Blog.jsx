// import React from "react";
// import { BigBlogCards, SmallBlogCards } from "../components/Cards";
// import { Categories, LatestPosts } from "../components/GroupListItems";
// import Search from "../components/Search";
// import Pagination from "../components/Pagination";

// const Blog = () => {
//   return (
//     <div className="md:mt-48 mt-36 md:px-[5rem] px-4">
//       <Search />

//       <div className="md:flex gap-12 my-5">
//         <div className="md:w-[70%]">
//           <BigBlogCards />

//           {/* small card 1 */}
//           <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-5 my-10">
//             <SmallBlogCards />
//             <SmallBlogCards />
//             <SmallBlogCards />

//             <SmallBlogCards />
//             <SmallBlogCards />
//             <SmallBlogCards />
//           </div>

//           <Pagination />
//         </div>

//         <div className="md:w-[30%]">
//           <div className="mb-10">
//             <Categories />
//           </div>

//           <div>
//             <LatestPosts />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Blog;

import React, { useState, useEffect } from "react";
import moment from "moment";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TextField,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { TextInput } from "flowbite-react";
import { HiOutlineSearch } from "react-icons/hi";
import NoResult from "../assets/noResult.png";
import Pagination from "../components/Pagination";

const backendURL =
  import.meta.env.MODE === "production"
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:3001";

const FilterSection = ({
  categories,
  onCategoryChange,
  onTimeFilterChange,
}) => {
  return (
    <Box
      sx={{
        p: 0,
        borderRadius: 2,
        // position: { md: "fixed" },
        top: { md: "100px" },
        right: { md: "24px" },
        width: "100%",
        maxWidth: { md: "300px" },
        zIndex: { md: 1000 },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="category-select-label">Category</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              label="Category"
              onChange={(e) => onCategoryChange(e.target.value)}
              defaultValue=""
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={12}>
          <FormControl fullWidth size="small">
            <InputLabel id="time-filter-label">Time Filter</InputLabel>
            <Select
              labelId="time-filter-label"
              id="time-filter"
              label="Time Filter"
              onChange={(e) => onTimeFilterChange(e.target.value)}
              defaultValue="all"
            >
              <MenuItem value="all">All Time</MenuItem>
              <MenuItem value="today">Today</MenuItem>
              <MenuItem value="thisWeek">This Week</MenuItem>
              <MenuItem value="thisMonth">This Month</MenuItem>
              <MenuItem value="thisYear">This Year</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

const NoResultsMessage = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "70%",
      height: "100vh",
      margin: "0 auto",
    }}
  >
    <img
      src={NoResult}
      alt="No results found"
      style={{ marginBottom: "1rem" }}
    />
  </Box>
);

const LoadingSpinner = () => (
  <Box
    sx={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(255, 255, 255, 0.7)", // semi-transparent white background
      zIndex: 9999, // ensure it's on top of other elements
    }}
  >
    <CircularProgress />
  </Box>
);

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendURL}/api/getPosts`);
      const data = await response.json();
      console.log(data);
      setPosts(data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = [...new Set(posts.map((post) => post.category))];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || post.category === selectedCategory;

    let matchesTimeFilter = true;
    const postDate = moment(post.createdAt);
    const now = moment();

    switch (timeFilter) {
      case "today":
        matchesTimeFilter = postDate.isSame(now, "day");
        break;
      case "thisWeek":
        matchesTimeFilter = postDate.isSame(now, "week");
        break;
      case "thisMonth":
        matchesTimeFilter = postDate.isSame(now, "month");
        break;
      case "thisYear":
        matchesTimeFilter = postDate.isSame(now, "year");
        break;
      default:
        matchesTimeFilter = true;
    }

    return matchesSearch && matchesCategory && matchesTimeFilter;
  });

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const stripHtmlTags = (content) => {
    return content.replace(/<[^>]*>/g, "");
  };

  const trimContent = (content, length = 100) => {
    const strippedContent = stripHtmlTags(content);
    return strippedContent.length > length
      ? strippedContent.substring(0, length) + "..."
      : strippedContent;
  };

  return (
    <section className="mt-24">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box sx={{ padding: 3 }}>
          <div className="mb-4 ml-[-2.6rem] ">
            <TextInput
              id="search"
              type="text"
              icon={HiOutlineSearch}
              placeholder="Search post"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="placeholder-gray-700 placeholder:text-base placeholder:m-10 md:w-[20rem] rounded-md  pl-10"
            />
          </div>
          {/* Filters */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{ display: { xs: "block", md: "none", paddingBottom: "30px" } }}
          >
            <FilterSection
              categories={categories}
              onCategoryChange={setSelectedCategory}
              onTimeFilterChange={setTimeFilter}
            />
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              {currentPosts.length > 0 ? (
                <Grid container spacing={3}>
                  {currentPosts.map((post) => (
                    <Grid item xs={12} sm={6} lg={4} key={post._id}>
                      <Card
                        sx={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <CardMedia
                          component="img"
                          sx={{
                            width: "100%",
                            height: 250,
                            objectFit: "cover",
                          }}
                          image={`${backendURL}${post.image}`}
                          alt={post.title}
                        />
                        <CardContent sx={{ flexGrow: 1, p: 1 }}>
                          <Typography
                            gutterBottom
                            variant="h5"
                            fontSize="24px"
                            component="div"
                            fontWeight="600"
                            color="#201F1F"
                          >
                            {post.title}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: 1,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar
                                src={`${backendURL}${post.authorId?.image}`}
                                alt={post.authorId?.name}
                                sx={{ width: 30, height: 30, marginRight: 1 }}
                              />
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {post.authorId?.name}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {moment(post.createdAt).fromNow()}
                              {/* {moment(post.createdAt).format("DD, MMMM YYYY")} */}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#201F1F",
                              fontSize: "14px",
                              lineHeight: 1.5,
                            }}
                          >
                            {trimContent(post.content, 100)}
                          </Typography>
                        </CardContent>
                        <Box sx={{ p: 1 }}>
                          <Link
                            to={`/post/${post.slug}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-btColour rounded-lg   focus:ring-4 focus:outline-none focus:ring-blue-300 transition-colors duration-300 mt-auto self-start hover:text-btColour hover:bg-white hover:border-btColour hover:border-2 hover:font-semibold"
                          >
                            Read more
                            <svg
                              className="w-3.5 h-3.5 ms-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                          </Link>
                        </Box>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <NoResultsMessage />
              )}

              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredPosts.length / postsPerPage)}
                onPageChange={paginate}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{ display: { xs: "none", md: "block" } }}
            >
              <FilterSection
                categories={categories}
                onCategoryChange={setSelectedCategory}
                onTimeFilterChange={setTimeFilter}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </section>
  );
};

export default BlogList;
