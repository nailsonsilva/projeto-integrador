import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ChakraProvider, createStandaloneToast } from "@chakra-ui/react";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/shared/ProtectedRoute";
import Compras from "./pages/compras/Compras";
import DashboardFornecedor from "./pages/dashboardFornecedor/DashboardFornecedor";
import Produtos from "./pages/produtos/Produtos";

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
      </ProtectedRoute>
    ),
  },
  {
    path: "/compras",
    element: (
      <ProtectedRoute>
        <Compras />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard-fornecedor",
    element: (
      <ProtectedRoute>
        <DashboardFornecedor />
      </ProtectedRoute>
    ),
  },
  {
    path: "/produtos",
    element: (
      <ProtectedRoute>
        <Produtos />
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
