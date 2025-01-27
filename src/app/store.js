import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countersReducer from "../features/counters/countersSlice";
import postsReducer from "../features/posts/postsSlice";
import dynamicCounterReducer from "../features/dynamicCounter/dynamicCounterSlice";
import theMiddleware from "./middlewares/logThings";
import logger from 'redux-logger'
import { apiSlice } from "../features/api/apiSlice";

const rootReducer = combineReducers(
    {
        counters: countersReducer,
        dynamicCounter: dynamicCounterReducer,
        posts: postsReducer,
        api: apiSlice.reducer
    }
);



const store = configureStore({ // we'll construct the store as we created the slice before.
    //counters reducers
    reducer: rootReducer,


    // video app reducers.
    [apiSlice.reducerPath]: apiSlice.reducer,




    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware), // we're adding our middleware to the default middleware.
},

);


export default store;
export { rootReducer }