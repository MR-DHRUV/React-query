import React from 'react'
import { Spinner } from '../ui/spinner'
import { Post } from '../../types/Post'
import { usePosts } from '@/hooks/posts'
import PostCard from './PostCard'
import PaginationComponent from '../ui/PaginationComponent'

// react query tutorial 
const Home = () => {

    const [page, setPage] = React.useState(1);
    const {
        status, // error, pending, success
        data, // 
        isFetching, // is the data being fetched
        isRefetching, // is the data being refetched
        isLoading, // is true whenever the first fetch for a query is in-flight
        error,
        isError,
        failureCount, // number of times the query has failed
        failureReason, // reason for the failure
    } = usePosts(page);

    if (isLoading) {
        return (
            <div className='mt-30 flex justify-center'>
                <Spinner size="large" show={isLoading} />
            </div>
        )
    }

    if (isError && error) {
        return (
            <div className='mt-10 flex justify-center'>
                <p className="text-red-500 text-center">Error fetching products: {error.message}</p>
            </div>
        )
    }

    if (!data) {
        return (
            <div className='mt-10 flex justify-center'>
                <p className="text-red-500 text-center">No data found</p>
            </div>
        )
    }

    return (
        <div className='my-15'>
            <h1 className="text-2xl font-bold text-center mt-4">Posts</h1>
            {data && data.posts.map((post: Post) => (
                <div key={post.id} className="flex flex-row flex-wrap justify-center gap-4 my-4">
                    <PostCard {...post} />
                </div>
            ))}

            <PaginationComponent
                currentPage={page}
                setCurrentPage={setPage}
                totalPages={Math.ceil(data.total / data.limit)}
            />
        </div>
    )
}

export default Home
