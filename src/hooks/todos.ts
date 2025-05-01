import { Todo } from "@/types/Todo";
import { Response } from "@/types/Response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const defultLimit = 10;

export const useTodos = (page: number, limit: number = defultLimit) => {
    const skip = (page - 1) * limit;
    return useQuery({
        queryKey: ['todos', skip, limit],
        queryFn: async ({ queryKey }): Promise<Response<Todo, "todos">> => {
            return axios.get(`https://dummyjson.com/todos?skip=${queryKey[1]}&limit=${queryKey[2]}`).then(res => res.data);
        },
        staleTime: 100 * 60 * 1000,
    });
};

// useMutation is used to create a mutation that can be used to create, update or delete data
export const useCreateTodo = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (user: unknown): Promise<Todo> => {
            return axios.post('https://dummyjson.com/todos/add', user).then(res => res.data);
        },
        // Implementing optimistic updates can provide a illusion of instant feedback to the user, even before the server responds.
        // This can be done by updating the local cache with the new data before the mutation is completed.

        // onMutate is called before the mutation function is fired.
        // It is used to update the local cache with the new data before the mutation is completed.
        onMutate: async (newTodo: Todo) => {
            // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: ['todos'] });

            // Snapshot the previous value
            const previousTodos = await queryClient.getQueryData(['todos']);

            // Optimistically update to the new value
            queryClient.setQueryData(['todos'], (old: Response<Todo, "todos">) => {
                return {
                    ...old,
                    todos: [...old.todos, { ...newTodo, id: old.total + 1 }],
                    total: old.total + 1,
                };
            });

            // Return a context object with the snapshotted value
            // this will be used to rollback the optimistic update if the mutation fails
            return { previousTodos };
        },
        onError: (_error, _newTodo, context) => {
            // we can also shoot a notification / toast here to inform the user that the mutation failed
            queryClient.setQueryData(['todos'], context?.previousTodos);
        },

        // onSuccess is called when the mutation is completed either successfully or with an error.
        onSettled: () => {
            // Invalidate and refetch to ensure client state is in sync with server state
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });
};