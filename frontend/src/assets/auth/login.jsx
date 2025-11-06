// login.jsx
import { useState } from 'react';
// login
function Login() {
  // state for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // add login logic here
    console.log('Logging in:', { username, password });
  };

  return (
    <div>
      <h2>Login Page</h2>
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
        <button type="submit">Login</button>
      </form>

    </div>
  );
}

export default Login;