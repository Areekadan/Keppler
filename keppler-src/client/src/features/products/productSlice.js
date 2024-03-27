import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productAPI from "./productAPI";

const initialState = {
  products: [],
  product: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const getProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productAPI.getProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOneProduct = createAsyncThunk(
  "products/getOne",
  async ({ slug }, thunkAPI) => {
    try {
      return await productAPI.getOneProduct(slug);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const reviewProduct = createAsyncThunk(
  "products/reviewProduct",
  async ({ id, reviewData }, thunkAPI) => {
    try {
      const response = await productAPI.reviewProduct(id, reviewData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSellerProducts = createAsyncThunk(
  "products/getSellers",
  async (_, thunkAPI) => {
    try {
      return await productAPI.getSellerProducts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ slug, productData }, thunkAPI) => {
    try {
      const response = await productAPI.updateProduct(slug, productData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const uploadProductImages = createAsyncThunk(
  "products/uploadImages",
  async ({ productData }, thunkAPI) => {
    try {
      const response = await productAPI.uploadProductImages(productData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "product/create",
  async (productData, thunkAPI) => {
    try {
      const response = await productAPI.createProduct(productData);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (slug, thunkAPI) => {
    try {
      await productAPI.deleteProduct(slug);
      return;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.results;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getOneProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(getOneProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getOneProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(reviewProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(reviewProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.profile = action.payload;
      })
      .addCase(reviewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSellerProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSellerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.results;
      })
      .addCase(getSellerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(uploadProductImages.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(uploadProductImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(uploadProductImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
