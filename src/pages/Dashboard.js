import React, { useEffect } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { API_URL, API_URL_SOCKET } from "../utils/api";
import socketClient from "socket.io-client";

// Accordion start
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

// Accordion end

const Dashboard = () => {
  const state = useSelector((state) => state.notifications);
  let navigate = useNavigate();
  const role = JSON.parse(localStorage.getItem("role"));
  const { pathname } = useLocation();
  const token = localStorage.getItem("accessToken");
  const socket = socketClient(API_URL_SOCKET, { transports: ["websocket"] });

  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

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
      if (role == 2) {
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
              {role == 1 && (
                <>
                  <Accordion expanded={expanded === 'Product'} onChange={handleChange('Product')} className="Accordion mt-3">
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{background:"transparent"}}>
                      <Typography>Product</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <button
                        className={`btn btn-common mt-3  ${pathname === "/dashboard/addproduct" ? "active-btn" : ""
                          }`}
                        onClick={() => {
                          addMenu();
                        }}
                        style={{ minWidth: 173 }}
                      >
                        {" "}
                        Add Product
                      </button>
                      <button
                        className={`btn btn-common mt-3 ${pathname === "/dashboard/allproducts" ? "active-btn" : ""
                          }`}
                        onClick={() => {
                          allProducts();
                        }}
                        style={{ minWidth: 173 }}
                      >
                        {" "}
                        All Products
                      </button>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'Menu'} onChange={handleChange('Menu')} className="Accordion mt-3">
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{background:"transparent"}}>
                      <Typography>Menu</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <button
                        className={`btn btn-common mt-3 ${pathname === "/dashboard/addmenu" ? "active-btn" : ""
                          }`}
                        onClick={() => {
                          setAddMenu();
                        }}
                        style={{ minWidth: 173 }}
                      >
                        {" "}
                        Add Menu
                      </button>
                      <button
                        className={`btn btn-common mt-3 ${pathname === "/dashboard/allmenus" ? "active-btn" : ""
                          }`}
                        onClick={() => {
                          allMenus();
                        }}
                        style={{ minWidth: 173 }}
                      >
                        {" "}
                        All Menus
                      </button>
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
              <Accordion expanded={expanded === 'Notifications'} onChange={handleChange('Notifications')} className="Accordion mt-3">
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header" style={{background: "transparent"}}>
                  <Typography>Notifications</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {role == 1 && (<button
                    className={`btn btn-common mt-3 ${pathname === "/dashboard/kitchen" ? "active-btn" : ""
                      }`}
                    onClick={() => {
                      notifyKitchen();
                    }}
                    style={{ minWidth: 173 }}
                  >
                    {" "}
                    Notify Kitchen
                  </button>)}
                  {(role == 1 || role == 2) && (
                    <>
                      <button
                        className={`btn btn-common mt-3 ${pathname === "/dashboard/chat" ? "active-btn" : ""
                          }`}
                        onClick={() => {
                          navigate("/dashboard/chat");
                        }}
                        style={{ minWidth: 173, maxWidth: 200, paddingLeft: 12 }}
                      >
                        Notifications & Chat
                      </button>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
              {role == 1 && (
                <>
                  <button
                    className={`btn btn-common mt-3 Dash-btn ${pathname === "/dashboard/orders" ? "active-btn" : ""
                      }`}
                    onClick={() => {
                      orders();
                    }}
                  >
                    {" "}
                    All Orders
                  </button>
                  <button
                    className={`btn btn-common mt-3 Dash-btn ${pathname === "/dashboard/subcategories"
                      ? "active-btn"
                      : ""
                      }`}
                    onClick={() => {
                      subcategories();
                    }}
                  >
                    {" "}
                    Sub Categories
                  </button>
                </>
              )}
              {token && (
                <button
                  className={`btn btn-common mt-3 Dash-btn`}
                  onClick={() => {
                    logoutHandler();
                  }}
                >
                  {" "}
                  Logout
                </button>
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
