import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createComments, createOrders, createOrderStatus, createProofStatus, createUploadTypes, getComments, getOrderById, getOrders, getOrderStatus, getProofStatus, getUploadTypes } from "../services/auth";
const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  errors: [],
  orders:[],
  comments:[],
  ordersDetail:null,
  orderStatus:[],
  proofStatus:[],
  uploadTypes:[]
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
export const get_orders = createAsyncThunk(
  "get_orders",
  async (thunkAPI) => {
    try {
      return await getOrders();
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user
export const create_order = createAsyncThunk(
  "create_order",
  async (data, thunkAPI) => {
    try {
      return await createOrders(data);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const orderSlice = createSlice({
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_orders.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(get_orders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.orders = action.payload.data;
      })
      .addCase(get_orders.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(create_order.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(create_order.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.orders.unshift(action.payload.data);
        toast.success("Order created successfully")
      })
      .addCase(create_order.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action?.payload?action.payload:"Getting an error")
      })
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
