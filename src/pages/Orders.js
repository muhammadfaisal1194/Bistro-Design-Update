import axios from "axios";
import React from "react"
import { useState, useEffect } from "react";
import { API_URL } from "../utils/api"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DetailsIcon from '@mui/icons-material/Details';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
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
import { Tooltip } from '@mui/material';

const Orders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState(null);
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

    const fetchAllOrders = async () => {
        const response = await axios.get(`${API_URL}/payment/index`);
        setOrders(response.data.data)
    };

    useEffect(() => {
        fetchAllOrders();
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

    const handleClose = () => { };

    const handleOk = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/payment/delete/${id}`);
            fetchAllOrders();
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
                            <TableCell>Order Number</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Table Number</TableCell>
                            <TableCell>Serve Type</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {orders &&
                            orders
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((order, key) => (
                                    <TableRow key={order._id}>
                                        <TableCell component="th" scope="row" align="center">
                                            {"" + 0 + (key + 1)}
                                        </TableCell>
                                        <TableCell>{moment(order.createdAt).format('h:mm:ss a')}</TableCell>
                                        <TableCell align="center">{order.table}</TableCell>
                                        <TableCell>{order.serveType}</TableCell>
                                        <TableCell>{order.status}</TableCell>

                                        <TableCell>
                                            {!(order.isBuffetOrder)?
                                                <Tooltip title="View">
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="update"
                                                        onClick={() => { navigate(`/dashboard/vieworder/${order._id}`, { replace: true }) }}
                                                    >
                                                        <DetailsIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            :<></>}
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    sx={{ marginLeft: 1 }}
                                                    edge="end"
                                                    aria-label="update"
                                                    onClick={() => { navigate(`/dashboard/editorders/${order._id}`, { replace: true }) }}
                                                >
                                                    <EditIcon />

                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    sx={{ marginLeft: 1 }}
                                                    edge="end"
                                                    aria-label="delete"
                                                    onClick={() => handleDelete(order._id)}
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
                    count={orders ? orders.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </Container>
    )
}

export default Orders;
