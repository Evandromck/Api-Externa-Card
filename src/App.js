import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Cards from "./pages/Cards";

function App() {
  const [userName, setUserName] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login userName={userName} setUserName={setUserName} />}
        />
        <Route path="/cards" element={<Cards userName={userName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
