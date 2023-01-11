import React, { useState, useEffect } from "react";
import Menu from "./Menu";
import MobileDrink from "./MobileDrink";
import MenuHeader from "./MenuHeader";
import MobileCard from "./MobileCard";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { setBgColor } from "../../redux/layout";
import { setSelectedTab } from "../../redux/layout";
import ReactLoading from "react-loading";

const MobileHome = () => {
  const dispatch = useDispatch();
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
  const [type, setType] = useState("Serve on table");
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
      if (menu.subType == selectedType) selected.push(menu);
    });
    setSelectedTypeItems(selected);
  }, [selectedType, menus]);

  const RenderdComponent = () => {
    if (state.selectedTab === 1) {
      return <Menu day={day} buffets={buffets} buffetPrice={buffetPrice} />;
    } else if (state.selectedTab === 2 || state.selectedTab === 3) {
      return (
        <>
          <MobileDrink
            selectedSubCategories={selectedSubCategories}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
          />
          <MobileCard selectedTypeItems={selectedTypeItems} />
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
      <div
        className="d-flex justify-content-around"
        style={{ background: state.bgColor }}
      >
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
        <div
          className="pt-3 d-flex justify-content-around pb-5"
          style={{ background: state.bgColor }}
        >
          <RenderdComponent />
        </div>
      )}
    </>
  );
};

export default MobileHome;
