import { combineReducers, configureStore } from "@reduxjs/toolkit";
import countersReducer from "../features/counters/countersSlice";
import postsReducer from "../features/posts/postsSlice";
import dynamicCounterReducer from "../features/dynamicCounter/dynamicCounterSlice";
import theMiddleware from "./middlewares/logThings";
import logger from 'redux-logger'

const rootReducer = combineReducers(
    {
        counters: countersReducer,
        dynamicCounter: dynamicCounterReducer,
        posts: postsReducer,
    }
);



const store = configureStore({ // we'll construct the store as we created the slice before.
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // we're adding our middleware to the default middleware.
},

);


export default store;
export { rootReducer }