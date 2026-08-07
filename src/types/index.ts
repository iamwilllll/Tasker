export type CustomErrorResponse = {
    message: string;
    code: string;
    originalError: unknown;
    error: boolean;
};
