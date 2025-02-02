import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../../services/auth.services";

export const loginThunk = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);
