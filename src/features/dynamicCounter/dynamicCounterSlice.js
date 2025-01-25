import { createSlice } from "@reduxjs/toolkit";
import { increment } from "../counters/countersSlice";


const initialState = { id: 1, value: 10, }


const dynamicCreateSlice = createSlice({
    name: 'dynamicCounter',
    initialState,
    reducers: {
        dynamicIncrement: (state, action) => {
            state.value += (action.payload);
        },
        dynamicDecrement: (state, action) => {
            state.value -= action.payload;
        }
    }, // reason behind to call it reduces instead reducer because there will be many function as increment and decrement and many more; so each time this will work differently for different actions so it's reducer. 
    extraReducers: (builder) => {
        builder.addCase(increment, (state, action) => {
            state.value += (state.value)
        })
    }
})

// in createSlice we provided reducers but exporting reducer; because ultimately in redux store there is only a single reducer. It's looking like we're giving an object in createSlice instead that was options that are passing and eventually redux combines all the reducers and returns a central single reducer.
export default dynamicCreateSlice.reducer;

// and we need to export the action-creators as well.
export const { dynamicIncrement, dynamicDecrement } = dynamicCreateSlice.actions;