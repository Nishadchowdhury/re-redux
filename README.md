### React Redux CC

------------------------------ Redux ------------------------------

1.  Redux is a flexible _State container_ for javascript apps that manages our apps's state separately.
2.  If we keep the state in the tree structure of react-dom-tree then we need to drill the props and and it will make a mess for large projects to continue and scale. So "redux" takes out the state and and place in a separate store that is accessible from anywhere of the project.
3.  components can subscribe and will be able to access the latest state of the store. There are noo hatchel about tree or other complexity about drillings.

    > > > > > > > > > > > > > > > Work flow :-

        1. We need to think as features wise. EG:- this application has only one feature that is counter.
        2. Fist create a folder as the feature's name; the root folder will be "features" / folderWithFeaturesName this folder will contain some redux oriented files.
        3. slice:- oif the entire website is a pizza and there will be many slices and each feature is a slice. So create a file name as "featureSlice.js" and inside the file need to import "createSlice" function to create a slice. then we'll provide some options and that will construct the reducer and actions for the slice
        4. Create "Store" in src/app/store.js instead it we'll construct the store as we created the slice before by passing options to the function "configureStore" and to create the store need to pass the reduces of the entire app only for initial setup. Assign the store in a variable and export-default it.
        5. Now the setup is done but the project is not aware about is because we didn't tell the project anyhow. So in the root of the project wrap the <App/> with the "Provider" from react-redux and pass the store as a props to the Provider.
        6. To retrieve from the store need to subscribe to the store with the hook calls "useSelector" and it provides all the states of the app in a selector-callback function (that selects the states) and need to destructure the particular state we need in that component as -(states)=> states.x-.
        7. Time to manipulate the states. As we wrote the mechanism to update the state in the reduces of the slice now we not need to rewrite anything instead we will call the generated action-function/action-creator provided by the slice-file with the parameters. It calls action-dispatch to do it assign the "useDispatch" hook to a variable and then call the like this -dispatch(action(parameters))- that's how the action-creator function will return the action (name is visible in devtools as "sliceName/reducerName") and then dispatch will call it.

    > > > > > > > > > > > > > > > Debugging experience :-

        1. to setup the redux-devtools:- Install the redux-devtools extension in the browser. with that we can visualize the entire app's states and mechanism.
        2. with that we can jump to any state from the history and play/pause to see the stapes as a video.

------------------------------ Store --------------------------

1.  How Redux store works?
    Ans:-
    Stores holds all the state and whenever a button get clicked a command="Action" is executed to store and store evolute it and returns the result and doing an operation as the Action calls "dispatch". Then redux will call a function="reducer" this will do the calculations and then return the result.

------------------------------ reducer --------------------------

1.  Reducer is a pre written function that be executed according to the dispatch.
2.  how it works as its named. It reduces things basically. It turns an array of data to a single output[number, object].
    1.  Reducer takes 2 parameters (state, action) based on the action the state will be modified and { return newState; }.
    2.  We won't call the returned state as updatedState because it creates a newState hence the upgradation process is immutable incase to preserve the history of all the changes. In redux we can mutate the state because it uses immer library UTHood its stays preInstalled in redux-toolkit we can see in "node_modules/@reduxjs/toolkit/package.json" .
    3.  whenever store gets the newState it sends the newState to the components that subscribed.

------------------------------ Redux toolkit / RTK ------------------------------

1.  To use redux easily we can use Redux Toolkit that is provided by Redux. Vanilla Redux I complex and needs a vast amount of boilerplate code. // npm i @reduxjs/toolkit react-redux.

------------------------------ Redux asynchronous action/redux-thunk ------------------------------

1.  Redux-store is sync always but there will be some action that must do asynchronous operations and to achieve that we need redux-thunk. we dispatch an action as always and that action needs to handle an api call that action going towards the store but just before reaching the store + reducer; a middleware/interceptor will catch it and perform the asynchronous operation after getting the response the middleware will let the action to reach the store after creating the action.
2.  steps:- create a slice > write initial state{data:[], isLoading: boolean, isError:boolean, error: string} > slice = createSlice({
    name: "uniqueName",
    initialState,
    extraReduces: (builder)=> {// this time we need to use extraReduces to handle the Promise cases. To handle the cases we need to create an asyncThunk to create:- -import createAsyncThunk from RTK and ("sliceName/fetchEx", async () => { ...do all the api calls here and return the result } )-

    builder.addCase(fetchPosts.pending, (state, action) => {
    state.isLoading = true;
    state.isError = false;
    }); // pending state is handled and nothing to do with action now.
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
    state.isLoading = false;
    state.posts = action.payload; // payload is the result of the async action.
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
    state.isLoading = false;
    state.isError = true;
    state.error = action.error?.message || 'an error happened!'; // error is the error object from the async action.
    })

    also we can chain the addCase method to a single builder.
    builder.addCase(...).addCase(...).addCase(...)

    } // for each case the action will be ran once.
    }) > export default the reducer > and no need to export any action instead we'll dispatch the exported "asyncThunk".

3.  Connect the slice with the store as before in the reducer: {
    ...,
    x: X-reducer,
    };
4.  retrieving the data:- using the thunk in react need a side effect to dispatch the thunk-action. Read the states as usual.

------------------------------ Redux middleware ------------------------------

