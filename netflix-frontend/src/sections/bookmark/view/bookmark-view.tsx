// import  { useState, SetStateAction, useContext } from "react";
// import Layout from "../../../layouts";
// import {
//   Box,
//   Paper,
//   InputBase,
//   InputAdornment,
//   Typography,
// } from "@mui/material";
// import SearchIcon from "src/assets/icons/icon-search.svg";
// import MovieList from "src/components/movie-list";
// import { MovieDataType } from "src/assets/data";
// import { MovieContext } from "src/context/movie-context";

// const BookmarkView = () => {
//   const [search, setSearch] = useState("");
//   const [searchList, setSearchList] = useState<MovieDataType[]>([]);
//   const { state } = useContext(MovieContext);
//   const { movies } = state;
//   const bookmarks = movies.filter((movie) => movie.isBookmarked);
//   const handleSearch = (e: { target: { value: SetStateAction<string> } }) => {
//     setSearch(e.target.value);
//     const newList = movies.filter((movie) =>
//       movie.title.toLowerCase().includes(search.toLowerCase())
//     );
//     setSearchList(newList);
//   };
//   return (
//     <Layout>
//       <Box>
//         <Paper
//           component="form"
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             borderRadius: "default",
//             p: 1,
//             backgroundColor: "#10141f",
//             border: "none",
//           }}
//         >
//           <InputBase
//             placeholder="Search for movies or TV series"
//             sx={{
//               ml: 1,
//               flex: 1,
//               color: "white",
//               border: "none",
//             }}
//             value={search}
//             onChange={handleSearch}
//             startAdornment={
//               <InputAdornment position="start">
//                 <img
//                   src={SearchIcon}
//                   alt="search icon"
//                   width={20}
//                   height={20}
//                 />
//               </InputAdornment>
//             }
//           />
//         </Paper>
//       </Box>
//       <Box py={2} px={4}>
//         {search === "" ? (
//           <Box width="100%">
//             <Typography variant="h5" component="h1" my={6} fontWeight={400}>
//               TV Series
//             </Typography>
//             <MovieList recommendList={bookmarks} />
//           </Box>
//         ) : (
//           <Box width="100%">
//             <Typography>
//               Found {searchList.length} results for "{search}"{""}
//             </Typography>
//             <MovieList recommendList={searchList} />
//           </Box>
//         )}
//       </Box>
//     </Layout>
//   );
// };

// export default BookmarkView;