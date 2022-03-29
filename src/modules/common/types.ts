import { AxiosResponse } from 'axios';

// Interfaces for general response of all apis
export interface IBodyResponse extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: number;
    message: string;
    data: Record<string, any>;
    errors?: {
        key: string;
        errorCode: number;
        message: string;
        rule?: string;
        path?: string;
    }[];
}

export interface IGetListResponse extends IBodyResponse {
    data: {
        items: Record<string, any>[];
        totalItems: number;
    };
}

export interface IGetListParams {
    limit?: number;
    page?: number;
}

export interface IServiceOption {
    baseUrl: string;
}
