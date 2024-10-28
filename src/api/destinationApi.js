// src/api/destinationApi.js

export const fetchPopularDestinations = async () => {
    const response = await fetch('http://localhost:1000/popularDestinations'); // Adjust the endpoint if necessary
    if (!response.ok) {
      throw new Error('Failed to fetch popular destinations');
    }
    return await response.json();
  };
  