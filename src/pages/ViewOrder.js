import axios from "axios";
import React from "react"
import { useState, useEffect } from "react";
import { API_URL } from "../utils/api"
import "react-confirm-alert/src/react-confirm-alert.css";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Button,
    Box,
    TablePagination,
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ListMenu = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState([]);
    const [selectedOrder, setSelectedOrder] = React.useState(id)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const fetchSingleOrder = async () => {
        const response = await axios.get(`${API_URL}/payment/view/${selectedOrder}`);
        setOrder(response.data.data.items)
        console.log('response', order)

    };
    useEffect(() => {
        fetchSingleOrder();
    }, []);

    return (
        <Container>
            <ArrowBackIcon size={50} style={{cursor: 'pointer'}} onClick={()=> navigate('/dashboard/orders')} />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell>Item Quantity</TableCell>
                            <TableCell>Menu Type</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {order &&
                            order
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((menu) => (
                                    <TableRow key={selectedOrder}>
                                        <TableCell component="th" scope="row">
                                            {menu.name}
                                        </TableCell>
                                        <TableCell>{menu.quantity}</TableCell>
                                        <TableCell>{menu.type}</TableCell>
                                    </TableRow>
                                ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={order ? order.length : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "end",

                }}
            >
            </Box>
        </Container>
    )
}

export default ListMenu
