import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const options = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-host': '',
//         'x-rapidapi-key': '90d9191496msh0d0f25ebd8cd782p19ada3jsn6eb63be5bfb3'
//     }
// };

// fetch('https://shazam-core.p.rapidapi.com/v1/charts/world?country_code=DZ', options)
//     .then(response => response.json())
//     .then(response => console.log(response))
//     .catch(err => console.error(err));

export const shazamCoreApi = createApi({
    reducerPath: 'shazamCoreApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', '90d9191496msh0d0f25ebd8cd782p19ada3jsn6eb63be5bfb3');

            return headers;
        },
    }),
    endpoints: (builder) => ({
        getTopCharts: builder.query({ query: () => '/charts/world?country_code=DZ' }),
        getSongDetails: builder.query({ query: (songid) => `/tracks/details?country_code=DZ?track_id=${songid}` }),
    })

});

export const { 
    useGetTopChartsQuery,
    useGetSongDetailsQuery,
} = shazamCoreApi;