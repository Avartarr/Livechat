import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";


const Register = () => {
    const navigate = useNavigate();


    const initialValues = {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
       username: Yup.string().required("Username is required"),
       email: Yup.string().email("invalid Email").required("Email is required"),
       password: Yup.string().min(8).max(20)
       .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character'
       )
       .required("Password is required"),
       confirmPassword: Yup.string()
       .oneOf([Yup.ref('password'), null], 'Passwords must match')
       .required('Required'),
    })

    const onSubmit = async (values) => {
        try{
          const response = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          
          if (!response.ok){
            const errorData = await response.json();
            console.error('Registration failed', errorData.errors);
          } else {
            console.log('Registration successful');
            navigate("/");
          } 
          
        } catch (error){
          console.error('Error in registration', error.message);
        }
       };

  return (
    <div className="flex flex-col justify-center h-screen login">
      <div className="w-4/5 md:w-2/4 lg:w-1/3 mx-auto login-box rounded-xl shadow-2xl">

        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          <h2 className="mt-10 text-center text-3xl font-bold  text-[#7a076b]">
            Register
          </h2>
        </div>
        <div className="mt-10 mx-16  sm:max-w-sm ">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          <Form className="space-y-6">
            <div className="">
              <label
                htmlFor="username">
                Username:
              </label>
              <Field
                type="text"
                name= "username"
                id = "username"
                placeholder="username"
                className="field shadow-xl ring-1 ring-inset ring-purple-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

              />
              <ErrorMessage name="username" component="div" />
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="pb-2 block text-sm font-bold leading-4 text-black"
              >
                Email:
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                className="field shadow-xl ring-1 ring-inset ring-purple-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 />
              <ErrorMessage name="email" component="div" />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <label
                htmlFor="password" >
                Password
              </label>
              <Field
                type="password"
                name="password"
                placeholder="******"
                className="field shadow-xl ring-1 ring-inset ring-purple-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              <ErrorMessage name="password" component="div" />
            </div>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
              <label
                htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="*******"
                className="field shadow-xl ring-1 ring-inset ring-purple-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                 />
                 <ErrorMessage name="confirmPassword" component="div" />
            </div>
            <div className="text-center pb-6">
            <button
              type="submit"
              className='button'
            >
              Sign up
            </button>
            <p>Already have an account?
                <Link to="/"> Log in</Link>
            </p>
            </div>
          </Form>
          </Formik>
        </div>
        </div>
      </div>
  )
}

export default Register