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
import AddLibrarianForm from "./components/Admin/AddLibrarianForm";
import { loginLoader, verifyLoader } from "./loaders/verifyLoader";
import Librarian from "./pages/Admin/Librarian";
import AllBooks from "./pages/User/AllBooks";
import BookMainpage from "./pages/User/BookMainpage";
import Checkout from "./pages/User/Checkout";
import Analysis from "./components/Admin/Analysis/Analysis";
import History from "./pages/User/History";
import LibrarianAllBooks from "./pages/Librarian/LibrarianAllBooks";
import Profile from "./pages/Profile";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      loader: loginLoader,
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
        {
          path: "books",
          element: <AllBooks />,
          errorElement: <ErrorPage />,
        },
        {
          path: "books/:name",
          element: <BookMainpage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "history",
          element: <History />,
          errorElement: <ErrorPage />,
        },
        {
          path: "profile",
          element: <Profile />,
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
          path: "librarian",
          element: <Librarian />,
          errorElement: <ErrorPage />,
        },
        {
          path: "analysis",
          element: <Analysis />,
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
        {
          path: "allbooks",
          element: <LibrarianAllBooks />,
          errorElement: <ErrorPage />,
        },
      ],
    },
    {
      path: "/test",
      element: <AddBooks />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/payment_success",
      element: <Checkout />,
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
