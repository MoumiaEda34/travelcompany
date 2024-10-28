// api/searchApi.js
const baseUrl = 'http://localhost:1000/searches';

export const saveSearchData = async (searchData) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(searchData),
  });

  if (!response.ok) {
    throw new Error('Failed to save search data');
  }

  return response.json();
};
