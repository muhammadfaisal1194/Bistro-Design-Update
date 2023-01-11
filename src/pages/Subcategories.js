import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { confirmAlert } from "react-confirm-alert";
import { useFormik } from "formik";
import * as Yup from "yup";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import {
  Container,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  IconButton,
  TablePagination,
} from "@mui/material";

const Subcategories = () => {
  const navigate = useNavigate();
  const [drinks, setDrinks] = React.useState([]);
  const [snacks, setSnacks] = React.useState([]);
  const [newSubCategory, setnewSubCategory] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [menus, setMenus] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [subCategories, setsubCategories] = React.useState([]);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const createMenuSchema = Yup.object().shape({
    name: Yup.string().required("Product name is required"),
    subType: Yup.string().notRequired(),
  });

  const createMenuFormik = useFormik({
    initialValues: {
      name: "",
      subType: "",
    },
  });

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //************************** Fetch All-Menu Handler ***********************//

  const fetchAllMenus = async () => {
    const response = await axios.get(`${API_URL}/subcategory/index`);
    setMenus(response.data.data);
  };

  useEffect(() => {
    fetchAllMenus();
  }, []);

  //**************************** Menu Delete Handler *************************//
  function handleDelete(id) {
    confirmAlert({
      title: "Confirm To Delete!",
      message: "Are you sure to delete this?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleOk(id),
        },
        {
          label: "No",
          onClick: () => handleClose(),
        },
      ],
    });
  }

  const handleClose = () => {};

  const handleOk = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/subcategory/delete/${id}`
      );
      fetchSubCategoreis();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubCategoreis = async () => {
    try {
      setDrinks([]);
      setSnacks([]);
      const response = await axios.get(`${API_URL}/subcategory/index`);

      setsubCategories(response.data.data);
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

  useEffect(() => {
    fetchSubCategoreis();
  }, [selectedCategory]);

  return (
    <Container>
      <FormControl fullWidth sx={{ marginTop: "20px", marginBottom: "20px" }}>
        <InputLabel id="demo-simple-select-label">Select Menu Type</InputLabel>
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {selectedCategory === "Drinks" &&
              drinks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((menu) => (
                  <TableRow key={menu._id}>
                    <TableCell component="th" scope="row">
                      {menu.name}
                    </TableCell>
                    <TableCell>
                      {/* <Tooltip title="Edit">
                        <IconButton
                          sx={{ marginLeft: 1 }}
                          edge="end"
                          aria-label="update"
                          onClick={() => {
                            navigate(`/dashboard/editproduct/${menu._id}`, {
                              replace: true,
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ marginLeft: 1 }}
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(menu._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
            {selectedCategory === "Snacks" &&
              snacks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((menu) => (
                  <TableRow key={menu._id}>
                    <TableCell component="th" scope="row">
                      {menu.name}
                    </TableCell>
                    <TableCell>
                      {/* <Tooltip title="Edit">
                        <IconButton
                          sx={{ marginLeft: 1 }}
                          edge="end"
                          aria-label="update"
                          onClick={() => {
                            navigate(`/dashboard/editproduct/${menu._id}`, {
                              replace: true,
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip> */}
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ marginLeft: 1 }}
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDelete(menu._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={menus ? menus.length : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
};

export default Subcategories;
