export const successResponse = (message: string, data: any = {}) => {
    return {
        success: true,
        message,
        data,
    };
};

export const errorResponse = (message: string, code: number = 500, errors: any = null) => {
    return {
        success: false,
        message,
        code,
        errors,
    };
};
