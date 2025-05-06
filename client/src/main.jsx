import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./routes/HomePage.jsx";
import LoginPage from "./routes/LoginPage.jsx";
import PostListPage from "./routes/PostListPage.jsx";
import RegisterPage from "./routes/RegisterPage.jsx";
import SinglePostPage from "./routes/SinglePostPage.jsx";
import WritePage from "./routes/WritePage.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./components/profile/Profile.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/posts",
        element: <PostListPage />,
      },
      {
        path: "/:slug",
        element: <SinglePostPage />,
      },
      {
        path: "/write",
        element: (
          <ProtectedRoute>
            <WritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
