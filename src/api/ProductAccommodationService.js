// src/api/ProductAccommodationService.js
const base_url = 'http://localhost:1000'; // Replace with your actual base URL

// Function to fetch accommodations by destination
export const fetchAccommodationsByDestination = async (destination) => {
    try {
        const response = await fetch(`${base_url}/accommodations/${destination}`);
        if (!response.ok) {
            throw new Error('Failed to fetch accommodations');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching accommodations:', error);
        throw error; // Re-throw error to handle it in the component
    }
};

// You can add more functions here as needed, such as for creating or deleting accommodations
