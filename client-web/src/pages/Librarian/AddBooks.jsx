import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddBooks = () => {
  const navigate = useNavigate();

  const initialValues = {
    isbn: "",
    title: "",
    author: "",
    publisher: "",
    year: "",
    genre: "",
    quantity: "",
    available: false,
    image: null,
    price: "",
  };

  const validationSchema = Yup.object({
    isbn: Yup.string().required("ISBN is required"),
    title: Yup.string().required("Title is required"),
    author: Yup.string().required("Author is required"),
    publisher: Yup.string().required("Publisher is required"),
    year: Yup.number()
      .required("Year is required")
      .min(1000, "Invalid year")
      .max(new Date().getFullYear(), "Invalid year"),
    genre: Yup.string().required("Genre is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
    available: Yup.boolean().required("Availability is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileSize",
        "File too large",
        (value) => !value || (value && value.size <= 5242880)
      )
      .test(
        "fileFormat",
        "Unsupported format",
        (value) =>
          !value ||
          (value &&
            ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
      ),
    price: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be at least 1"),
  });

  const onSubmit = async (values) => {
    console.log("Form data", values);

    const formData = new FormData();
    formData.append("image", values.image);
    formData.append("ISBN", values.name);
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("genre", values.genre);
    formData.append("quantity", values.quantity);
    formData.append("publisher", values.publisher);
    formData.append("year", values.year);
    formData.append("available", values.available);
    console.log(values);
    console.log("FormData contents:");

    const res = await fetch("http://localhost:9999/library/addBook", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      method: "POST",
      body: formData,
    });
    if (res.status == 201) {
      Swal.fire({
        title: "Success",
        text: "Item processed successfully",
        icon: "success",
      }).then(() => {
        navigate("/user");
      });
    }
    console.log(res);
  };

  const handleImageChange = (event, setFieldValue) => {
    setFieldValue("image", event.currentTarget.files[0]);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Book Form</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="isbn"
                className="block text-sm font-medium text-gray-700"
              >
                ISBN
              </label>
              <Field
                type="text"
                id="isbn"
                name="isbn"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="isbn"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700"
              >
                Author
              </label>
              <Field
                type="text"
                id="author"
                name="author"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="publisher"
                className="block text-sm font-medium text-gray-700"
              >
                Publisher
              </label>
              <Field
                type="text"
                id="publisher"
                name="publisher"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="publisher"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-700"
              >
                Year
              </label>
              <Field
                type="number"
                id="year"
                name="year"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="year"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-700"
              >
                Genre
              </label>
              <Field
                type="text"
                id="genre"
                name="genre"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="genre"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700"
              >
                Quantity
              </label>
              <Field
                type="number"
                id="quantity"
                name="quantity"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex items-center">
              <Field
                type="checkbox"
                id="available"
                name="available"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="available"
                className="ml-2 block text-sm font-medium text-gray-700"
              >
                Available
              </label>
              <ErrorMessage
                name="available"
                component="div"
                className="text-red-500 text-sm ml-4"
              />
            </div>

            <div>
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                onChange={(event) => handleImageChange(event, setFieldValue)}
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                Price
              </label>
              <Field
                type="number"
                id="price"
                name="price"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage
                name="price"
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
        )}
      </Formik>
    </div>
  );
};

export default AddBooks;
