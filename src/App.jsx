import { useState } from "react";
import Body from "./components/Body";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  return (
    <>
    <BrowserRouter basename="/">
    <Routes>
      <Route path="/" element={<Body/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
