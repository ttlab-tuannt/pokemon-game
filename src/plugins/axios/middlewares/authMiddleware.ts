import { appService } from '@/utils/app';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpMiddleware } from './httpMiddleware';
import throttle from 'lodash/throttle';
import router from '@/router';
import { HttpStatus } from '@/utils/constants';
import { ITokenOption } from '@/utils/token';
import { IRefreshTokenResponse } from '@/modules/auth/types';
import { PageName } from '@/modules/common/constants';

const logout = () => {
    appService.resetAll();
    const currentPage = router.currentRoute?.value;

    if (currentPage?.name !== PageName.LOGIN_PAGE) {
        router
            .push({
                name: PageName.LOGIN_PAGE,
                query: { redirect: currentPage?.fullPath }, // Store the full path to redirect the user to after login
            })
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            .catch(() => {});
    }
};

const sendRefreshToken = async () => {
    const response = (await axios.post(
        `${process.env.VUE_APP_API_URL}/auth/refresh-token`,
        {},
        {
            headers: {
                Authorization: `Bearer ${appService.getTokenOption()?.refreshToken}`,
            },
        },
    )) as IRefreshTokenResponse;
    if (response?.data?.code === HttpStatus.OK) {
        await appService.setUser(response.data?.data?.profile);
        const token: ITokenOption = {
            accessToken: response.data?.data?.accessToken?.token,
            refreshToken: response.data?.data?.refreshToken.token,
            accessTokenExpiredAt: +response.data?.data?.accessToken.expiresIn,
            refreshTokenExpiredAt: +response?.data?.data?.refreshToken.expiresIn,
        };
        await appService.setUserToken(token);
    } else {
        logout();
    }
    return response.data;
};

const throttled = throttle(sendRefreshToken, 10000, { trailing: false });
export default class AuthMiddleware extends HttpMiddleware {
    async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        const tokenExpiredAt = +appService.token?.getAccessTokenExpiredAt();
        if (tokenExpiredAt && tokenExpiredAt <= new Date().getTime()) {
            // token expired, check refresh token
            const refreshToken = appService.getTokenOption()?.refreshToken;
            const refreshTokenExpiredAt =
                +appService.getTokenOption()?.refreshTokenExpiredAt;
            if (
                !refreshToken ||
                !refreshTokenExpiredAt ||
                refreshTokenExpiredAt <= new Date().getTime()
            ) {
                // refresh token expired
                logout();
            } else {
                // check refresh token ok, call refresh token api
                await throttled();
            }
        }
        // set authorization
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${appService.getTokenOption()?.accessToken}`,
        };
        return config;
    }
}
