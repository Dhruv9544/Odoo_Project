import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchPost } from "../../apis/fetch";
import { useNavigate } from "react-router-dom";

const AddLibrarianForm = ({ getlibrary, visible }) => {
    const navigate = useNavigate();
    const initialValues = {
        username: "",
        role: "",
        email: "",
        contact: "",
    };

    const validationSchema = Yup.object({
        username: Yup.string().required("Username is required"),
        library: Yup.string().required("Library Name is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        contact: Yup.string()
            .matches(/^[0-9]{10}$/, "Contact must be a 10-digit number")
            .required("Contact is required"),
    });

    const onSubmit = async (values, { resetForm }) => {
        console.log("Form data", values);
        const data = {
            username: values.username,
            email: values.email,
            password: values.password,
            libraryname: values.library,
            contact: values.contact,
        };
        const res = await fetchPost(
            "auth/addLibrarian",
            null,
            JSON.stringify(data)
        );
        if (res) {
            getlibrary();
            visible();
            resetForm();
        }
    };

    return (
        <div className="max-w-md w-full mx-auto mt-4">
            <h1 className="text-2xl font-bold mb-6">Add Librarian</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="space-y-4">
                    <div>
                        <label
                            htmlFor="username"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Username
                        </label>
                        <Field
                            type="text"
                            id="username"
                            name="username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                            name="username"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="library"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Library Name
                        </label>
                        <Field
                            type="text"
                            id="library"
                            name="library"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                            name="library"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="contact"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Contact
                        </label>
                        <Field
                            type="text"
                            id="contact"
                            name="contact"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                        <ErrorMessage
                            name="contact"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </Form>
            </Formik>
        </div>
    );
};

export default AddLibrarianForm;
