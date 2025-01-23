import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countersReducer from "../features/counters/countersSlice";
import postsReducer from "../features/posts/postsSlice";
import theMiddleware from "./middlewares/logThings";

const rootReducer = combineReducers(
    {
        posts: postsReducer,
        counters: countersReducer
    }
);



const store = configureStore({ // we'll construct the store as we created the slice before.
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(theMiddleware), // we're adding our middleware to the default middleware.


},);


export default store;
export { rootReducer }