import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import BillingPage from "../Pages/BillingPage/BillingPage";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/billing",
        element: (
          <PrivateRoute>
            <BillingPage></BillingPage>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
