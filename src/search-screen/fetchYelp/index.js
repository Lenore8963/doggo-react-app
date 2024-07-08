export const fetchYelpData = async (location, term) => {
  const apiKey = "YOUR_YELP_API_KEY"; // Replace with your Yelp API key
  const response = await fetch(
    `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const data = await response.json();
  return data.businesses;
};
