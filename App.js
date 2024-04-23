import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom"; // Import useNavigate hook
import Home from "./Pages/Home/Home";
import Video from "./Pages/Home/Video/Video";
import SearchResults from "./SearchResults";
import axios from "axios";

const API_KEY = 'AIzaSyBKp6ON-PsfgwviIp3MqxxsiAABXzx_Ybs';

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [products, setProducts] = useState([]);


  const searchYouTube = async (query) => {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          key: API_KEY,
          part: 'snippet',
          q: query,
        },
      });
      setSearchResults(response.data.items);
      // Redirect to search results page after fetching data
      navigate('/search');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <Navbar setSidebar={setSidebar} searchYouTube={searchYouTube} />
      <Routes>
        <Route path="/" element={<Home sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
        <Route
          path="/search"
          element={<SearchResults results={searchResults} />}
        />
      </Routes>
    </div>
  );
};

export default App;
