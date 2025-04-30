import React from 'react'
import { useInfiniteQuotes } from '@/hooks/quotes';
import { Spinner } from '../ui/spinner';
import { Quote } from '@/types/Quote';
import QuoteCard from './QuoteCard';

const Quotes = () => {

    const loaderRef = React.useRef<HTMLDivElement | null>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        isError,
        error,
    } = useInfiniteQuotes();

    React.useEffect(() => {
        // The IntersectionObserver API is a powerful, browser-native tool used to observe when an element enters or leaves the viewport (or a specified container), without requiring you to manually track scroll position.
        // using this we are tracking if the user has scrolled to the bottom loader component
        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && hasNextPage) {
                    fetchNextPage();
                }
            },
            {
                threshold: 1,
            },
        );

        // Check if the loaderRef is set and observe it
        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        // Cleanup function to unobserve the loaderRef when the component unmounts
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current);
            }
        }
    })

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

    return (
        <div className='mt-10'>
            <h1 className="text-2xl font-bold text-center mt-4">Quotes</h1>
            <div className="flex flex-col justify-center gap-4 my-4">
                {data?.pages.map((page) => (
                    page.quotes.map((quote: Quote) => (
                        <QuoteCard key={quote.id} {...quote} />
                    ))
                ))}
            </div>

            {hasNextPage && (
                <div ref={loaderRef} className='my-5 flex justify-center'>
                    <Spinner size="large" show={true} />
                </div>
            )}
        </div>
    )
}

export default Quotes
