import { AxiosResponse } from 'axios';

export interface IBodyResponse extends AxiosResponse {
    success: boolean;
    isRequestError?: boolean;
    code: number;
    message: string;
    data: unknown;
    errors?: Array<{ key: string; errorCode: number }>;
}

export interface IBodyRefreshToken {
    rememberMe?: boolean;
}

export interface IRefreshTokenResponse {
    data: {
        code: number;
        data: {
            accessToken: {
                token: string;
                expiredAt: number;
                expiresIn: number;
            };
            refreshToken: {
                token: string;
                expiredAt: number;
                expiresIn: number;
            };
        };
    };
}
