// data.js

// API key for accessing the YouTube Data API
export const API_KEY = "AIzaSyB_8sJr_NadwQHLBKDQh3bxSL1kIWyQX2s";

// Function to convert view count to a more readable format
export function value_converter(viewCount) {
  if (viewCount < 1000) {
    return viewCount.toString();
  } else if (viewCount < 1000000) {
    return (viewCount / 1000).toFixed(1) + "k";
  } else if (viewCount < 1000000000) {
    return (viewCount / 1000000).toFixed(1) + "M";
  } else {
    return (viewCount / 1000000000).toFixed(1) + "B";
  }
}


export default value_converter;
