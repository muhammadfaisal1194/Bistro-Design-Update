import React from "react";
import "./App.css";
import Footer from "./components/Footer";
import { useLocation, Outlet, useMatches } from 'react-router'

function App() {

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
