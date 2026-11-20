import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = import.meta.env.VITE_API_URL;

interface UrlState {
  shortUrl: string | null;
  posting: boolean;
  postError: string | null;
}

const initialState: UrlState = {
  shortUrl: null,
  posting: false,
  postError: null
};

export const shorten = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("url/shorten", async (url, thunkApi) => {
  const res = await fetch(`${API_URL}/shorten`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const data = await res.json();
  if (!res.ok) return thunkApi.rejectWithValue(data.error);
  return data.shortUrl;
});

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shorten.pending, (state) => {
        state.posting = true;
        state.postError = null;
      })
      .addCase(shorten.fulfilled, (state, action) => {
        state.posting = false;
        state.shortUrl = action.payload;
      })
      .addCase(shorten.rejected, (state, action) => {
        state.posting = false;
        state.postError = action.payload ?? "Something went wrong.";
      });
  }
});

export default urlSlice.reducer;
