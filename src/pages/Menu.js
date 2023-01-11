import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { API_URL } from "../utils/api";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import moment from "moment";

const ListMenu = () => {
  const navigate = useNavigate();
  const [menus, setMenus] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  //************************** Fetch All-Menu Handler ***********************//

  const fetchAllMenus = async () => {
    const response = await axios.get(`${API_URL}/menus/getAllMenus`);
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
      const response = await axios.delete(`${API_URL}/menus/delete/${id}`);
      fetchAllMenus();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Menu Dates</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {menus &&
              menus
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((menu, index) => (
                  <TableRow key={menu._id}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {menu.dates.map((d, index) => (
                        <p key={index}>
                          {" "}
                          {`${moment(d.day).format("MMMM Do YYYY")}`}
                        </p>
                      ))}
                    </TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton
                          sx={{ marginLeft: 1 }}
                          edge="end"
                          aria-label="update"
                          onClick={() => {
                            navigate(`/dashboard/editmenu/${menu._id}`, {
                              replace: true,
                            });
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
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

export default ListMenu;
