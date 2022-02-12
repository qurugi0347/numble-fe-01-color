import React from "react";
import { Route, Routes } from "react-router";
import Home from "../page/Home";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/numble-fe-01-color" element={<Home />} />
    </Routes>
  );
};

export default App;
