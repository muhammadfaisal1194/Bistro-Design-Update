import axios from "axios";
import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [value, setValue] = React.useState([null, null]);
  const [fileName, setFileName] = React.useState("");
  const [createOrUpdate, setCreateOrUpdate] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [thumbnail, setThumbnail] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [freeItem, setFreeItem] = React.useState("");
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [values, setValues] = React.useState([today, tomorrow]);

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

  const createMenuHandler = async () => {
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

    console.log("datessssss", dates);

    if (!thumbnail) {
      toast.error("Please select the file!");
      return;
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
      formData.append("thumbnail", thumbnail);
      formData.append("price", price);
      formData.append("freeItem", freeItem);

      const response = await axios.post(`${API_URL}/menus/create`, formData);
      console.log(response);
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/dashboard/allmenus");
      }, 1000);
      setItems([]);
      setValue([null, null]);
      setFileName(null);
      setThumbnail(null);
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

      <Box sx={{ mt: 5 }}>
        <Button
          sx={{
            background: "#162e4d",
            ":hover": { backgroundColor: "#002655", color: "#fff" },
          }}
          variant="contained"
          component="label"
          startIcon={<CloudUploadIcon />}
        >
          Upload Thumbnail
          <input
            type="file"
            accept="image/*"
            onChange={(event) => {
              setFileName(event.target.files[0].name);
              setThumbnail(event.target.files[0]);
              var reader = new FileReader();

              //Read the contents of Image File.
              reader.readAsDataURL(event.target.files[0]);
              reader.onload = function(e) {
                //Initiate the JavaScript Image object.
                var image = new Image();

                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;

                //Validate the File Height and Width.
                image.onload = function() {
                  var height = this.height;
                  var width = this.width;
                  console.log("width", width);
                  console.log("height", height);
                  if (height > 1000 || width > 1000) {
                    alert("Height and Width must not exceed 100px.");
                    return false;
                  }
                };
              };
            }}
            hidden
          />
        </Button>
        <span style={{ marginLeft: 15 }}>{fileName}</span>
      </Box>
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        label="Menu Price"
        name="price"
        value={price}
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
            Menu Adding...
          </Button>
        ) : (
          <Button
            onClick={createMenuHandler}
            sx={{
              mt: 2,
              background: "#162e4d",
              ":hover": { backgroundColor: "#002655", color: "#fff" },
            }}
            variant="contained"
          >
            Add Menu
          </Button>
        )}
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default AddMenu;
