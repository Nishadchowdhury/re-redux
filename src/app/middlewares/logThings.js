import { rootReducer } from "../store";

const theMiddleware = (store) => (next) => (action) => { // redux provides the props this way that's why we received this way.
    // store:- store object to do store.dispatch and etc operations.
    // next:- after stopping the flow of redux we can restart of exit from here. If next():-continue.
    // action:- the action occurred by the user.

    // console.log(`action: ${JSON.stringify(action)}`); // what in the action.
    // console.log("before:" + JSON.stringify(store.getState())); // what in the store/now.

    // getting the next state before updating the store's state.
    /*
        if we wat to do this we need to call the reducer here and generate the next state to check
        fist create an array with the action to call reduce method and need to pass the rootReducer function and as there is no accumulator so it needs previous state to calculate the next state.
     */
    const nextState = [action].reduce(rootReducer, store.getState());
    // const nextState = [action].reduce(countersReducer, store.getState().counters); // work with single reducer
    console.log(JSON.stringify(nextState));

    return next(action);
}


export default theMiddleware;