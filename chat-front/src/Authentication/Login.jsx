import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const userData = await response.json();
      setUser(userData.user);
      navigate("/chat");
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  return (
    <div className="flex flex-col pb-14 login justify-center h-screen md:pb-20 ">
      <div className=" md:w-2/4 lg:w-1/3 mx-auto login-box rounded-xl shadow-2xl">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm  ">
          <h2 className="mt-10 text-center text-3xl font-bold  text-[#7a076b]">
            Login
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
         
           <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6 mx-16">
                <div>
                  <label htmlFor="username">Username:</label>
                  <Field
                    id="username"
                    type="text"
                    name="username"
                    className="field shadow-xl ring-1 ring-inset ring-purple-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="username" />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <Field
                    id="password"
                    type="password"
                    name="password"
                    className=" field shadow-xl ring-1 ring-inset ring-purple-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <ErrorMessage name="password" />
                </div>
                <Link to="/forgotpassword">Forgot Password?</Link>
                {error && <div className="text-red-500">{error}</div>}
                <div className="text-center pb-6">
                  <button
                    type="submit"
                    className="button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  <p>
                    Don't have an account? <Link to="/register">Register</Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
