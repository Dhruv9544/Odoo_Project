import React from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import * as Yup from "yup";
import { fetchPost } from "../apis/fetch";

function Register() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            contact: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string().required("Password is required"),
            contact: Yup.string().required("Contact number is required"),
        }),
        onSubmit: async (values, { resetForm }) => {
            const data = {
                username: values.username,
                email: values.email,
                password: values.password,
                contact: values.contact,
                role: "user",
            };
            const res = await fetchPost(
                "auth/signup",
                null,
                JSON.stringify(data)
            );
            if (res.status === "success") {
                localStorage.setItem("token", res.token);
                localStorage.setItem("role", res.user.role);
                navigate("/");
                resetForm();
            }
        },
    });

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8  w-[40%]">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Register to Library Portal
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Username
                        </label>
                        <InputText
                            id="username"
                            name="username"
                            type="text"
                            placeholder="Enter your username"
                            className={`w-full rounded-lg py-3 px-4 border ${
                                formik.touched.username &&
                                formik.errors.username
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-700"
                            } focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.username && formik.errors.username && (
                            <small className="text-red-600">
                                {formik.errors.username}
                            </small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Email
                        </label>
                        <InputText
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Enter your email"
                            className={`w-full rounded-lg py-3 px-4 border ${
                                formik.touched.email && formik.errors.email
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-700"
                            } focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <small className="text-red-600">
                                {formik.errors.email}
                            </small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <InputText
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className={`w-full rounded-lg py-3 px-4 border ${
                                formik.touched.password &&
                                formik.errors.password
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-700"
                            } focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <small className="text-red-600">
                                {formik.errors.password}
                            </small>
                        )}
                    </div>

                    <div className="mb-4">
                        <label
                            htmlFor="contact"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Contact Number
                        </label>
                        <InputText
                            id="contact"
                            name="contact"
                            type="text"
                            placeholder="Enter your contact number"
                            className={`w-full rounded-lg py-3 px-4 border ${
                                formik.touched.contact && formik.errors.contact
                                    ? "border-red-500"
                                    : "border-gray-300 dark:border-gray-700"
                            } focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.contact && formik.errors.contact && (
                            <small className="text-red-600">
                                {formik.errors.contact}
                            </small>
                        )}
                    </div>

                    <div className="mb-6">
                        <button
                            className="flex items-center justify-center mx-auto bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>

                    <div className="text-center">
                        Already have an account?
                        <Link
                            to="/"
                            className="ml-1 text-blue-500 border-blue-500 hover:text-blue-700"
                        >
                            Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
