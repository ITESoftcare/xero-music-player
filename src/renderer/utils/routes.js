import React from "react";
import Layout from "../components/Layout"
import { Navigate } from "react-router-dom";
import Test from "../components/Test";
import NotFound from "../views/NotFound";
import Library from "../views/Library";
import Search from "../views/Search";


const routes = [
  {
    path: "/main_window",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Library />
      },
      {
        path: "search",
        element: <Search />
      },
    ]
  },
  { path: "*", element: <Navigate to="main_window" /> },
//   { path: "*", element: <NotFound /> }
];

export default routes/* .filter((route) => route.enabled) */;