import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { API_URL } from "../utils/api"
import { TextField, Button, CircularProgress } from "@mui/material";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const [responseMsg, setResponseMsg] = React.useState("");
  const navigate = useNavigate();
  const loginUserSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please Enter Valid Email")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginUserFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginUserSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await loginHandler(values);
        if (response.status == 200) {
          setLoading(false);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", JSON.stringify(response.data.user));
          localStorage.setItem("role", JSON.stringify(response.data.user.role));
          if (response.data.user.role == 1) {
            navigate("/dashboard/allmenus")
          } else {
            navigate("/dashboard/chat")
          }
        }
      } catch (error) {
        setResponseMsg(error.response.data.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const loginHandler = async (values) => {
    try {

      const response = await axios.post(`${API_URL}/auth/login`, values);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col">
            <h3>LOGIN TO THE SYSTEM</h3>
          </div>
        </div>

        <form autoComplete="off" onSubmit={loginUserFormik.handleSubmit} style={{ position: "relative", bottom: "25px" }}>
          <div className="row d-flex flex-column align-items-center mt-5">
            <div className="col-lg-5 col-md-8 p-3">
              {responseMsg ? (
                <Alert severity="error">{responseMsg}</Alert>
              ) : null}
            </div>

            <div className="col-lg-5 col-md-8 p-3">
              <TextField
                fullWidth
                label="USERNAME OR EMAIL"
                name="email"
                type="email"
                variant="outlined"
                onChange={loginUserFormik.handleChange("email")}
                value={loginUserFormik.values.email}
                error={Boolean(
                  loginUserFormik.touched.email && loginUserFormik.errors.email
                )}
                helperText={
                  loginUserFormik.touched.email && loginUserFormik.errors.email
                }
              />
            </div>

            <div className="col-lg-5 col-md-8 p-3">
              <TextField
                fullWidth
                label="PASSWORD"
                name="password"
                type="password"
                variant="outlined"
                onChange={loginUserFormik.handleChange("password")}
                value={loginUserFormik.values.password}
                error={Boolean(
                  loginUserFormik.touched.password &&
                  loginUserFormik.errors.password
                )}
                helperText={
                  loginUserFormik.touched.password &&
                  loginUserFormik.errors.password
                }
              />
            </div>

            <div className="col-lg-5 col-md-8 mt-2 px-4">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  {loading ? (
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{
                        padding: "0 20%",
                        height: "69px",
                        borderRadius: "10px",
                        fontSize: "16px",
                        fontWeight: 700,
                        background: "#00306A",
                        ":hover": { backgroundColor: "#002655", color: "#fff" },
                      }}
                    >
                      <CircularProgress
                        color="inherit"
                        size={20}
                        sx={{ mr: 1 }}
                      />
                      Signing In
                    </Button>
                  ) : (
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{
                        padding: "0 20%",
                        height: "69px",
                        borderRadius: "10px",
                        fontSize: "20px",
                        fontWeight: 700,
                        background: "#162e4d",
                        ":hover": { backgroundColor: "#002655", color: "#fff" },
                      }}
                    >
                      LOGIN
                    </Button>
                  )}
                </div>

              </div>
            </div>
          </div>
        </form>
        <div className="spacing-div"></div>
      </div>
    </>
  );
};
export default Login;
