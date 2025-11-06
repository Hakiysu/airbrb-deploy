// register.jsx
import { useState } from 'react';

// register

function Register() {
  // state for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // add registration logic here
    console.log('Registering:', { username, password, confirmPassword });
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <label>
            Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
            Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
            Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;