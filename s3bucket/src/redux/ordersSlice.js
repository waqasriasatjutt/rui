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
export const create_order_status = createAsyncThunk(
  "create_order_status",
  async (data, thunkAPI) => {
    try {
      return await createOrderStatus(data);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const get_order_status = createAsyncThunk(
  "get_order_status",
  async (data, thunkAPI) => {
    try {
      return await getOrderStatus(data);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const create_proof_status = createAsyncThunk(
  "create_proof_status",
  async (data, thunkAPI) => {
    try {
      return await createProofStatus(data);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const get_proof_status = createAsyncThunk(
  "get_proof_status",
  async (data, thunkAPI) => {
    try {
      return await getProofStatus(data);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const get_upload_types = createAsyncThunk(
  "get_upload_types",
  async (data, thunkAPI) => {
    try {
      return await getUploadTypes(data);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const create_upload_types = createAsyncThunk(
  "create_upload_types",
  async (data, thunkAPI) => {
    try {
      return await createUploadTypes(data);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user
export const get_comments = createAsyncThunk(
  "get_comments",
  async (id, thunkAPI) => {
    try {
      return await getComments(id);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user
export const get_order_detail = createAsyncThunk(
  "get_order_detail",
  async (id, thunkAPI) => {
    try {
      return await getOrderById(id);
    } catch (error) {
      const message = getErrorMessage(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Login user
export const create_comments = createAsyncThunk(
    "create_comments",
    async (id, thunkAPI) => {
      try {
        return await createComments(id);
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
      .addCase(get_comments.pending, (state) => {
        state.isLoading = true;
        state.message = "";
        state.comments=[]
      })
      .addCase(get_comments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.comments = action.payload.data;
      })
      .addCase(get_comments.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.comments=[]
      })
      .addCase(create_comments.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(create_comments.fulfilled, (state, action) => {
        console.log("🚀 ~ file: ordersSlice.js:137 ~ .addCase ~ action:", action)
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.comments?.comments.unshift(action.payload.data);
        
      })
      .addCase(create_comments.rejected, (state,action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        
      })
      .addCase(get_order_detail.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(get_order_detail.fulfilled, (state, action) => {
        console.log("🚀 ~ file: ordersSlice.js:137 ~ .addCase ~ action:", action)
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.ordersDetail=action.payload.data;
        
      })
      .addCase(get_order_detail.rejected, (state,action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        
      })
      .addCase(get_order_status.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(get_order_status.fulfilled, (state, action) => {
        console.log("🚀 ~ file: ordersSlice.js:87 ~ .addCase ~ action:", action)
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.orderStatus = action.payload.data;
      })
      .addCase(get_order_status.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(create_order_status.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(create_order_status.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.orderStatus.push(action.payload.data);
        toast.success("Order Status created successfully")
      })
      .addCase(create_order_status.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action?.payload?action.payload:"Getting an error")
      })
      .addCase(get_proof_status.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(get_proof_status.fulfilled, (state, action) => {
        console.log("🚀 ~ file: ordersSlice.js:87 ~ .addCase ~ action:", action)
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.proofStatus = action.payload.data;
      })
      .addCase(get_proof_status.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(create_proof_status.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(create_proof_status.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.proofStatus.push(action.payload.data);
        toast.success("Proof Status created successfully")
      })
      .addCase(create_proof_status.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action?.payload?action.payload:"Getting an error")
      })
      
      .addCase(get_upload_types.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(get_upload_types.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.uploadTypes = action.payload.data;
      })
      .addCase(get_upload_types.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
      })
      .addCase(create_upload_types.pending, (state) => {
        state.isLoading = true;
        state.message = "";
      })
      .addCase(create_upload_types.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "";
        state.uploadTypes.push(action.payload.data);
        toast.success("Proof Status created successfully")
      })
      .addCase(create_upload_types.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        toast.error(action?.payload?action.payload:"Getting an error")
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
