import { IBodyResponse } from '@/modules/common/types';

export interface IUser {
    id: number;
    email: string;
}

export interface Token {
    token: string;
    expiresIn: number;
}

export interface ILoginResponse extends IBodyResponse {
    data: {
        accessToken: {
            token: string;
            expiresIn: string;
        };
        refreshToken: {
            token: string;
            expiresIn: string;
        };
        profile: IUser;
    };
}

export interface IRefreshTokenResponse {
    data: {
        code: number;
        data: {
            accessToken: {
                token: string;
                expiresIn: string;
            };
            refreshToken: {
                token: string;
                expiresIn: string;
            };
            profile: IUser;
        };
    };
}
