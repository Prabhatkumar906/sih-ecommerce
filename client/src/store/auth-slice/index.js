


// src/store/auth-slice/index.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial State
const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

// Async Thunks

// Register User
export const registerUser = createAsyncThunk(
  "auth/register",
  // async (formData, { rejectWithValue }) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/auth/register",
  //       formData,
  //       {
  //         withCredentials: true, // Include credentials
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     return rejectWithValue(
  //       error.response?.data?.message || "Registration failed."
  //     );
  //   }
  // }

  async (formData) => {
    const response = await axios.post("http://localhost:5000/api/auth/register",
      formData, {
      withCredentials: true,
    });

    return response.data;
  }
);

// Login User
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
        {
          withCredentials: true, // Include credentials
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed."
      );
    }
  },
  async (formData) => {
    const response = await axios.post("http://localhost:5000/api/auth/login",
      formData, {
      withCredentials: true,
    });

    return response.data;
  }

);

// Logout User
// export const logoutUser = createAsyncThunk(
//   "auth/logout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/logout",
//         {},
//         {
//           withCredentials: true,
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Logout failed."
//       );
//     }
//   }
// );

// Check Authentication
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  //   async (_, { rejectWithValue }) => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/auth/check-auth",
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Cache-Control":
  //               "no-store, no-cache, must-revalidate, proxy-revalidate",
  //           },
  //         }
  //       );
  //       return response.data;
  //     } catch (error) {
  //       return rejectWithValue(
  //         error.response?.data?.message || "Authentication check failed."
  //       );
  //     }
  //   }
  async () => {
    const response = await axios.get("http://localhost:5000/api/auth/check-auth",
      {
        withCredentials: true,
        headers: {
          'Cache-Control': 'no-store,no-cache,must-revalidate,proxy-revalidate',
          Expires: '0'
        }
      }
  );

return response.data;
}
);

// Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set User Reducer
    setUser: () => {
      // state.user = action.payload.user;
      // state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      //     // Register User Cases
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Login User Cases
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success ? action.payload.user : null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

    //     // Logout User Cases
    // .addCase(logoutUser.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(logoutUser.fulfilled, (state) => {
    //   state.isLoading = false;
    //   state.user = null;
    //   state.isAuthenticated = false;
    // })
    // .addCase(logoutUser.rejected, (state) => {
    //   state.isLoading = false;
    // Optionally, handle error messages
    // })

        // Check Authentication Cases
        .addCase(checkAuth.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(checkAuth.fulfilled, (state, action) => {
          state.isLoading = false;
          state.user = action.payload.success ? action.payload.user : null;
          state.isAuthenticated = action.payload.success;
        })
        .addCase(checkAuth.rejected, (state) => {
          state.isLoading = false;
          state.user = null;
          state.isAuthenticated = false;
    });
  },
});

// Export Actions
export const { setUser } = authSlice.actions;

// Export Reducer
export default authSlice.reducer;


