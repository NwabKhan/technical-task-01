import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SubscriptionForm from "./components/SubscriptionForm";
import Search from "./components/Search";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionForm />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
