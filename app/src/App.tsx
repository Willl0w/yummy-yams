import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Results from "./pages/Results";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
};

export default App;
