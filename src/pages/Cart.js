import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { IMAGE_URL } from "../utils/api";
import { API_URL } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import {
  setCart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
} from "./../redux/cart";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { setBgColor } from "./../redux/layout";

const Cart = () => {
  const state = useSelector((state) => state.layout);
  const cart = useSelector((state) => state.cart.cart);
  const [cartitem, setCarItem] = useState([]);
  const [buffetPrice, setBuffetPrice] = useState(0);
  const cartItems = useSelector((state) => state.cart.cart);
  const [type, setType] = useState("Serve on table");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [back, setBack] = useState("");
  const [count, setCount] = useState(0);

  const fetchBuffetPrice = async () => {
    const response = await axios.get(`${API_URL}/buffet/index`);
    console.log(response.data.data[0].price);
    setBuffetPrice(response.data.data[0].price);
  };

  const checkoutHandler = () => {
    if (count == 0) {
      toast.error("You can't proceed with zero quantity!");
      return;
    }
    console.log(cartItems);
    let totalprice = 0;
    let buffet = 0;
    for (let i = 0; i < cartItems.length; i++) {
      if (cartItems[i].type === "Buffet")
        buffet += buffetPrice * cartItems[i].quantity;
      else totalprice += cartItems[i].price * cartItems[i].quantity;
    }
    localStorage.setItem("amount", JSON.stringify(totalprice + buffet));
    localStorage.setItem("serveType", JSON.stringify(type));
    if (cartItems.length > 0) {
      navigate("/payment");
    }
  };

  const removeItem = (itemID) => {
    // create cartCopy
    let cartCopy = [...cartItems];

    cartCopy = cartCopy.filter((item) => item._id != itemID);

    //update state and local
    setCarItem(cartCopy);

    dispatch(setCart(cartCopy));
  };

  const onChangeValue = (event) => {
    setType(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    fetchBuffetPrice();
    setCarItem(cartItems);
  }, []);

  useEffect(() => {
    let price = 0;
    cartItems.map((item) => {
      price = price + item.price;
    });
    setTotalPrice(price);
  }, [cartitem]);

  useEffect(() => {
    if (state.selectedTab === 1) {
      setBack("Menu");
    } else if (state.selectedTab === 2) {
      setBack("Drinks");
      dispatch(setBgColor("rgba(143, 158, 169,0.5)"));
    } else if (state.selectedTab === 3) {
      setBack("Snacks");
      dispatch(setBgColor("rgba(204, 103, 68,0.5)"));
    }
  }, []);

  useEffect(() => {
    let c = 0;
    cart.map((car) => {
      c += car.quantity;
    });

    setCount(c);
  }, [cart]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light nave-bar">
        <div className="container-fluid d-flex justify-content-between ">
          <div>
            <Link to="/">
              <button
                type="button"
                className="btn btn-outline-dark borderRadious"
              >
                &larr; Back to {back}
              </button>
            </Link>
          </div>
          <div>
            <Link to={`/`}>
              <img src="/assets/logo.png" alt="" width="80" height="80" />
            </Link>
          </div>

          <div className="border border-1 p-1 position-relative">
            <FontAwesomeIcon
              icon={faShoppingBasket}
              style={{ height: "34px" }}
            />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
              {count}
            </span>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        <table className="table border border-2">
          <thead>
            <tr>
              <th scope="col">Thumbnail</th>
              <th scope="col">Item Name</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <th>
                  {" "}
                  <img
                    src={`${IMAGE_URL}/${item.thumbnail}`}
                    alt="..."
                    width="50"
                    height="50"
                    style={{
                      objectfit: "cover",
                    }}
                  />
                </th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price}</td>
                <td>
                  <Button
                    onClick={() => {
                      dispatch(decreaseCartItemQuantity(item._id));
                    }}
                  >
                    {" "}
                    <RemoveIcon fontSize="small" />
                  </Button>
                  {item.quantity}
                  <Button
                    onClick={() => {
                      dispatch(increaseCartItemQuantity(item._id));
                    }}
                  >
                    {" "}
                    <AddIcon fontSize="small" />
                  </Button>
                </td>
                <td className="d-flex">
                  <div className="border ms-2 ">
                    <FontAwesomeIcon
                      icon={faTrash}
                      style={{ cursor: "pointer" }}
                      onClick={() => removeItem(item._id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex py-2 ">
          <div
            className="form-check col-4"
            onChange={onChangeValue}
            style={{ cursor: "pointer" }}
          >
            <input
              className="form-check-input"
              type="radio"
              value="Serve on table"
              checked={type === "Serve on table"}
            />
            <label className="form-check-label" htmlFor="Serve">
              Serve on table
            </label>
          </div>
          <div
            className="form-check"
            onChange={onChangeValue}
            style={{ cursor: "pointer" }}
          >
            <input
              className="form-check-input"
              type="radio"
              value="Pickup from the counter"
              checked={type === "Pickup from the counter"}
            />
            <label className="form-check-label" htmlFor="Pickup">
              Pickup from the counter
            </label>
          </div>
        </div>
        <hr style={{ "border-top": "2px dashed" }} />
        <div className="d-flex justify-content-end py-1">
          <h4>Menu Price {totalPrice} $</h4>
        </div>
        <div className="d-flex justify-content-center py-1">
          <button
            type="button"
            className="btn btn-lg borderRadious"
            style={{ background: "#CC6744", color: "white" }}
            onClick={() => checkoutHandler()}
          >
            Proceed to payment
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Cart;
