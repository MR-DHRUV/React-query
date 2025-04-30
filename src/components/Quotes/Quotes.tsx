import React from 'react'
import { useQuotes, useQuotesByIds } from '@/hooks/quotes';
import { Spinner } from '../ui/spinner';
import { Quote } from '@/types/Quote';
import QuoteCard from './QuoteCard';

const Quotes = () => {

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuotesByIds([1,2,4,5,7,6]);

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
                {data && data.quotes.map((quote: Quote) => (
                    <QuoteCard {...quote} key={quote.id} />
                ))}
            </div>
        </div>
    )
}

export default Quotes
