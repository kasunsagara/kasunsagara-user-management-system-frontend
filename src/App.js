import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import UserAdd from "./components/UserAdd/UserAdd";
import UserDisplay from "./components/UserDisplay/UserDisplay";
import UserUpdate from "./components/UserUpdate/UserUpdate";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<UserAdd />} />
        <Route path="/display" element={<UserDisplay />} />
        <Route path="/update/:firstName" element={<UserUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
