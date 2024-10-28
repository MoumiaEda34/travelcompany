// api/bookingApi.js

export const fetchBookingData = async () => {
    try {
      const response = await fetch('/db.json'); // Ensure the path is correct
      if (!response.ok) {
        throw new Error('Network response was not ok'); // Handle HTTP errors
      }
      const data = await response.json();
    
      return data.bookings; // Ensure this matches your JSON structure
    } catch (error) {
      console.error('Error fetching booking data:', error);
      throw error; // Re-throw the error for handling where this function is called
    }
  };
  