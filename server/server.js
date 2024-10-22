const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRouter=require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes")


// mongoose
    mongoose.connect(' ')
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.log(error));

const app = express();
const PORT = process.env.PORT || 5000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cache-Control",
            "Expires",
            "Pragma",
        ],
        credentials : true
    })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/admin/products",adminProductsRouter);

app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));


// server.js
// const express = require('express');
// const cors = require('cors');
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// // const session = require('express-session'); // If using sessions
// const authRouter = require('./routes/auth/auth-routes'); // Adjust the path as needed


// mongoose
//     .connect('mongodb+srv://algodemon106:Decode..@cluster0.ewjul.mongodb.net/')
//     .then(() => console.log("MongoDB connected"))
//     .catch((error) => console.log(error));

// const app = express();

// // Middleware to parse JSON and URL-encoded data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // CORS Configuration
// const corsOptions = {
//   origin: 'http://localhost:5173', // Frontend origin
//   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
// };

// // Apply CORS Middleware
// app.use(cors(corsOptions));

// // Optional: Configure session middleware if using sessions
// app.use(session({
//   secret: 'your-secret-key', // Replace with your secret
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // Set to true if using HTTPS
//     httpOnly: true,
//     sameSite: 'none', // Required for cross-origin with credentials
//   },
// }));

// // Routes
// app.use('/api/auth', authRoutes);

// // Handle Preflight Requests Globally (Optional)
// app.options('*', cors(corsOptions));

// // Start the Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
