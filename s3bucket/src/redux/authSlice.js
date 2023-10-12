import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addUsers, login as doLogin } from "../services/auth";
let user = localStorage.getItem("user");
user = user ? JSON.parse(user) : null;
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  errors: [],
};
const getErrorMessage = (error) => {
  return (
    error?.response?.data?.error ||
    (error?.response?.data?.debugInfo && [error?.response?.data?.debugInfo]) ||
    error?.response?.data?.message ||
    error?.response?.data ||
    error.toString()
  );
};
// Login user
export const login = createAsyncThunk(
  "auth/login",
  async ({ userData, header }, thunkAPI) => {
    try {
      return await doLogin(userData, header);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user
export const add_user = createAsyncThunk(
  "add_user",
  async ({ userData }, thunkAPI) => {
    try {
      return await addUsers(userData);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.errors = [];
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      // window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("🚀 ~ file: authSlice.js:69 ~ .addCase ~ action:", action);
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.user = action.payload.data;
        if (action.payload.status === 200) {
          localStorage.setItem("user", JSON.stringify(action.payload?.data));
          // localStorage.setItem("expireWarning",true);
        }
        // window.location.reload();
      })
      .addCase(login.rejected, (state, action) => {
        console.log("🚀 ~ file: authSlice.js:81 ~ .addCase ~ action:", action);
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          !Array.isArray(action.payload) && action.payload === "Unauthorized"
            ? "Invalid username or password "
            : action.payload
            ? action.payload
            : "Unknown Error";
        state.user = null;
        // toast.error(action.payload==="Unauthorized"?"Invalid username or password ":"Unknown Error w")
        state.errors = Array.isArray(action.payload) && action.payload;
      })
      .addCase(add_user.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(add_user.fulfilled, (state, action) => {
        console.log("🚀 ~ file: authSlice.js:101 ~ .addCase ~ action:", action);
        state.isLoading = false;
        state.isSuccess = true;
        toast.success(action.payload.data.message);
        state.user = null;
      })
      .addCase(add_user.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          !Array.isArray(action.payload) && action.payload === "Unauthorized"
            ? "Invalid username or password "
            : action.payload
            ? action.payload
            : "Unknown Error";
        state.user = null;
        // toast.error(action.payload==="Unauthorized"?"Invalid username or password ":"Unknown Error w")
        state.errors = Array.isArray(action.payload) && action.payload;
      });
  },
});

export const { reset, logoutUser } = authSlice.actions;
export default authSlice.reducer;
