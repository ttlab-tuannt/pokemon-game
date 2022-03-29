import { storage } from './storage';

const BUFFER_TIME = 60 * 1000; // 60s

export const enum TokenEnum {
    ACCESS_TOKEN = 'ACCESS_TOKEN',
    REFRESH_TOKEN = 'REFRESH_TOKEN',
    ACCESS_TOKEN_EXPIRED_AT = 'ACCESS_TOKEN_EXPIRED_AT',
    REFRESH_TOKEN_EXPIRE_AT = 'REFRESH_TOKEN_EXPIRE_AT',
}

export interface ITokenOption {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiredAt: number;
    refreshTokenExpiredAt: number;
}

export class TokenService {
    setAccessToken(value: string): void {
        storage.setLocalStorage(TokenEnum.ACCESS_TOKEN, value);
    }

    setRefreshToken(value: string): void {
        storage.setLocalStorage(TokenEnum.REFRESH_TOKEN, value);
    }

    setAccessTokenExpiredAt(expiredIn: number): void {
        const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
        storage.setLocalStorage(TokenEnum.ACCESS_TOKEN_EXPIRED_AT, String(expiredAt));
    }

    setRefreshTokenExpiredAt(expiredIn: number): void {
        const expiredAt = new Date().getTime() + expiredIn * 1000 - BUFFER_TIME;
        storage.setLocalStorage(TokenEnum.REFRESH_TOKEN_EXPIRE_AT, String(expiredAt));
    }

    getAccessToken(): string {
        return storage.getLocaleStorage(TokenEnum.ACCESS_TOKEN);
    }

    getRefreshToken(): string {
        return storage.getLocaleStorage(TokenEnum.REFRESH_TOKEN);
    }

    getAccessTokenExpiredAt(): number {
        return +storage.getLocaleStorage(TokenEnum.ACCESS_TOKEN_EXPIRED_AT);
    }

    getRefreshTokenExpiredAt(): number {
        return +storage.getLocaleStorage(TokenEnum.REFRESH_TOKEN_EXPIRE_AT);
    }

    resetAccessToken(): void {
        storage.setLocalStorage(TokenEnum.ACCESS_TOKEN, '');
    }

    resetRefreshToken(): void {
        storage.setLocalStorage(TokenEnum.REFRESH_TOKEN, '');
    }

    resetAccessTokenExpiredAt(): void {
        storage.setLocalStorage(TokenEnum.ACCESS_TOKEN_EXPIRED_AT, '');
    }

    resetRefreshTokenExpiredAt(): void {
        storage.setLocalStorage(TokenEnum.REFRESH_TOKEN_EXPIRE_AT, '');
    }

    resetAll(): void {
        this.resetAccessToken();
        this.resetAccessTokenExpiredAt();
        this.resetRefreshToken();
        this.resetRefreshTokenExpiredAt();
    }
}

export const tokenService = new TokenService();
