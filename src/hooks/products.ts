import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProduct = (id:string):Promise<Product> => {
    return axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data);
};

export const useProduct = (id: string) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => fetchProduct(id),
        staleTime: 100 * 60 * 1000,
        retry: 3,
        retryDelay: 1000,
    });
};