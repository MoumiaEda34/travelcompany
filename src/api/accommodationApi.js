// api/accommodationApi.js

export const fetchAccommodationData = async () => {
    const response = await fetch('/db.json'); // Ensure the path is correct
    if (!response.ok) {
      throw new Error('Network response was not ok'); // Handle HTTP errors
    }
    const data = await response.json();
  
    return data.accommodations; // Ensure this matches your JSON structure
  };
  

