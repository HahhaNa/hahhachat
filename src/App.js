import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./start.css";
import "./chat.css"
import { BrowserRouter, Routes, Route, Navigate, ProtectedRoute } from "react-router-dom";
import { useContext } from "react";
import React, { useState } from 'react';
import AppContext from './AppContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null); // Initial value for currentUser

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ currentUser, setCurrentUser }}> {/* Provide context */}
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;