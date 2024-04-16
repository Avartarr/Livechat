import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./Auth.css";
import { GiPadlock } from "react-icons/gi";
import {Link} from "react-router-dom"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    

    try {
        const response = await fetch('[http://127.0.0.1:8000/api/ForgotPassword', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setMessage(data.status);
        
    } catch (error) {
        console.log(`Error! ${error}`);
    }
};
    const validationSchema =  Yup.object({
        email: Yup.string()
            .required("Please enter your email address.")
            .email("Invalid Email format")
    });

  return (
    <div className="flex flex-col pb-14 login justify-center h-screen md:pb-20 ">
    <div className=" md:w-2/4 lg:w-1/3 mx-auto login-box rounded-xl shadow-2xl">
        <div className="pt-6 text-[#7a076b] mx-44 lg:mx-60">
        <GiPadlock size={40} />
        </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-2 text-xl font-semibold text-center text-[#7a076b]">
        Trouble logging in? 
        </h2>
        <p className="mx-10 mt-4 text-gray-700">Enter your email and we'll send you a link to get back into your account.</p>
      </div>
      <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm ">
        <Formik>
          <Form
            className="space-y-6 mx-16"
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <div>
              <Field
                id="email"
                type="email"
                value = {email}
                name = "email"
                placeholder = "Example.com"
                onChange={(e) => setEmail(e.target.value)}
                className="field shadow-xl ring-1 ring-inset ring-purple-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <ErrorMessage name="email" />
            </div>
            
            <div className="text-center pb-2">
              <button
                type="submit"
                className="py-1 px-6 bg-purple-400 rounded-xl text-lg font-semibold hover:bg-[#e860ef]"
              >
                Send login link
              </button>
            
            </div>
            <hr />
            <div className="flex space-x-16 justify-center pb-4 text-[#7a076b]">
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
            </div>
          {message && <p>{message}</p>}

          </Form>
        </Formik>
      </div>
    </div>
  </div>
  )
}

export default ForgotPassword