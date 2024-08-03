
export class ApiResponse<T> {
    success: boolean;
    status_code?: number;
    message?: string;
    data?: T;
    errors?: any;

    constructor(options: { success: boolean, statusCode?: number, message?: string, data?: T, errors?: any }) {
        this.success = options.success;
        this.status_code = options.statusCode;
        this.message = options.message;
        this.data = options.data;
        this.errors = options.errors;
    }
}

export function createResponse<T>(options: { success: boolean, statusCode?: number, message?: string, data?: T, errors?: any }): ApiResponse<T> {
    return new ApiResponse(options);
}

