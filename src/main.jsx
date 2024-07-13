import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatpage from "./components/Chatpage.jsx";
import Inbox from "./components/Inbox.jsx";
import InboxHome from "./components/InboxHome.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Chatpage />,
    children: [
      { path: "/", element: <InboxHome /> },
      {
        path: "chat/:chatCreator/:id",
        element: <Inbox />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
