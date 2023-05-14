import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  About,
  Admin,
  Home,
  Login,
  Register,
  UserProfile,
  PageNotFound,
  Contact,
  RegistroOdontologo,
  Citas
} from "./containers";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/about" element={<About />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/registroOdontologo" element={<RegistroOdontologo />} />
      <Route path="/citas" element={<Citas />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" exact={true} element={<PageNotFound />} />
    </Routes>
  );
}
