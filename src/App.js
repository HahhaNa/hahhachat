import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { auth } from "./config";
import "./start.css";
import "./chat.css"
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import React, { useState, useEffect } from 'react';
import AppContext from './AppContext';


const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const currentUser = useContext(AppContext).currentUser;

  useEffect(() => {
    if (!currentUser) {
      navigate('/register');
    }
  }, [currentUser, navigate]);

  return children;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <AppContext.Provider value={{ currentUser, setCurrentUser }}>
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
