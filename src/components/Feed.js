import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Sidebar, Videos } from "./";
import { Rings } from "react-loader-spinner";
import { GitHub, LinkedIn, Public } from "@mui/icons-material";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then((data) => {
      setVideos(data.items);
    });
  }, [selectedCategory]);

  if (!videos.length) {
    return (
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30vh",
        }}
      >
        <Rings height="122" width="122" color="red" ariaLabel="loading" />;
      </span>
    );
  }

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "90vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}
        className="slidebar"
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        // <Box
        //   sx={{
        //     display: "flex",
        //     mt: "10px",
        //     alignItems: "center",
        //     justifyContent: "space-evenly",
        //     flexDirection: "column",
        //   }}
        // >
        //   <Typography
        //     className="copyright"
        //     variant="caption"
        //     sx={{ mx: 1.5, color: "#fff" }}
        //     my="14px"
        //     textAlign="center"
        //   >
        //     &copy;{new Date().getFullYear()} uToob
        //   </Typography>
        //   <Typography
        //     className="info"
        //     variant="h6"
        //     display="flex"
        //     alignItems="center"
        //     justifyContent="space-evenly"
        //     width="100%"
        //     marginTop="4px"
        //   >
        //     <a
        //       style={{ color: "#fff" }}
        //       target="_blank"
        //       href="https://github.com/dipanshurdev"
        //       rel="noreferrer"
        //     >
        //       <GitHub color="#fff" fontSize="50px" />
        //     </a>
        //     <a
        //       style={{ color: "#fff" }}
        //       target="_blank"
        //       href="https://www.linkedin.com/in/dipanshurdev"
        //       rel="noreferrer"
        //     >
        //       <LinkedIn color="#fff" fontSize="50px" />
        //     </a>
        //     <a style={{ color: "#fff" }}>
        //       <Public color="#fff" fontSize="50px" />
        //     </a>
        //   </Typography>
        // </Box>
      </Box>
      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          sx={{
            color: "white",
          }}
        >
          {selectedCategory}
          <span
            style={{
              color: "#F31503",
              marginLeft: "5px",
            }}
          >
            videos
          </span>
        </Typography>
        <Videos videos={videos} />
      </Box>
    </Stack>
  );
};

export default Feed;
