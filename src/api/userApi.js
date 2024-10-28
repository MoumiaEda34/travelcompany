const API_URL = 'http://localhost:1000/users';

export const registerUser = async (user) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}?email=${email}&password=${password}`);
  const users = await response.json();
  return users.length > 0 ? users[0] : null;
};

export const getUsers = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
