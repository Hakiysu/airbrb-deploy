//dashboard.jsx
import { useState } from 'react';

function Dashboard() {
  const [data] = useState('Welcome to the Dashboard!');

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{data}</p>
    </div>
  );
}

export default Dashboard;