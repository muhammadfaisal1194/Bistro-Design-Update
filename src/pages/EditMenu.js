import axios from "axios";
import React, { useState, useEffect } from "react";
import { API_URL } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Box,
  Button,
  CircularProgress,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";
import { useParams, useNavigate } from "react-router-dom";

const EditMenu = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectMenu, setSelectMenu] = React.useState(id);
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState([null, null]);
  const [fileName, setFileName] = React.useState("");
  const [createOrUpdate, setCreateOrUpdate] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [freeItem, setFreeItem] = React.useState("");
  const [price, setPrice] = React.useState(null);
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [values, setValues] = React.useState([]);

  const createMenuSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
  });

  const createMenuFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: createMenuSchema,
    onSubmit: async (values, { setFieldError, setValues, setFieldTouched }) => {
      try {
        if (createOrUpdate) {
          setItems([...items, values]);
        } else {
          const newArr = items.map((obj, index) => {
            if (index === selectedIndex) {
              return { ...obj, name: values.name };
            }
            return obj;
          });
          setItems(newArr);
          setCreateOrUpdate(true);
        }

        setValues({
          name: "",
        });
        setFieldError({ name: false });
        setFieldTouched({ name: false });
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  // useEffect(() => {
  //   setValues([today, tomorrow]);
  // }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${API_URL}/menus/view/${selectMenu}`);
      const dates = [];
      setItems(response.data.data.items);
      setPrice(response.data.data.price);
      const res = response.data.data.dates;
      for (let i = 0; i < res.length; i++) {
        dates.push(new Date(res[i].day));
      }
      setValues(dates);
      console.log("dates", dates);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const updatedMenuHandler = async () => {
    let dates = [];

    console.log("valuessss", values);

    if (values.length > 0) {
      for (let i = 0; i < values.length; i++) {
        let d = values[i];
        let date = null;
        if (d.month) {
          date = new Date(d.year, d.month.number - 1, d.day);
        }
        if (date) {
          dates.push(date);
        } else {
          dates.push(d);
        }
      }
    }



    if (!price) {
      toast.error("Please enter menu price!");
      return;
    }

    if (dates.length < 0) {
      toast.error("Please select one or more days!");
      return;
    }

    if (items.length <= 0) {
      toast.error("Please add one or more items!");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("dates", JSON.stringify(dates));
      formData.append("items", JSON.stringify(items));
      formData.append("price", price);
      formData.append("freeItem", freeItem);

      const response = await axios.post(
        `${API_URL}/menus/update/${selectMenu}`,
        formData
      );
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/dashboard/allmenus");
      }, 1000);

      setItems([]);
      setValue([null, null]);
      setFileName(null);
      setPrice(null);
      setFreeItem(null);
      return response;
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = (index) => {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  };

  return (
    <Container>
      <div className="mt-3">
        <label>Select the days</label>
        <DatePicker
          multiple
          value={values}
          onChange={setValues}
          plugins={[<DatePanel />]}
        />
      </div>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Menu Price"
        name="price"
        value={price || ""}
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Free Item"
        name="freeItem"
        value={freeItem}
        onChange={(e) => setFreeItem(e.target.value)}
      />

      <form onSubmit={createMenuFormik.handleSubmit}>
        <div className="row">
          <div className="col-md-10">
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              label="Name"
              name="name"
              onChange={createMenuFormik.handleChange("name")}
              value={createMenuFormik.values.name}
              error={Boolean(
                createMenuFormik.touched.name && createMenuFormik.errors.name
              )}
              helperText={
                createMenuFormik.touched.name && createMenuFormik.errors.name
              }
            />
          </div>
          <div className="col-md-2">
            <Button
              type="submit"
              sx={{
                marginTop: 2,
                width: "100%",
                background: "#162e4d",
                height: 52,
                ":hover": { backgroundColor: "#002655", color: "#fff" },
              }}
              variant="contained"
            >
              {createOrUpdate ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      </form>

      {items.map((item, index) => (
        <div className="row">
          <div className="col-md-8">
            {index + 1}.<span className="ml-2">{item.name}</span>
          </div>
          <div className="col-md-2">{item.price}</div>
          <div className="col-md-2">
            <IconButton
              sx={{ marginLeft: 1 }}
              edge="end"
              aria-label="delete"
              onClick={() => removeItem(index)}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              sx={{ marginLeft: 1 }}
              edge="end"
              aria-label="delete"
              onClick={() => {
                createMenuFormik.setValues({
                  ...createMenuFormik.values,
                  name: item.name,
                  price: item.price,
                });
                setCreateOrUpdate(false);
                setSelectedIndex(index);
                console.log(item);
              }}
            >
              <UpdateIcon />
            </IconButton>
          </div>
        </div>
      ))}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        {loading ? (
          <Button
            sx={{
              mt: 5,
              background: "#162e4d",
              ":hover": { backgroundColor: "#002655", color: "#fff" },
            }}
            variant="contained"
            style={{ textTransform: "none" }}
          >
            <CircularProgress color="inherit" size={20} />
            Menu Updating...
          </Button>
        ) : (
          <Button
            onClick={updatedMenuHandler}
            sx={{
              mt: 2,
              background: "#162e4d",
              ":hover": { backgroundColor: "#002655", color: "#fff" },
            }}
            variant="contained"
          >
            Update Menu
          </Button>
        )}
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default EditMenu;
