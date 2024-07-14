import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Header as AdminHeader } from "./components/Admin/Header";
import { Header } from "./components/User/Header";
import ErrorPage from "./pages/ErrorPage";
import { Dashboard } from "./pages/User/Dashboard";
import { Dashboard as AdminDashboard } from "./pages/Admin/Dashboard";
import AddBooks from "./pages/Librarian/AddBooks";
import { LibrarianHeader } from "./components/Librarian/LibrarianHeader";
import AddLibrarianForm from "./pages/Admin/AddLibrarianForm";
const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/user",
      element: <Header />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Dashboard />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminHeader />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <AdminDashboard />,
          errorElement: <ErrorPage />,
        },
        {
          path: "addLibrarian",
          element: <AddLibrarianForm />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/librarian",
      element: <LibrarianHeader />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "addbooks",
          element: <AddBooks />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/test",
      element: <AddBooks />,
      errorElement: <ErrorPage />,
    },
  ]);

  return (
    <PrimeReactProvider>
      <RouterProvider router={router}></RouterProvider>
    </PrimeReactProvider>
  );
};

export default App;
