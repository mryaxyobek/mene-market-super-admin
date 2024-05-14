import React from "react";

import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// redux
import { useSelector } from "react-redux";

// components
import ToastifyContainer from "./components/ToastifyContainer";

// layouts
import MainRoot from "./layouts/MainRoot";
import ProductLayout from "./layouts/ProductLayout";

// pages
import Home from "./pages/Home";
import News from "./pages/News";
import Login from "./pages/Login";
import Users from "./pages/Users";
import AddNews from "./pages/AddNews";
import Reviews from "./pages/Reviews";
import Newness from "./pages/Newness";
import Products from "./pages/Products";
import ProductAdd from "./pages/ProductAdd";
import EditProduct from "./pages/EditProduct";
import ProductRequests from "./pages/ProductRequests";
import FindProductById from "./pages/FindProductById";

const App = () => {
  const { authData } = useSelector((store) => store.authData);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <>
            {authData.isLoggedIn ? <MainRoot /> : <Login />}
            {/* notification */}
            <ToastifyContainer />
          </>
        }
      >
        <Route index element={<Home />} />

        {/* product */}
        <Route path="product" element={<ProductLayout />}>
          <Route index element={<Products />} />

          <Route path="add" element={<ProductAdd />} />

          <Route path="edit/:productId" element={<EditProduct />} />

          <Route path="find-by-id/:productId?" element={<FindProductById />} />
        </Route>

        {/* users */}
        <Route path="users/:usersPageIndex?" element={<Users />} />

        {/* comments */}
        <Route path="reviews/:reviewsPageIndex?" element={<Reviews />} />

        {/* product requests */}
        <Route
          path="product-requests/:productRequestsPageIndex?"
          element={<ProductRequests />}
        />
  
        {/* news */}
        <Route path="news" element={<Outlet />}>
          <Route path="add" element={<AddNews />} />
          <Route index path=":newsPageIndex?" element={<News />} />
          <Route index path=":newness/:newnessId" element={<Newness />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
