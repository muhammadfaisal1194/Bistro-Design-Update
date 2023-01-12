import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import SubCategories from "./SubCategories";
import MenuHeader from "./MenuHeader";
import Card from "./Card";
import DrinkAnimation from "./DrinkAnimation";
import axios from "axios";
import { API_URL } from "../../utils/api";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import SnacksAnimation from "./SnacksAnimation";
import { useDispatch, useSelector } from "react-redux";
import { setBgColor } from "../../redux/layout";
import { setSelectedTab } from "../../redux/layout";
import ReactLoading from "react-loading";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state.layout);
  const [subDrinks, setSubDrinks] = useState(false);
  const [subSnacks, setSubSnacks] = useState(false);
  const [buffets, setBuffets] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [snacks, setSnacks] = useState([]);
  const [drinksCats, setDrinksCats] = useState([]);
  const [snacksCats, setSnacksCats] = useState([]);
  const [menus, setMenus] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState("");
  const [selectedTypeItems, setSelectedTypeItems] = useState([]);
  const [buffetPrice, setBuffetPrice] = useState([]);
  const [freeItem, setFreeItem] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  let day = weekday[d.getDay()];

  const fetchAllMenu = async () => {
    let bfs = [];
    let drs = [];
    let sns = [];
    const response = await axios.get(`${API_URL}/items/index`);
    const responseMenu = await axios.get(`${API_URL}/menus/index`);
    setMenus(response.data.data);
    console.log("responseeeeeeeeeeeeeeeeeeeee", response.data.data);
    if (response.data) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      response.data.data.map((d) => {
        if (d.type === "Buffet") {
          bfs.push(d);
        } else if (d.type === "Drinks") {
          drs.push(d);
        } else {
          sns.push(d);
        }
      });

      if (responseMenu.data.data && responseMenu.data.data) {
        let items = responseMenu.data.data.items;
        if (items) {
          setBuffetPrice(responseMenu.data.data.price);
          setThumbnail(responseMenu.data.data.thumbnail);
          setBuffets(responseMenu.data.data.items);
          setFreeItem(responseMenu.data.data.freeItem);
          setDrinks(drs);
          setSnacks(sns);
        }
      }
    }
  };

  useEffect(() => {
    const tableNumber = searchParams.get("table");
    tableNumber
      ? localStorage.setItem("table", tableNumber)
      : localStorage.setItem("table", 0);
  }, []);

  useEffect(() => {
    const params = {
      table: 0,
    };
    const options = {
      pathname: "/",
      search: `?${createSearchParams(params)}`,
    };
    navigate(options, { replace: true });
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/subcategory/index`);

      let drs = [];
      let sns = [];
      response.data.data.map((d) => {
        if (d.category === "Drinks") {
          drs.push(d);
        } else {
          sns.push(d);
        }
      });
      setDrinksCats(drs);
      if (state.selectedTab === 2) {
        setSelectedType(drs[0]._id);
      }
      setSnacksCats(sns);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllMenu();
    fetchSubCategories();
  }, []);

  useEffect(() => {
    let selected = [];
    menus.map((menu) => {
      if (menu.subType == selectedType) {
        selected.push(menu);
      }
    });
    setSelectedTypeItems(selected);
  }, [selectedType, menus]);

  const RenderdComponent = () => {
    if (state.selectedTab === 1) {
      return <Menu day={day} buffets={buffets} buffetPrice={buffetPrice} />;
    } else if (state.selectedTab === 2 || state.selectedTab === 3) {
      return (
        <>
          <SubCategories
            selectedSubCategories={selectedSubCategories}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <Card item={selectedTypeItems} />
        </>
      );
    }
  };

  const RenderdHeader = () => {
    if (state.selectedTab === 1) {
      return <MenuHeader bgColor={state.bgColor} />;
    } else if (state.selectedTab === 2) {
      return <MenuHeader bgColor={state.bgColor} />;
    } else if (state.selectedTab === 3) {
      return <MenuHeader bgColor={state.bgColor} />;
    }
  };

  const RenderdAnimation = () => {
    if (state.selectedTab === 1) {
      return <SnacksAnimation />;
    } else if (state.selectedTab === 2) {
      return <DrinkAnimation />;
    } else if (state.selectedTab === 3) {
      return <SnacksAnimation />;
    }
  };

  useEffect(() => {
    if (state.selectedTab === 1) {
      setSubDrinks(false);
      setSubSnacks(false);
    } else if (state.selectedTab === 2) {
      setSubDrinks(true);
      setSubSnacks(false);
      if (drinksCats.length > 0) {
        setSelectedType(drinksCats[0]._id);
        setSelectedSubCategories(drinksCats);
      }
    } else if (state.selectedTab === 3) {
      setSubSnacks(true);
      setSubDrinks(false);
      if (snacksCats.length > 0) {
        setSelectedType(snacksCats[0]._id);
        setSelectedSubCategories(snacksCats);
      }
    }
  }, [snacksCats, drinksCats]);

  return (
    <>
      <div>
        <RenderdHeader />
      </div>
      <div className="row" style={{ margin: "0", paddingTop:"5%",background: state.bgColor }}>
        <div className="col-md-2 pt-5">
          <div className="nav flex-column ps-1 pe-4 py-4 menu-border spacing fs-4 position-fixed">
            <div style={{ width: "147px", marginRight: "10px" }}>
              <div
                onClick={() => {
                  dispatch(setBgColor("rgba(255, 255, 255,0.5)"));
                  dispatch(setSelectedTab(1));
                  setSubDrinks(false);
                  setSubSnacks(false);
                }}
                className={`tab-menu py-2 px-4 ${
                  state.selectedTab === 1 ? "tab-menu-active" : ""
                }`}
              >
                Menu
              </div>
              <div
                onClick={() => {
                  dispatch(setBgColor("rgba(143, 158, 169,0.5)"));
                  dispatch(setSelectedTab(2));
                  setSubDrinks(true);
                  setSubSnacks(false);
                  setSelectedType(drinksCats[0]._id);
                  setSelectedSubCategories(drinksCats);
                }}
                className={`tab-menu py-2 px-4 ${
                  state.selectedTab === 2 ? "tab-menu-active" : ""
                }`}
              >
                Drinks
              </div>
              <div
                onClick={() => {
                  dispatch(setBgColor("rgba(204, 103, 68,0.5)"));
                  dispatch(setSelectedTab(3));
                  setSubDrinks(false);
                  setSubSnacks(true);
                  setSelectedType(snacksCats[0]._id);
                  setSelectedSubCategories(snacksCats);
                }}
                className={`tab-menu py-2 px-4 ${
                  state.selectedTab === 3 ? "tab-menu-active" : ""
                }`}
              >
                Snacks
              </div>

              <svg
                className="border-img"
                xmlns="http://www.w3.org/2000/svg"
                width="19.236"
                height="99.216"
                viewBox="0 0 19.236 114.216"
              >
                <g id="spoon" transform="translate(-30.224 -22.63)">
                  <path
                    id="Path_1"
                    data-name="Path 1"
                    d="M45.573,22.825c-.11-.037-.334-.109-.444-.147-.2,8.72-.251,17.441-.382,26.161.1,1.047-1.785,1.145-1.962.246-.254-8.782-.249-17.574-.387-26.362-.379-.019-.762-.032-1.141-.04q-.3,12.888-.377,25.78a1.816,1.816,0,0,1-.238,1.031c-.617.307-1.887.307-1.788-.665-.182-8.707-.246-17.42-.39-26.127-.379-.005-.759-.005-1.141,0-.069,4.275-.064,8.555-.235,12.83-.035,4.5-.072,9-.168,13.5-.107.892-1.219.59-1.825.51a28.979,28.979,0,0,1-.15-4.39c-.243-7.506-.249-15.019-.4-22.525a.861.861,0,0,0-.681.66,71.382,71.382,0,0,0-2.64,12.584c-.444,3.442-.8,6.894-.962,10.363-.086,3.642-.142,7.369.927,10.894a7.331,7.331,0,0,0,3.482,4.611A5.438,5.438,0,0,1,37.283,64.2c.676,1.148.529,2.521.7,3.792.548,8.408-.067,16.827-.35,25.23-.58,11.591-1.224,23.179-2.266,34.735-.04,1.965-.812,4.026.043,5.914a4.818,4.818,0,0,0,9.254-2.2c-1.195-12.349-1.916-24.738-2.549-37.127-.126-4.363-.449-8.718-.468-13.083a113.713,113.713,0,0,1,.144-14.875A5.634,5.634,0,0,1,43.1,63.17c1.018-1.268,2.8-1.583,3.763-2.908,1.937-2.446,2.3-5.687,2.528-8.691a80.552,80.552,0,0,0-.6-12.864,98.5,98.5,0,0,0-2.109-12.443A19.274,19.274,0,0,0,45.573,22.825Z"
                    transform="translate(0 0)"
                    fill="#162e4d"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        {loading ? (
          <div
            className="col-md-12 d-flex align-items-center justify-content-center"
            style={{ height: 300 }}
          >
            <div className="">
              <ReactLoading type={"bars"} color={"#162e4d"} />
            </div>
          </div>
        ) : (
          <>
            <div className="col-md-8">
              <RenderdComponent />
            </div>
            <div className="col-md-2 pt-5">
              <RenderdAnimation />
            </div>
          </>
        )}
      </div>
      
    </>
  );
};

export default Home;
