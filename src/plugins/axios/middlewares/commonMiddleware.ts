import { networkErrNotitfication } from '@/utils/commonFunction';
import { appService } from '@/utils/app';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { throttle } from 'lodash';
import { HttpMiddleware } from './httpMiddleware';

export default class AuthMiddleware extends HttpMiddleware {
    async onRequest(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
        config.headers['accept-language'] = appService.getLang();
        return config;
    }

    onResponse(response: AxiosResponse): AxiosResponse {
        response.data.success = true;
        return response.data;
    }

    onResponseError(error: AxiosError): void {
        if (error.response) {
            error.response.data = {
                ...(error?.response?.data || {}),
                success: false,
            };
            return error.response.data;
        }
        throttle(() => networkErrNotitfication(), 2000)();
        // TODO: return System error
        throw error;
    }
}
