import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setBgColor } from "./../redux/layout";
const CartEmpty = () => {
  const state = useSelector((state) => state.layout);
  const dispatch = useDispatch();
  const [back, setBack] = useState("");

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
          <div style={{ marginRight: 105 }}>
            <img src="/assets/logo.png" alt="" width="80" height="80" />
          </div>

          <div className="border border-1 p-1">
            <FontAwesomeIcon
              icon={faShoppingBasket}
              style={{ height: "34px" }}
            />
          </div>
        </div>
      </nav>
      <div className="container text-center  ">
        <div className=" py-5  ">
          <img src="/assets/empty_cart.png" alt="" style={{ width: "30%" }} />
        </div>
        <h6 className="footer-heading-colo">Your cart is empty!</h6>
        <p className="footer-subheading-text">
          Looks like you haven't added anything to your cart. <br />
          Go ahead & explore some items.
        </p>
      </div>
    </>
  );
};

export default CartEmpty;
