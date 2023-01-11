import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Menu = ({ day, buffets, buffetPrice }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const [type, setType] = useState("Serve on table");
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLogo(false);
    }, 500);
  }, []);

  buffets.map((item) => {
    console.log(item, "itemmm");
  });

  const checkoutHandler = () => {
    localStorage.setItem("amount", JSON.stringify(buffetPrice));
    localStorage.setItem("serveType", JSON.stringify("Server on table"));
    if (buffetPrice < 0) {
      toast.error("No items in buffet!");
    } else {
      navigate("/payment");
    }
  };

  return (
    <div className="fadeInUp ">
      <div className="text-center d-flex flex-column align-items-center">
        <img
          className={`fadeOut ${showLogo ? "" : "opacity-0"}`}
          src="/assets/logo.png"
          alt=""
          width="100"
          height="100"
        />

        <h1 className="heading-color fw-bold menu-spacing">It's {day}</h1>
        <p className="subheading-text">
          Today is world holiday, In this day people celebrate <br /> lorem
          ipsum dolor sit amet espene
        </p>

        <div className="d-flex justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="23.916"
            viewBox="0 0 142 23.916"
          >
            <g
              id="Group_1196"
              data-name="Group 1196"
              transform="translate(164.63 -30.224) rotate(90)"
            >
              <path
                id="Path_1"
                data-name="Path 1"
                d="M49.306,22.872c-.136-.046-.415-.136-.552-.183-.253,10.842-.312,21.684-.475,32.525.123,1.3-2.219,1.424-2.439.305-.316-10.918-.309-21.85-.482-32.774-.472-.023-.947-.04-1.419-.05q-.379,16.024-.468,32.051a2.258,2.258,0,0,1-.3,1.281c-.767.382-2.346.382-2.223-.827-.226-10.825-.306-21.657-.485-32.482-.472-.007-.944-.007-1.419,0-.086,5.315-.08,10.636-.292,15.951-.043,5.6-.09,11.194-.209,16.787-.133,1.109-1.515.734-2.269.634a36.027,36.027,0,0,1-.186-5.457c-.3-9.331-.309-18.673-.492-28a1.071,1.071,0,0,0-.847.82A88.746,88.746,0,0,0,31.471,39.1c-.552,4.279-1,8.571-1.2,12.883-.106,4.528-.176,9.162,1.153,13.544a9.114,9.114,0,0,0,4.329,5.733A6.761,6.761,0,0,1,39,74.306c.841,1.427.658,3.134.867,4.714.681,10.453-.083,20.92-.435,31.367-.721,14.41-1.522,28.817-2.817,43.185-.05,2.443-1.01,5.006.053,7.353a5.99,5.99,0,0,0,11.506-2.732c-1.485-15.353-2.382-30.756-3.17-46.159-.156-5.424-.558-10.839-.581-16.266A141.376,141.376,0,0,1,44.6,77.274a7,7,0,0,1,1.635-4.242c1.266-1.577,3.479-1.969,4.678-3.615,2.409-3.041,2.854-7.071,3.143-10.805a100.148,100.148,0,0,0-.748-15.994,122.464,122.464,0,0,0-2.621-15.469A23.962,23.962,0,0,0,49.306,22.872Z"
                transform="translate(0 0)"
                fill="#162e4d"
              />
            </g>
          </svg>

          <div className="mx-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40.48"
              height="56.416"
              viewBox="0 0 40.48 56.416"
            >
              <g
                id="Group_586"
                data-name="Group 586"
                transform="translate(-1081.267 -442.319)"
              >
                <g
                  id="Group_581"
                  data-name="Group 581"
                  transform="translate(1081.267 457.735)"
                >
                  <path
                    id="Path_529"
                    data-name="Path 529"
                    d="M1103.965,448.493c-10.407-.865-20.451,5.781-22.359,16.353a20.849,20.849,0,0,0,16.8,24.225c10.4,1.916,21.316-4.285,23.077-15.117,1.934-11.9-6.808-21.263-17.309-25.047-1.517-.546-2.2,1.853-.678,2.4,8.83,3.183,16.184,10.544,15.691,20.532-.541,11.012-11.866,17.132-21.846,14.437a18.369,18.369,0,0,1-13.459-19.662c1.036-10.094,10.367-16.442,20.057-15.635,1.615.134,1.643-2.353.03-2.487Z"
                    transform="translate(-1081.267 -448.417)"
                    fill="#162e4d"
                  />
                </g>
                <g
                  id="Group_582"
                  data-name="Group 582"
                  transform="translate(1099.203 447.155)"
                >
                  <path
                    id="Path_530"
                    data-name="Path 530"
                    d="M1090.849,461.025a24.906,24.906,0,0,1,17.011-14.624,1.1,1.1,0,1,0-.569-2.121,27.6,27.6,0,0,0-18.835,16.239c-.6,1.426,1.858,1.79,2.393.506Z"
                    transform="translate(-1088.362 -444.232)"
                    fill="#162e4d"
                  />
                </g>
                <g
                  id="Group_583"
                  data-name="Group 583"
                  transform="translate(1087.785 465.243)"
                >
                  <path
                    id="Path_531"
                    data-name="Path 531"
                    d="M1086.8,451.736a15.055,15.055,0,0,0-2.778,3.5c-.809,1.4,1.4,2.467,2.159,1.148a12.716,12.716,0,0,1,2.379-3.013c1.2-1.117-.627-2.692-1.759-1.636Z"
                    transform="translate(-1083.846 -451.387)"
                    fill="#162e4d"
                  />
                </g>
                <g
                  id="Group_584"
                  data-name="Group 584"
                  transform="translate(1086.098 473.591)"
                >
                  <path
                    id="Path_532"
                    data-name="Path 532"
                    d="M1083.231,455.849a14.463,14.463,0,0,0,12.455,15.59c1.517.22,2.323-2.06.708-2.3a12.2,12.2,0,0,1-10.645-13.32c.129-1.555-2.394-1.476-2.518.025Z"
                    transform="translate(-1083.179 -454.69)"
                    fill="#162e4d"
                  />
                </g>
                <g
                  id="Group_585"
                  data-name="Group 585"
                  transform="translate(1096.712 442.319)"
                >
                  <path
                    id="Path_533"
                    data-name="Path 533"
                    d="M1093.879,457.611c-3.627-3.9-3.868-9.212-4-14.258l-1.309,1.12c6.8.3,4.032,10.314,3.9,14.381-.045,1.459,2.457,1.274,2.5-.086.187-5.819,2.558-16.065-6.284-16.449a1.3,1.3,0,0,0-1.31,1.12c.152,5.728.589,11.388,4.672,15.772.918.988,2.877-.478,1.83-1.6Z"
                    transform="translate(-1087.377 -442.319)"
                    fill="#162e4d"
                  />
                </g>
              </g>
            </svg>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="23.916"
            viewBox="0 0 142 23.916"
          >
            <g
              id="Group_1197"
              data-name="Group 1197"
              transform="translate(142) rotate(90)"
            >
              <path
                id="Path_1"
                data-name="Path 1"
                d="M19.083,141.758c-.136.046-.415.136-.552.183-.253-10.842-.312-21.684-.475-32.525.123-1.3-2.219-1.424-2.439-.305-.316,10.918-.309,21.85-.482,32.774-.472.023-.947.04-1.419.05q-.379-16.024-.468-32.051a2.258,2.258,0,0,0-.3-1.281c-.767-.382-2.346-.382-2.223.827-.226,10.825-.306,21.657-.485,32.482-.472.007-.944.007-1.419,0-.086-5.315-.08-10.636-.292-15.951-.043-5.6-.09-11.194-.209-16.787-.133-1.109-1.515-.734-2.269-.634A36.027,36.027,0,0,0,5.869,114c-.3,9.331-.309,18.673-.492,28a1.071,1.071,0,0,1-.847-.82,88.746,88.746,0,0,1-3.283-15.645c-.552-4.279-1-8.571-1.2-12.883-.106-4.528-.176-9.162,1.153-13.544a9.114,9.114,0,0,1,4.329-5.733,6.761,6.761,0,0,0,3.243-3.051c.841-1.427.658-3.134.867-4.714.681-10.453-.083-20.92-.435-31.367-.721-14.41-1.522-28.817-2.817-43.185-.05-2.443-1.01-5.006.053-7.353A5.99,5.99,0,0,1,17.95,6.437C16.465,21.791,15.568,37.194,14.78,52.6c-.156,5.424-.558,10.839-.581,16.266a141.376,141.376,0,0,0,.179,18.493A7,7,0,0,0,16.013,91.6c1.266,1.577,3.479,1.969,4.678,3.615,2.409,3.041,2.854,7.071,3.143,10.805a100.148,100.148,0,0,1-.748,15.994,122.465,122.465,0,0,1-2.621,15.469A23.963,23.963,0,0,1,19.083,141.758Z"
                fill="#162e4d"
              />
            </g>
          </svg>
        </div>

        <div className="menu-color mt-3 " style={{ width: "25rem" }}>
          {buffets.map((item) => (
            <p>
              <span>{item.name}</span>
            </p>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <h6>Menu Price {buffetPrice}$</h6>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-sm borderRadious mb-5"
          style={{ background: "#CC6744", color: "white" }}
          onClick={() => {
            checkoutHandler();
          }}
        >
          Proceed to payment
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Menu;
