import React from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from './ui/spinner'
import { Post } from '../types/Post'
import PostCard from './PostCard'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'

// react query tutorial 
const Home = () => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: () => axios.get('https://dummyjson.com/posts').then(res => res.data),
    })

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mt-4">Posts</h1>
            {isLoading && <Spinner size="large" show={isLoading} />}
            {isError && <p className="text-red-500 text-center">Error fetching posts</p>}
            {data && data.posts.map((post: Post) => (
                <div key={post.id} className="flex flex-row flex-wrap justify-center gap-4 mt-4">
                    <PostCard {...post} />
                </div>
            ))}
            <ReactQueryDevtools initialIsOpen={false} />
        </div>
    )
}

export default Home
