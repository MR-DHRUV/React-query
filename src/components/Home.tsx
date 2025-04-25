import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from './ui/spinner'
import { Post } from '../types/Post'
import PostCard from './PostCard'

// react query tutorial 
const Home = () => {

    const { data, isLoading, isError, isFetching } = useQuery({
        queryKey: ['posts'],
        // A Query Key is a unique identifier for a query.
        // React Query uses it to: Cache the result of the query (5 minutes by default)
        // Identify when data should be refetched or reused
        queryFn: () => axios.get('https://dummyjson.com/posts').then(res => res.data),
        staleTime: 100 * 60 * 1000, // 100 minutes, time till the data is considered fresh, default is 0
        refetchOnMount: true, // refetch the data when the component mounts if it is stale, default is true
        refetchOnWindowFocus: true, // refetch the data when the window is focused if it is stale, default is true
    })

    console.log("isLoading", isLoading, "isFetching", isFetching)

    return (
        <div className='mt-10'>
            <h1 className="text-2xl font-bold text-center mt-4">Posts</h1>
            {isLoading && <Spinner size="large" show={isLoading} />}
            {isError && <p className="text-red-500 text-center">Error fetching posts</p>}
            {data && data.posts.map((post: Post) => (
                <div key={post.id} className="flex flex-row flex-wrap justify-center gap-4 mt-4">
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    )
}

export default Home
