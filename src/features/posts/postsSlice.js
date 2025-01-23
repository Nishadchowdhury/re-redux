import { getPosts } from "./postsAPI";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    isLoading: false,
    isError: false,
    error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const posts = await getPosts();
    return posts;
});

const postsSlice = createSlice({
    name: "posts",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.isLoading = true;
            state.isError = false;
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload; // payload is the result of the async action.
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error?.message || 'an error happened!'; // error is the error object from the async action.
            })
    }
});

export default postsSlice.reducer;
