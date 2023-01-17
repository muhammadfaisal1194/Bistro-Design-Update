import axios from "axios";
import React, { useEffect } from "react";
import { API_URL } from "../utils/api";
import { ToastContainer, toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Box,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
} from "@mui/material";

const EditProduct = () => {
  const [loading, setLoading] = React.useState(false);
  const [fileName, setFileName] = React.useState("");
  const [type, setType] = React.useState(false);
  const [menu, setMenu] = React.useState({
    name: "",
    description: "",
    price: 0,
    type: "",
    thumbnail: "",
  });
  const { id } = useParams();
  const [selectedMenu, setSelectedMenu] = React.useState(id);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [newSubCategory, setnewSubCategory] = React.useState("");
  const [drinks, setDrinks] = React.useState([]);
  const [snacks, setSnacks] = React.useState([]);
  const navigate = useNavigate();
  const createMenuSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    description: Yup.string().required("Product description is required"),
    price: Yup.number().required("Product price is required"),
    type: Yup.string().required("Product is required"),
    subType: Yup.string().notRequired(),
    thumbnail: Yup.mixed().notRequired(),
  });
  const createMenuFormik = useFormik({
    enableReinitialize: true,
    initialValues: menu,
    validationSchema: createMenuSchema,
    onSubmit: async (values) => {
      try {
        console.log("values", values);
        setLoading(true);
        const response = await updateMenuHandler(values);
        if (response.status == 200) {
          setTimeout(() => {
            setLoading(false);
            toast.success("Product Edited Successfully!");
            setTimeout(() => {
              navigate("/dashboard/allproducts");
            }, 1500);
          }, 500);
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });
  const updateMenuHandler = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("type", values.type);
      formData.append("thumbnail", values.thumbnail);
      const response = await axios.put(
        `${API_URL}/items/update/${selectedMenu}`,
        formData
      );
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const fetchSingleMenu = async () => {
    const response = await axios.get(`${API_URL}/items/view/${selectedMenu}`);
    console.log("response", response);
    setMenu({
      ...menu,
      name: response.data.data.name,
      price: response.data.data.price,
      description: response.data.data.description,
      type: response.data.data.type,
      type: response.data.data.subType,
    });
  };
  const fetchSubCategoreis = async () => {
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
      setDrinks(drs);
      setSnacks(sns);
    } catch (error) {
      console.log(error);
    }
  };
  const createSubCategory = async () => {
    try {
      const response = await axios.post(`${API_URL}/subcategory/create`, {
        name: newSubCategory,
        category: selectedCategory,
      });

      fetchSubCategoreis();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSubCategoreis();
    fetchSingleMenu();
  }, []);

  return (
    <>
      <Container>
        <form onSubmit={createMenuFormik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            autoFocus
            onChange={createMenuFormik.handleChange("name")}
            value={createMenuFormik.values.name || ""}
            error={Boolean(
              createMenuFormik.touched.name && createMenuFormik.errors.name
            )}
            helperText={
              createMenuFormik.touched.name && createMenuFormik.errors.name
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            multiline
            minRows={4}
            maxRows={4}
            onChange={createMenuFormik.handleChange("description")}
            value={createMenuFormik.values.description || ""}
            error={Boolean(
              createMenuFormik.touched.description &&
                createMenuFormik.errors.description
            )}
            helperText={
              createMenuFormik.touched.description &&
              createMenuFormik.errors.description
            }
          />
          <FormControl fullWidth sx={{ marginTop: "20px" }}>
            <InputLabel id="demo-simple-select-label">
              Select Menu Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={createMenuFormik.values.type}
              label="Select Menu Type"
              onChange={(e) => {
                createMenuFormik.setValues({
                  ...createMenuFormik.values,
                  type: e.target.value,
                });
                setSelectedCategory(e.target.value);
              }}
              error={Boolean(
                createMenuFormik.touched.type && createMenuFormik.errors.type
              )}
            >
              <MenuItem value="Buffet" key="Buffet">
                Buffet
              </MenuItem>
              <MenuItem value="Drinks" key="Drinks">
                Drinks
              </MenuItem>
              <MenuItem value="Snacks" key="Snacks">
                Snacks
              </MenuItem>
            </Select>
          </FormControl>
          {createMenuFormik.touched.type && createMenuFormik.errors.type ? (
            <div style={{ color: "#da5455" }}>Menu type is required</div>
          ) : null}

          {!(selectedCategory == "Buffet") ? (
            <>
              <FormControl fullWidth sx={{ marginTop: "20px" }}>
                <InputLabel id="demo-simple-select-label">
                  Select Subcategory
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={createMenuFormik.values.subType}
                  label="Select Menu Type"
                  onChange={(e) => {
                    console.log("e: => ", e.target.value);
                    createMenuFormik.setValues({
                      ...createMenuFormik.values,
                      subType: e.target.value,
                    });
                  }}
                  error={Boolean(
                    createMenuFormik.touched.subType &&
                      createMenuFormik.errors.subType
                  )}
                >
                  {selectedCategory === "Drinks" &&
                    drinks.map((category) => (
                      <MenuItem value={category._id} key={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  {selectedCategory === "Snacks" &&
                    snacks.map((category) => (
                      <MenuItem value={category._id} key={category._id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  <MenuItem>
                    <TextField
                      onChange={(e) => setnewSubCategory(e.target.value)}
                      value={newSubCategory}
                      variant="outlined"
                      margin="normal"
                      label="Name"
                      name="name"
                      autoFocus
                    ></TextField>
                    <Button
                      sx={{
                        mt: 2,
                        mx: 2,
                        background: "#162e4d",
                        ":hover": { backgroundColor: "#002655", color: "#fff" },
                      }}
                      variant="contained"
                      style={{ textTransform: "none" }}
                      onClick={createSubCategory}
                    >
                      Add Subcategory
                    </Button>
                  </MenuItem>
                </Select>
              </FormControl>
              {createMenuFormik.touched.subType &&
              createMenuFormik.errors.subType ? (
                <div style={{ color: "#da5455" }}>
                  Menu Sub type is required
                </div>
              ) : null}
            </>
          ) : (
            <></>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Price"
            name="price"
            autoFocus
            onChange={createMenuFormik.handleChange("price")}
            value={createMenuFormik.price}
            error={Boolean(
              createMenuFormik.touched.price && createMenuFormik.errors.price
            )}
            helperText={
              createMenuFormik.touched.price && createMenuFormik.errors.price
            }
          />
          {!(selectedCategory == "Buffet") ? (
            <>
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
                      createMenuFormik.setValues({
                        ...createMenuFormik.values,
                        thumbnail: event.target.files[0],
                      });
                    }}
                    error={Boolean(
                      createMenuFormik.touched.thumbnail &&
                        createMenuFormik.errors.thumbnail
                    )}
                    hidden
                  />
                </Button>
                <span style={{ marginLeft: 15 }}>{fileName}</span>
              </Box>
              {createMenuFormik.touched.thumbnail &&
              createMenuFormik.errors.thumbnail ? (
                <div style={{ color: "red" }}>Thumbnail is required</div>
              ) : null}
            </>
          ) : (
            <></>
          )}
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
                  mt: 2,
                  background: "#162e4d",
                  ":hover": { backgroundColor: "#002655", color: "#fff" },
                }}
                variant="contained"
                style={{ textTransform: "none" }}
              >
                <CircularProgress color="inherit" size={20} />
                Updating Adding...
              </Button>
            ) : (
              <Button
                sx={{
                  mt: 2,
                  background: "#162e4d",
                  ":hover": { backgroundColor: "#002655", color: "#fff" },
                }}
                variant="contained"
                type="submit"
              >
                Update Menu
              </Button>
            )}
          </Box>
        </form>
      </Container>
      <ToastContainer />
    </>
  );
};

export default EditProduct;
