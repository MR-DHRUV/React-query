import { Product } from "@/types/Product";
import { Response } from "@/types/Response";
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const fetchProduct = (id: string): Promise<Product> => {
    return axios.get(`https://dummyjson.com/products/${id}`).then(res => res.data);
};

export const useProducts = (searchKey: string) => {
    return useQuery({
        queryKey: ['products', searchKey],
        queryFn: async({ queryKey }): Promise<Response<Product,"products">> =>
            fetch(`https://dummyjson.com/products/search?q=${queryKey[1]}`).then((res) => res.json()),
        staleTime: 100 * 60 * 1000,
        enabled: !!searchKey, // run only if search term exists
    });
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