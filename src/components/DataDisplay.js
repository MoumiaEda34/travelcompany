import React, { useEffect, useState } from 'react';

// Example functional component to fetch and display data
const DataDisplay = () => {
  const [users, setUsers] = useState([]);
  const [searches, setSearches] = useState([]);
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Assuming the JSON data is hosted at this URL
      const response = await fetch('http://localhost:1000/data.json'); // Adjust the URL as necessary
      console.log(response);
      const data = await response.json();

      setUsers(data.users);
      setSearches(data.searches);
      setAccommodations(data.accommodations);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h2>Searches</h2>
      <ul>
        {searches.map(search => (
          <li key={search.id}>
            {search.destination} from {search.checkInDate} to {search.checkOutDate}
          </li>
        ))}
      </ul>

      <h2>Accommodations</h2>
      <ul>
        {accommodations.map(accommodation => (
          <li key={accommodation.id}>
            {accommodation.name} - {accommodation.location} - ${accommodation.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataDisplay;
