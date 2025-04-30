import { Post } from "@/types/Post";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

// this is a custom hook that uses react-query to fetch posts from the API
// this will allow us to use the same logic in multiple components without repeating code
// it will also allow us to use the same query key in multiple components to share the same data
// and avoid refetching the same data multiple times
export const usePosts = (page: number, limit: number = 10) => {
    const skip = (page - 1) * limit;
    return useQuery({
        queryKey: ['posts', page, limit],
        // A Query Key is a unique identifier for a query.
        // React Query uses it to: Cache the result of the query (5 minutes by default)
        // Identify when data should be refetched or reused
        queryFn: async ():Promise<Response<Post,"posts">> => {
            return axios.get(`https://dummyjson.com/posts?skip=${skip}&limit=${limit}`).then(res => res.data);
        },
        staleTime: 100 * 60 * 1000, // 100 minutes, time till the data is considered fresh, default is 0
        gcTime: 1000 * 60 * 1000, // 100 minutes, time till the data is garbage collected, default is 5 minutes

        refetchOnMount: true, // refetch the data when the component mounts if it is stale, default is true
        refetchOnWindowFocus: true, // refetch the data when the window is focused if it is stale, default is true
        // refetchInterval: 1000 * 60 * 5, // refetch the data every 5 minutes (Polling), default is false
        // refetchIntervalInBackground: true, // refetch the data in the background, default is false

        // select: (data) => {
        //     // Select is used to transform the data before it is returned to the component
        //     // It is similar to a map function, but it is used to transform the data in the query
        //     const posts = data.posts.map((post: Post) => post)
        //     return posts
        // }

        retry: 3, // retry the query 3 times if it fails, default is 3
        retryDelay: 1000, // wait 1 second before retrying, default is 1000ms
    });
};