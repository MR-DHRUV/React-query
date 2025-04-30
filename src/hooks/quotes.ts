import { Quote } from "@/types/Quote";
import { Response } from "@/types/Response";
import { useQueries, useQuery, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";


// the useQueries hook is used to fetch multiple queries at once
// it takes an array of queries and returns an array of results
// it helps in maximizing the request concurrency
export const useQuotesByIds = (ids: number[]) => {
    return useQueries({
        queries: ids.map((id) => ({
            queryKey: ['quote', id],
            queryFn: async():Promise<Quote> => axios.get(`https://dummyjson.com/quotes/${id}`).then(res => res.data),
            staleTime: Infinity,
        })),
        combine: (results) => {
            return {
                data: {
                    quotes: results.map((result) => {
                        if (result.isSuccess) {
                            return result.data;
                        }
                        return null;
                    }).filter((quote) => quote !== null),
                },
                isLoading: results.some((result) => result.isLoading),
                isError: results.some((result) => result.isError),
                error: results.find((result) => result.isError)?.error,
            }
        },
    });
};

const defultLimit = 10;

export const useQuotes = (page: number, limit: number = defultLimit) => {
    const skip = (page - 1) * limit;
    return useQuery({
        queryKey: ['quotes', skip, limit],
        queryFn: async ({ queryKey }): Promise<Response<Quote,"quotes">> => {
            return axios.get(`https://dummyjson.com/quotes?skip=${queryKey[1]}&limit=${queryKey[2]}`).then(res => res.data);
        },
        staleTime: Infinity,
    });
};


export const useInfiniteQuotes = () => {
    return useInfiniteQuery({
        queryKey: ['quotes'],
        queryFn: async ({pageParam}) => {
            return axios.get(`https://dummyjson.com/quotes?skip=${pageParam.skip}&limit=${pageParam.limit}&delay=1000`).then(res => res.data);
        },
        initialPageParam: {skip: 0, limit: defultLimit},
        getNextPageParam: (lastPage, _pages) => { 
            const { skip, total, limit } = lastPage;
            const nextSkip = skip + limit;
            return nextSkip < total ? {skip: nextSkip, limit: limit} : undefined;
        }
    });
}
