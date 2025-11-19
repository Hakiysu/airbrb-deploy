// frontend/src/AppRouter.jsx
import { Routes, Route } from 'react-router';
import AuthChecker from './api/AuthChecker.jsx';

import Landing from './pages/Landing.jsx';
import Register from './pages/Auth/Register.jsx';
import Login from './pages/Auth/Login.jsx';
import ListingEditor from './pages/ListingEditor.jsx';
import ListingManager from './pages/ListingManager.jsx';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/listing-editor/:listingId"
        element={
          <AuthChecker>
            <ListingEditor />
          </AuthChecker>
        }
      />
      <Route
        path="/listing-editor"
        element={
          <AuthChecker>
            <ListingEditor />
          </AuthChecker>
        }
      />
      <Route
        path="/listing-manager"
        element={
          <AuthChecker>
            <ListingManager />
          </AuthChecker>
        }
      />
    </Routes>
  );
}