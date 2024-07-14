import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Chatpage from "./components/Chatpage.jsx";
import Inbox from "./components/Inbox.jsx";
import InboxHome from "./components/InboxHome.jsx";
import DataProvider from "./providers/DataProvider.jsx";

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
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
