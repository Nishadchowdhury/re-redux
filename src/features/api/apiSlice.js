import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const apiSlice = createApi({
    reducerPath: 'api',  // it's like we provided name in reducers before this like that. This can be anything or it will set it as 'api' and this will be the keyName in the store.
    baseQuery: fetchBaseQuery({ // this will set the base of the query. As we set the base url in "Axios" it's like that.
        baseUrl: 'http://localhost:9000', // baseUrl of all the requests
        // fetchFn: function() // we can pass a custom or Axios fetcher function here to retrieve data if we want, but this time we not need anything like that because RTKq has everything we need for semi-automation-operation.

        // passing headers and cookies data and token is posable with one of the options here.
    }),
    tagTypes: ["videos", 'video', "RelatedVideos"],
    endpoints: (builder) => ({
        getVideos: builder.query({
            query: () => '/videos', // as we wrote the baseUrl before so we can write only the last path segment of the url will be here. callback that returns the final string and receive params from frontend.
            providesTags: (result, _, __) => { // result & error :- response from server. arg:- the query parameters.
                console.log(result); // we also can check the result from here.
                return ["videos"]
            }

        }), // now all the other stuffs will be done by RTKq, It generates a hook as we exported from 'apiSLice' object.
        getUniqueVideo: builder.query({
            query: (id) => `/videos/${id}`,
            providesTags: (_, __, arg) => [
                { type: "video", id: arg }, // this will provide the corresponding cache.
            ]
        }),
        ///videos?title_like=css&title_like=react

        getRelatedVideos: builder.query({
            query: ({ id, title }) => {

                const tags = title.split(" ");
                const likes = tags.map(tag => `title_like=${tag}`);
                const queryString = "?" + likes.join("&") + "&_limit=4"

                return "/videos" + queryString
            },
            providesTags: (result, error, arg) => [
                { type: "RelatedVideos", id: arg.id }, // this will provide the corresponding cache.
            ]
        }),

        // mutations 
        addVideo: builder.mutation({
            query: (data) => ({
                url: '/videos',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['videos']

        }), // mutations 
        editVideo: builder.mutation({
            query: ({ id, data }) => ({
                url: '/videos/' + id,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: (_, __, arg) => [
                "videos",
                { type: "video", id: arg.id }, // invalid the individual id's data
                { type: "RelatedVideos", id: arg.id }, // invalid the individual id's data
            ]

        }),
        deleteVideo: builder.mutation({
            query: (id) => ({
                url: '/videos/' + id,
                method: 'DELETE',
            }),
            invalidatesTags: ["videos"]

        })



    }) // As we created separated functions for individual operations but now all the api endpoints will be here and it follows builder partan.


})

export const {
    useGetVideosQuery,
    useGetUniqueVideoQuery,
    useGetRelatedVideosQuery,
    useAddVideoMutation,
    useEditVideoMutation,
    useDeleteVideoMutation

} = apiSlice; 