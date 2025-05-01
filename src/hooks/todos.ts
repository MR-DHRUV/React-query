import { Quote } from "@/types/Quote";
import { Response } from "@/types/Response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const defultLimit = 10;

export const useTodos = (page: number, limit: number = defultLimit) => {
    const skip = (page - 1) * limit;
    return useQuery({
        queryKey: ['todos', skip, limit],
        queryFn: async ({ queryKey }): Promise<Response<Quote, "todos">> => {
            return axios.get(`https://dummyjson.com/todos?skip=${queryKey[1]}&limit=${queryKey[2]}`).then(res => res.data);
        },
        staleTime: 100 * 60 * 1000,
    });
};

// useMutation is used to create a mutation that can be used to create, update or delete data
export const useCreateTodo = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user: unknown): Promise<Quote> => {
            return axios.post('https://dummyjson.com/todos/add', user).then(res => res.data);
        },
        onSuccess: (data: Quote) => {
            // Invalidate and refetch the todos query to get the latest data after mutation is successful
            // queryClient.invalidateQueries({ queryKey: ['todos'] });

            // A better way is to avoid the network call and update the query cache directly
            queryClient.setQueryData(
                ['todos'],
                (oldData: Response<Quote, "todos">) => {
                    if (oldData) {
                        return {
                            ...oldData,
                            todos: [...oldData.todos, data],
                            total: oldData.total + 1,
                        };
                    }
                    return oldData;
                },
            );
        },
    });
};