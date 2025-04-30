// Generic response type for API responses
export type Response<T, K extends string> = {
    [key in K]: T[];
} & {
    total: number;
    limit: number;
    skip: number;
}