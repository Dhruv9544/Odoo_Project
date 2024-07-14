import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import { PrimeReactProvider } from "primereact/api";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/register",
            element: <Register />,
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
