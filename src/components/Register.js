import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, getUsers } from '../api/userApi';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profileImage: '' // Add profileImage to form data
  });
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input for profile image
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Validate the file type
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          profileImage: 'Please upload a valid image (JPEG or PNG)',
        }));
        setFormData({ ...formData, profileImage: '' }); // Reset profileImage
        return;
      }

      const imageUrl = URL.createObjectURL(file); // Use the file URL as a placeholder
      setFormData({ ...formData, profileImage: imageUrl });
      setValidationErrors((prevErrors) => ({ ...prevErrors, profileImage: '' })); // Reset any previous error
    }
  };

  const validate = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 3) {
      errors.name = 'Name must be at least 3 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    // Password validation
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Profile Image validation
    if (!formData.profileImage) {
      errors.profileImage = 'Profile image is required';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Front-end validation
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    // Check if the email already exists in the database
    try {
      const users = await getUsers();
      const userExists = users.some((user) => user.email === formData.email);

      if (userExists) {
        setError('User with this email already exists');
      } else {
        await registerUser(formData);
        navigate('/login');
      }
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {validationErrors.name && <p className="error">{validationErrors.name}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        {validationErrors.email && <p className="error">{validationErrors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {validationErrors.password && <p className="error">{validationErrors.password}</p>}

        {/* File input for profile image */}
        <input
          type="file"
          name="profileImage"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
        {validationErrors.profileImage && <p className="error">{validationErrors.profileImage}</p>}
        {formData.profileImage && (
          <div>
            <img src={formData.profileImage} alt="Profile Preview" width="100" />
          </div>
        )}

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
