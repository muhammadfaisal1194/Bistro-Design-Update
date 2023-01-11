import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBgColor } from "../../redux/layout";

const MenuHeader = ({ bgColor }) => {
  const cart = useSelector((state) => state.cart.cart);
  const state = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("accessToken");
  const [showLogo, setShowLogo] = useState(false);
  const [redirect, setRedirect] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(true);
    }, 1000);
  }, []);

  const audio = new Audio({
    loop: true,
    volume: 0.2,
    src: ["/sound.mp3"],
  });

  useEffect(() => {
    let c = 0;
    cart.map((car) => {
      c += car.quantity;
    });

    setCount(c);
  }, [cart]);

  useEffect(() => {
    if (token) {
      if (role == 1) {
        setRedirect(`/dashboard/allmenus`);
      } else if (role == 2) {
        setRedirect(`/dashboard/chat`);
      } else {
        setRedirect(`/`);
      }
    }
  }, []);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light nave-bar opacity"
      style={{ background: bgColor }}
    >
      <div className="container-fluid d-flex justify-content-between ">
        <div></div>
        {state.selectedTab == 1 ? (
          <div
            className={`fadeIn ${showLogo ? "" : "opacity-0"}`}
            style={{ marginLeft: 50 }}
          >
            <Link to={redirect}>
              <img src="/assets/logo.png" alt="" width="80" height="80" />
            </Link>
          </div>
        ) : (
          <div style={{ marginLeft: 50 }}>
            <Link to={redirect}>
              <img src="/assets/logo.png" alt="" width="80" height="80" />
            </Link>
          </div>
        )}

        <div className="border border-1 p-1 position-relative">
          <FontAwesomeIcon
            icon={faShoppingBasket}
            style={{ cursor: "pointer", height: 34 }}
            onClick={() => {
              count == 0 ? navigate("/cart_empty") : navigate("/cart");
              dispatch(setBgColor("rgba(255, 255, 255,0.5)"));
            }}
          />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
            {count}
          </span>
        </div>
      </div>
    </nav>
  );
};
export default MenuHeader;
