import React, { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { API_URL, API_URL_SOCKET } from "../utils/api";
import socketClient from "socket.io-client";

const Dashboard = () => {
  const state = useSelector((state) => state.notifications);
  let navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("role"));
  const { pathname } = useLocation();
  const token = localStorage.getItem("accessToken");
  const socket = socketClient(API_URL_SOCKET, { transports: ["websocket"] });

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);

  const allProducts = () => {
    navigate("/dashboard/allproducts");
  };
  const addMenu = () => {
    navigate("/dashboard/addproduct");
  };
  const setAddMenu = () => {
    navigate("/dashboard/addmenu");
  };
  const allMenus = () => {
    navigate("/dashboard/allmenus");
  };
  const notifyKitchen = () => {
    navigate("/dashboard/kitchen");
  };
  const orders = () => {
    navigate("/dashboard/orders");
  };
  const subcategories = () => {
    navigate("/dashboard/subcategories");
  };

  const clickBellHandler = () => {
    navigate("/dashboard/chat");
  };

  const logoutHandler = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  const audio = new Audio("/sound.mp3");

  useEffect(() => {
    socket.on("sendNotification", function (data) {
      if(role == 2){
        audio.play()
      }
    });
   
  }, []);


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light nave-bar opacity">
        <div className="container-fluid d-flex justify-content-between ">
          <div></div>
          <div>
            <img
              src="/assets/logo.png"
              alt=""
              width="80"
              height="80"
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>

          <div className="border border-1 p-1 position-relative">
            <FontAwesomeIcon
              icon={faBell}
              style={{ cursor: "pointer", height: 34 }}
              onClick={(e) => {
                e.preventDefault();
                clickBellHandler();
              }}
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {state.notificationsList.length}
            </span>
          </div>
        </div>
      </nav>

      <div className="menu-box">
        <div className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-2">
              {token && (
                <button
                  className={`btn btn-common`}
                  onClick={() => {
                    logoutHandler();
                  }}
                  style={{ minWidth: 200 }}
                >
                  {" "}
                  Logout
                </button>
              )}
              {role == 1 && (
                <>
                  <button
                    className={`btn btn-common mt-3  ${
                      pathname === "/dashboard/addproduct" ? "active-btn" : ""
                    }`}
                    onClick={() => {
                      addMenu();
                    }}
                    style={{ minWidth: 200 }}
                  >
                    {" "}
                    Add Product
                  </button>
                  <button
                    className={`btn btn-common mt-3 ${
                      pathname === "/dashboard/allproducts" ? "active-btn" : ""
                    }`}
                    onClick={() => {
                      allProducts();
                    }}
                    style={{ minWidth: 200 }}
                  >
                    {" "}
                    All Products
                  </button>
                  <button
                    className={`btn btn-common mt-3 ${
                      pathname === "/dashboard/addmenu" ? "active-btn" : ""
                    }`}
                    onClick={() => {
                      setAddMenu();
                    }}
                    style={{ minWidth: 200 }}
                  >
                    {" "}
                    Add Menu
                  </button>
                  <button
                    className={`btn btn-common mt-3 ${
                      pathname === "/dashboard/allmenus" ? "active-btn" : ""
                    }`}
                    onClick={() => {
                      allMenus();
                    }}
                    style={{ minWidth: 200 }}
                  >
                    {" "}
                    All Menus
                  </button>
                  <button
                    className={`btn btn-common mt-3 ${
                      pathname === "/dashboard/kitchen" ? "active-btn" : ""
                    }`}
                    onClick={() => {
                      notifyKitchen();
                    }}
                    style={{ minWidth: 200 }}
                  >
                    {" "}
                    Notify Kitchen
                  </button>
                  <button
                    className={`btn btn-common mt-3 ${
                      pathname === "/dashboard/orders" ? "active-btn" : ""
                    }`}
                    onClick={() => {
                      orders();
                    }}
                    style={{ minWidth: 200 }}
                  >
                    {" "}
                    All Orders
                  </button>
                  <button
                    className={`btn btn-common mt-3 ${
                      pathname === "/dashboard/subcategories"
                        ? "active-btn"
                        : ""
                    }`}
                    onClick={() => {
                      subcategories();
                    }}
                    style={{ minWidth: 200, maxWidth: 200 }}
                  >
                    {" "}
                    Subcategories
                  </button>
                </>
              )}
              {(role == 1 || role == 2) && (
                <>
                  <button
                    className={`btn btn-common mt-3 ${
                      pathname === "/dashboard/chat" ? "active-btn" : ""
                    }`}
                    onClick={() => {
                      navigate("/dashboard/chat");
                    }}
                    style={{ minWidth: 200, maxWidth: 200, paddingLeft: 12 }}
                  >
                    Notifications & Chat
                  </button>
                </>
              )}
            </div>
            <div className="col-md-10 px-5">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
