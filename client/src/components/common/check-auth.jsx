

// // import {  Navigate, useLocation } from "react-router-dom";

// // function CheckAuth({ isAuthenticated, user, children }) {
// //   const location = useLocation();


// //   if (
// //     !isAuthenticated &&
// //     !(
// //       location.pathname.includes("/login") ||
// //       location.pathname.includes("/register")
// //     )
// //   ) {
// //     return <Navigate to="/auth/login" />;
// //   }

// //   if (
// //     isAuthenticated &&
// //     (location.pathname.includes("/login") ||
// //       location.pathname.includes("/register"))
// //   ) {
// //     if (user?.role === "admin") {
// //       return <Navigate to="/admin/dashboard" />;
// //     } else {
// //       return <Navigate to="/shop/home" />;
// //     }
// //   }

// //   if (
// //     isAuthenticated &&
// //     user?.role !== "admin" &&
// //     location.pathname.includes("admin")
// //   ) {
// //     return <Navigate to="/unauth-page" />;
// //   }

// //   if (
// //     isAuthenticated &&
// //     user?.role === "admin" &&
// //     location.pathname.includes("shop")
// //   ) {
// //     return <Navigate to="/admin/dashboard" />;
// //   }

// //   return <>{children}</>;
// // }

// // export default CheckAuth;







// // import React from 'react';
// import PropTypes from 'prop-types';
// import { Navigate, useLocation } from "react-router-dom";

// /**
//  * CheckAuth Component
//  * 
//  * This component checks the authentication status and user role
//  * to determine whether to allow access to certain routes or redirect
//  * the user to appropriate pages.
//  * 
//  * Props:
//  * - isAuthenticated (bool): Indicates if the user is authenticated.
//  * - user (object): Contains user information, including role.
//  * - children (node): The child components to render if access is granted.
//  */
// function CheckAuth({ isAuthenticated, user, children }) {
//   const location = useLocation();

//   // Redirect unauthenticated users to login unless they're already on login or register pages
//   if (
//     !isAuthenticated &&
//     !(
//       location.pathname.includes("/login") ||
//       location.pathname.includes("/register")
//     )
//   ) {
//     return <Navigate to="/auth/login" replace />;
//   }

//   // Redirect authenticated users away from login or register pages based on their role
//   if (
//     isAuthenticated &&
//     (location.pathname.includes("/login") ||
//       location.pathname.includes("/register"))
//   ) {
//     if (user?.role === "admin") {
//       return <Navigate to="/admin/dashboard" replace />;
//     } else {
//       return <Navigate to="/shop/home" replace />;
//     }
//   }

//   // Prevent non-admin users from accessing admin routes
//   if (
//     isAuthenticated &&
//     user?.role !== "admin" &&
//     location.pathname.includes("/admin")
//   ) {
//     return <Navigate to="/unauth-page" replace />;
//   }

//   // Prevent admin users from accessing shop routes
//   if (
//     isAuthenticated &&
//     user?.role === "admin" &&
//     location.pathname.includes("/shop")
//   ) {
//     return <Navigate to="/admin/dashboard" replace />;
//   }

//   // If none of the above conditions are met, render the child components
//   return <>{children}</>;
// }

// // Define PropTypes for CheckAuth
// CheckAuth.propTypes = {
//   isAuthenticated: PropTypes.bool.isRequired,
//   user: PropTypes.shape({
//     role: PropTypes.oneOf(['admin', 'user']).isRequired,
//     // Add other user properties here if needed
//   }),
//   children: PropTypes.node.isRequired,
// };

// // Define Default Props (if necessary)
// CheckAuth.defaultProps = {
//   user: null, // If user can be null or undefined when not authenticated
// };

// export default CheckAuth;







// CheckAuth.jsx

// import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";

/**
 * CheckAuth Component
 * 
 * This component checks the authentication status and user role
 * to determine whether to allow access to certain routes or redirect
 * the user to appropriate pages.
 * 
 * Props:
 * - isAuthenticated (bool): Indicates if the user is authenticated.
 * - user (object): Contains user information, including role.
 * - children (node): The child components to render if access is granted.
 */
function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // Paths that should be accessible without authentication
  const publicPaths = ["/auth/login", "/auth/register"];

  const currentPath = location.pathname;

  // Function to check if the current path is public
  const isPublicPath = publicPaths.some(path => currentPath.startsWith(path));

  // Redirect unauthenticated users to login unless they're on a public path
  if (!isAuthenticated && !isPublicPath) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect authenticated users away from login or register pages based on their role
  if (isAuthenticated && isPublicPath) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/shop/home" replace />;
    }
  }

  // Prevent non-admin users from accessing admin routes
  if (isAuthenticated && user?.role !== "admin" && currentPath.startsWith("/admin")) {
    return <Navigate to="/unauth-page" replace />;
  }

  // Prevent admin users from accessing shop routes
  if (isAuthenticated && user?.role === "admin" && currentPath.startsWith("/shop")) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If none of the above conditions are met, render the child components
  return <>{children}</>;
}

// Define PropTypes for CheckAuth
CheckAuth.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    role: PropTypes.oneOf(['admin', 'user']).isRequired,
    // Add other user properties here if needed
  }),
  children: PropTypes.node.isRequired,
};

// Define Default Props (if necessary)
// CheckAuth.defaultProps = {
//   user: null, // If user can be null or undefined when not authenticated
// };

export default CheckAuth;
