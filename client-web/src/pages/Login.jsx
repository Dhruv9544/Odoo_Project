import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { fetchPost } from "../apis/fetch";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function Login() {
  const initialValues = {
    email: "",
    password: "",
    role: "",
  };

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: async (values, action) => {
      const res = await fetchPost("auth/login", null, JSON.stringify(values));
      if (res.status === "success") {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.user.role);
        localStorage.setItem("id", res.user._id);
        navigate("/");
        action.resetForm();
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center  justify-center bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8  w-[40rem]">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
          Sign In to Library Portal
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-lg py-3 px-4 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email && (
              <small className="text-red-600">{formik.errors.email}</small>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Role
            </label>
            <Dropdown
              id="role"
              name="role"
              options={[
                { label: "User", value: "user" },
                { label: "Librarian", value: "Librarian" },
                { label: "Admin", value: "admin" },
              ]}
              placeholder="Select a role"
              className={`w-full rounded-lg py-2 px-4 border ${
                formik.touched.role && formik.errors.role
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-700"
              } focus:outline-none focus:border-blue-500 dark:focus:border-blue-500`}
              value={formik.values.role}
              onChange={(e) => formik.setFieldValue("role", e.value)}
              onBlur={formik.handleBlur}
            />
            {formik.errors.role && formik.touched.role && (
              <small className="text-red-600">{formik.errors.role}</small>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-lg py-3 px-4 border border-gray-300 dark:border-gray-700 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password && (
              <small className="text-red-600">{formik.errors.password}</small>
            )}
          </div>

          <div className="mb-6">
            <Button
              type="submit"
              className=" mx-auto flex items-center justify-center bg-blue-500 border-blue-500 text-white font-semibold py-3 px-4 rounded-lg"
            >
              Sign In
            </Button>
          </div>

          <div className="text-center">
            <Link to="/register" className="text-blue-500 hover:text-blue-700">
              Don't have an account? Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
