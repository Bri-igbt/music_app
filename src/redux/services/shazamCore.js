import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


// const options = {
//     method: 'GET',
//     headers: {
//         'x-rapidapi-host': '',
//         'x-rapidapi-key': '3a06ac4e09msh1de38fcbfcc7d43p1bde2djsn548cc3325b35'
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
                headers.set('x-rapidapi-key', 'fa13cb5930mshe8ad4b5e7cdf121p118ee7jsnb8d4e92bd6fa');

                return headers;
            },
        }),
        endpoints: (builder) => ({
            getTopCharts: builder.query({ query: () => '/charts/world?country_code=DZ' }),
        })

    });

export const { useGetTopChartsQuery } = shazamCoreApi;