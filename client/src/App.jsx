
// import React from 'react';
// import { BrowserRouter as Routes, Route } from 'react-router-dom';

import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/layout";

import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingCheckout from "./pages/shopping-view/checkout";
import ShoppingAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton"


function App() {
  const{user,isAuthenticated,isLoading}=useSelector(state=>state.auth)
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch]);

  if(isLoading) return <Skeleton className="w-[grey] bg-black h-[600px]" />


  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* <Router> */}
      <Routes>
        {/* Auth Routes: Accessible only when NOT authenticated */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} /> 
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin Routes: Accessible only to authenticated admins */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        {/* Shopping Routes: Accessible only to authenticated users */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        {/* Unauthenticated Access Page */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Fallback Route for 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </Router> */}
    </div>
  );
}

export default App;
