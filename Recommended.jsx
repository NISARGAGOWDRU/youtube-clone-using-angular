import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data'; // Corrected import
import { Link } from 'react-router-dom';

const Recommended = () => {
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  const fetchRecommendedVideos = async () => {
    try {
      const recommendedVideosUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=10&regionCode=US&key=${API_KEY}`;
      const response = await fetch(recommendedVideosUrl);

      if (!response.ok) {
        throw new Error('Failed to fetch recommended videos');
      }

      const data = await response.json();

      if (data.items && Array.isArray(data.items)) {
        setRecommendedVideos(data.items);
      } else {
        throw new Error('Invalid data structure in API response');
      }
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    }
  };

  return (
    <div className="recommended">
      <h2>Recommended Videos</h2>
      <div className="video-list">
        {recommendedVideos.map((video) => (
          <div key={video.id} className="video-item">
            <Link to={`/video/${video.id}`}>
              <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
            </Link>
            <div className="video-info">
              <h3>{video.snippet.title}</h3>
              <p>{video.snippet.channelTitle}</p>
              <p>{moment(video.snippet.publishedAt).fromNow()}</p>
              <p>
                {video.statistics && video.statistics.viewCount
                  ? `${value_converter(video.statistics.viewCount)} views`
                  : '0 views'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;
