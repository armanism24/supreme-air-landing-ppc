import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ReviewProvider } from "./contexts/ReviewContext";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <div className="App">
      <ReviewProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
          </Routes>
        </BrowserRouter>
      </ReviewProvider>
    </div>
  );
}

export default App;