import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const shorten = createAsyncThunk(
  "url/shorten",
  async (url, thunkApi) => {
    const res = await fetch("/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url })
    });

    const data = await res.json();
    if (!res.ok) thunkApi.rejectWithValue(data.error);
    return data.shortUrl;
  }
);
