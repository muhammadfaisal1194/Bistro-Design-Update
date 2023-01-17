import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "./../../redux/cart";
import { IMAGE_URL } from "./../../utils/api";

const Card = ({ item }) => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  console.log("itemsssssssssssssssssssssssss", item);

  const addItem = (item) => {
    let cartCopy = [...cart];
    let { _id } = item;
    let existingItem = cartCopy.find((cartItem) => cartItem._id == _id);
    if (existingItem) {
      let existingItem = cartCopy.find((cartItem) => cartItem._id == _id);
      const objCopy = { ...existingItem };
      objCopy.quantity += 1;
      console.log(objCopy);
      const updateCart = cartCopy.filter((x) => {
        return x._id != _id;
      });
      updateCart.push(objCopy);
      dispatch(setCart(updateCart));
    } else {
      cartCopy.push(item);
      dispatch(setCart(cartCopy));
    }
  };

  return (
    <div
      className="container d-flex flex-wrap py-4  card-fadein"
      style={{ minHeight: "18rem" }}
    >
      {item.map((item, index) => (
        <div
          className="card borderRadious m-2"
          style={{ width: "11rem", height:"13.4rem", background: "transparent" }}
        >
          <img
            src={`${IMAGE_URL}/${item.thumbnail}`}
            className="card-img-top borderRadious"
            height="110"
            alt="..."
          />
          <div className="d-flex justify-content-between  px-3 pt-3">
            <div>
              {item.name}
              {/* <p className="fs-6 text-secondary">Lemon & sugar</p> */}
            </div>
            <div className=" fs-2 fw-bold menu-color">€{item.price}</div>
          </div>
          <button
            className="btn borderRadious"
            style={{ background: "#162E4D", color: "white" }}
            onClick={() => addItem(item)}
          >
            + Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Card;
