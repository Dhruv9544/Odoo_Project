import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Header as AdminHeader } from "./components/Admin/Header";
import { Header } from "./components/User/Header";
import ErrorPage from "./pages/ErrorPage";
import { Dashboard } from "./pages/User/Dashboard";
import { Dashboard as AdminDashboard } from "./pages/Admin/Dashboard";

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
      ],
    },
  ]);

  return (
    <PrimeReactProvider>
      <RouterProvider router={router}></RouterProvider>
    </PrimeReactProvider>
  );
};

export default App;
