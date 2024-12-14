import axios from "axios";

const CLIENT_ID = "bb7160de0ffc4608a412f809a0c95bd5";
const CLIENT_SECRET = "5d243dd41a63406888be21200ddf8211"; 

export const getAccessToken = async () => {
  const tokenUrl = "https://accounts.spotify.com/api/token";

  const params = new URLSearchParams();
  params.append("grant_type", "client_credentials");

  const headers = {
    Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`, 
    "Content-Type": "application/x-www-form-urlencoded",
  };

  try {
    const response = await axios.post(tokenUrl, params, { headers });
    return response.data.access_token; 
  } catch (error) {
    console.error("Error fetching access token:", error);
    return null;
  }
};

export const fetchLofiTracks = async (accessToken) => {
  const endpoint = "https://api.spotify.com/v1/search";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(endpoint, {
      headers,
      params: {
        q: "lofi",
        type: "track",
        limit: 20, 
      },
    });

    return response.data.tracks.items; 
  } catch (error) {
    console.error("Error fetching tracks:", error);
    return [];
  }
};
