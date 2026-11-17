import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface UrlState {
  shortUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UrlState = {
  shortUrl: null,
  loading: false,
  error: null
};

export const shorten = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("url/shorten", async (url, thunkApi) => {
  const res = await fetch("/shorten", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const data = await res.json();
  if (!res.ok) thunkApi.rejectWithValue(data.error);
  return data.shortUrl;
});

const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(shorten.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shorten.fulfilled, (state, action) => {
        state.loading = false;
        state.shortUrl = action.payload;
      })
      .addCase(shorten.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong.";
      });
  }
});

export default urlSlice.reducer;
