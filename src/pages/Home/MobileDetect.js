import React, { useState, useEffect } from "react";
import MobileHome from "./MobileHome";
import Home from "./Home";

const MobileDetect = () => {
  const [width, setWidth] = useState(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  const RenderComponent = () => {
    if (isMobile) {
      return <MobileHome />;
    } else return <Home />;
  };

  return (
    <>
      <RenderComponent />
    </>
  );
};

export default MobileDetect;
