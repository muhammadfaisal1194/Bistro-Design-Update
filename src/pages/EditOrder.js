import axios from "axios";
import React, { useEffect } from "react"
import { API_URL } from "../utils/api"
import { ToastContainer, toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from "yup";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    FormControl,
    Box,
    InputLabel,
    Select,
    MenuItem,
    Button,
    CircularProgress,
} from "@mui/material";

const EditOrder = () => {
    const [loading, setLoading] = React.useState(false);
    const { id } = useParams();
    const [selectedOrder, setSelectedOrder] = React.useState(id)
    const [order, setOrder] = React.useState({
        status: ""
    });
    const updateStatusSchema = Yup.object().shape({
        status: Yup.string().required("order status is required")
    });
    const navigate = useNavigate();
    const updateStatusFormik = useFormik({
        initialValues: {
            status: "",
        },
        validationSchema: updateStatusSchema,
        onSubmit: async (values) => {
            try {
                setLoading(true);
                const response = await updateStatusHandler(values);
                if (response.status == 200) {
                    setTimeout(() => {
                        setLoading(false);
                        toast.success('Order status updated successfully!')
                        setTimeout(() => {
                            navigate("/dashboard/orders")
                        }, 1500)
                    }, 500);
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    });

    const updateStatusHandler = async (values) => {
        try {
            const response = await axios.put(`${API_URL}/payment/update/${selectedOrder}`, values);
            console.log(response);
            return response
        } catch (error) {
            console.log(error);
        }
    };

    const fetchSingleOrder = async () => {
        const response = await axios.get(`${API_URL}/payment/view/${selectedOrder}`);
        console.log('response', response)
        setOrder({
            ...order,
            status: response.data.data.status,
        })
    };

    useEffect(() => {
        fetchSingleOrder();
    }, []);

    return (
        <>
            <Container>
                <form onSubmit={updateStatusFormik.handleSubmit}>
                    <Typography variant="h6" color="#162e4d">
                        Order Status
                    </Typography>
                    <FormControl fullWidth sx={{ marginTop: "20px" }} >
                        <InputLabel id="demo-simple-select-label" >
                            Select Order Status
                        </InputLabel>
                        <Select

                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={updateStatusFormik.values.status}
                            label="Select Order Status"
                            onChange={(e) => {
                                updateStatusFormik.setValues({
                                    ...updateStatusFormik.values,
                                    status: e.target.value
                                })
                            }}
                            error={Boolean(
                                updateStatusFormik.touched.status &&
                                updateStatusFormik.errors.status
                            )}
                        >
                            <MenuItem value="Upcoming" key="Upcoming">
                                Upcoming
                            </MenuItem>
                            <MenuItem value="Working on it" key="Working on it">
                                Working on it
                            </MenuItem>
                            <MenuItem value="Finished" key="Finished">
                                Finished
                            </MenuItem>
                        </Select>
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
                                        ":hover": { backgroundColor: "#002655", color: "#fff" }
                                    }}
                                    variant="contained"
                                    style={{ textTransform: "none" }}
                                >
                                    <CircularProgress color="inherit" size={20} />
                                    Updating Status...
                                </Button>
                            ) : (
                                <Button sx={{
                                    mt: 2,
                                    background: "#162e4d",
                                    ":hover": { backgroundColor: "#002655", color: "#fff" }
                                }} variant="contained" type="submit">
                                    Update Order Status
                                </Button>
                            )}
                        </Box>
                    </FormControl>
                </form>
            </Container>
            <ToastContainer />
        </>
    )
}

export default EditOrder