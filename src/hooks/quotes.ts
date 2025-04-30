import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";


// the useQueries hook is used to fetch multiple queries at once
// it takes an array of queries and returns an array of results
// it helps in maximizing the request concurrency
export const useQuotesByIds = (ids: number[]) => {
    return useQueries({
        queries: ids.map((id) => ({
            queryKey: ['quote', id],
            queryFn: () => axios.get(`https://dummyjson.com/quotes/${id}`).then(res => res.data),
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

export const useQuotes = (page: number, limit: number = 10) => {
    const skip = (page - 1) * limit;
    return useQuery({
        queryKey: ['quotes', page, limit],
        queryFn: () => {
            return axios.get(`https://dummyjson.com/quotes?skip=${skip}&limit=${limit}`).then(res => res.data);
        },
        staleTime: Infinity,
    });
};



