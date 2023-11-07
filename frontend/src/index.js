import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";

const { ToastContainer } = createStandaloneToast();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
        <div>
           <h3>Situação do Estoque</h3>
           <Velocimetro/>
        </div>
       
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