1.  Redux usual flow is through an event an action be dispatched and reducer took the state and action to update the state. Middleware
    takes the dispatch and before sending to reducer it do some other stuffs. Button > dispatch > middleware-(any login written by a dev) > reducer. Middleware is a currying function()()()...

    // best practice to keep the middleware in redux > middlewares > name.js
    const theMiddleware = (store) => (next) => (action) => { // redux provides the props this way that's why we received this way.
    // store:- store object to do store.dispatch and etc operations.
    // next:- after stopping the flow of redux we can restart of exit from here. If next():-continue.
    // action:- the action occurred by the user.

    // console.log(`action: ${JSON.stringify(action)}`); // what in the action.
    // console.log("before:" + JSON.stringify(store.getState())); // what in the store/now.

    // getting the next state before updating the store's state.
    /_
    if we wat to do this we need to call the reducer here and generate the next state to check
    fist create an array with the action to call reduce method and need to pass the rootReducer function and as there is no accumulator so it needs previous state to calculate the next state.
    _/
    const nextState = [action].reduce(rootReducer, store.getState());
    // const nextState = [action].reduce(countersReducer, store.getState().counters); // work with single reducer
    console.log(JSON.stringify(nextState));

    return next(action);
    }

2.  make the middleware work:- pass as the middleware option after reducer in configureStore
    -(middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(theMiddleware))- with typescript it's needs a Tuple by redux.
    ans assign all the reducers into a var after constructing with "combineReducers" method provided by redux.

------------------------------ applying multiple middleware ------------------------------

1.  We used a custom middleware before but there are lots this as one will work to handle asynchronously operations and login
    function ect.
2.  multiple middleware:- middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, theMiddleware),

------------------------------ extraReducers ------------------------------

1.  When we need to run multiple reducers on a single dispatch:- pass the "extraReducers" option to createSlice in slice file.
    extraReducers: (builder) => {
    builder.addCase(increment, (state, action) => {
    state.value += (action.payload);
    }
    )
    }
    // import the action and the callback-reducer function will work when the imported action will be called in other slice and modify this slice's values.
2.  In vanilla-redux; When we dispatch an action all the reducers receives the action any work when action is matched. Hence every
    reducer getting every action so we could conditionally handle all the stuffs.

------------------------------ Project setUp ------------------------------

1.  In react app we can easily initialize redux but it takes a few minutes but we can also use template while creating the project is "npx create-react-app . --template redux" this is official redux template. It will create the project including all the stuffs of redux such as RTK,React-redux, few thunk-middleware, redux-dev-tools, etc. then we need to create the slices and use them.

------------------------------ RTK Query ------------------------------

1.  To retrieve the posts ues had to use redux-thunk and work with every state of promises in extraReducers and there
    was huge amount of code for jst single request> If we had to handle hundreds of APIs then it will be the ultimate mess.Beside these we had to dispatch those thunk-functions. It doesn't cache the response hence each rerender it retrieves data from the server.
2.  RTK Query:- It is a data-fetching and caching tool it stays pre-installed with RTK.
    and other things it handles:-
    1. Tracking the Loading, error, and success states.
    2. Avoids duplicate requests for same data.
    3. Optimistic updates to make the UI feels faster:- User will feel the data is loaded but RQ will controlled-refetch and update if any changes detected and user won't feel anything.
    4. Managing cache lifetimes as the user interacts with the UI:- Due to user's interact if any changes occurred in the server then we had to write many local-complex-state, redux-states, thunk-functions, reducers etc. But using RTKQ we not need to use anything like that and everything related to APIs will be easier and client and server will stay sync. ReactQuery is also awesome but this is masterpiece for developers of redux-ceo-system.
    5.

------------------------------ Applications of RTKQ with an app ------------------------------

1.  To work with RTKQ need to set-up a store then create the slices but in different way then usual and place then into
    features/api/apiSlice.js because the slices about RTKQ is be used for APIs only.
2.  Work flow:-
    1. We need to think the entire app's api related features in a single slice.
    2. Instead of { createSlice } from "@reduxjs/toolkit" now we'll use {createApi} from "@reduxjs/toolkit/query/react".
       it takes a few options { // read the apiSlice.js file }
    3. now it's the time to place the reducers into the store as -[apiSlice.reducerPath]: apiSlice.reducer- we didn't write any reducers, but RTkq created all with every state such as loading,error etc; we just wrote the endpoints.
    4. we also need some middleware to enable features as caching, revalidation etc but we shouldn't write those our won just need to pass in concat method -apiSlice.middleware-.
    5. ----our store is configured---- it's time ti write the endpoints. Then we'll connect the apis and use those with hooks.
    6. endpoints: (builder) => ({ apiName: }) :- retrieving data means query modifying data means mutation/change. At first we'll
       write a query to retrieve data. we'll build the query using "builder" object builder.query({...read apiSlice.js})
    7. call the the hook and destructure the outputs and render the contents logically with the states as we won't get the data initially because it works using useEffect under the hood hence won't get the data in initial render.
    8. we also can provide option white ingoing the custom hook by redux in components to manipulate the request behavior such as refetch -see in videos.jsx- .
3.  mutation -changing requests- :-
    Creating mutation:-
    1. other things would be same but this time the endpoint will be created with a builder.mutation and
       and receive options with the query will return an object not a string. this method is the most advance -see in apiSlice.js-
    2. this time the hook will rerun a tuple instead -[addThing, { data: video, ...theBasicOthers }]-
    3. After adding the video need to make invalid the videos array that is in the cache. To achieve this need to take an array of tags in "createApi" function; with "tagTypes" option. and we can use the tags in endpoints then we can invalid the tag to destroy its cache.
4.  Updating mutation:-
    1. everything as POST but there is many cases about handling cache.
       1. First of all updating an item requires invalidation of the home page array including that item.
       2. related items cache. 1. whitelist the the tag. 2. place in the endpoint with an unique identifier. 3. invalid with the unique identifier.
       3. Only invalid that unique item's cache. 1. whitelist the the tag. 2. place in the endpoint with an unique identifier. 3. invalid with the unique identifier.
          -check in apiSlice.js file-

------------------------------ . ------------------------------

1.  .

# re-redux
