/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AxiosInstance,
    AxiosAdapter,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';
import { HttpMiddleware } from './middlewares/httpMiddleware';

/**
 * @property {Array} middlewares stack
 * @property {AxiosInstance} http
 * @property {Function} originalAdapter
 */
export default class HttpMiddlewareService {
    http!: AxiosInstance | null;
    originalAdapter?: AxiosAdapter;
    middlewares: HttpMiddleware[];
    chain!: any;

    /**
     * @param {AxiosInstance} [axios]
     */
    constructor(axios: AxiosInstance) {
        this.middlewares = [];

        this._updateChain();
        this.setHttp(axios);
    }

    /**
     * @param {AxiosInstance} axios
     * @returns {HttpMiddlewareService}
     */
    setHttp(axios: AxiosInstance): HttpMiddlewareService {
        this.unsetHttp();

        if (axios) {
            this.http = axios;
            this.originalAdapter = axios.defaults.adapter;
            axios.defaults.adapter = ((config: AxiosRequestConfig) =>
                this.adapter(config)) as unknown as AxiosAdapter;
        }
        return this;
    }

    /**
     * @returns {HttpMiddlewareService}
     */
    unsetHttp(): HttpMiddlewareService {
        if (this.http) {
            this.http.defaults.adapter = this.originalAdapter;
            this.http = null;
        }
        return this;
    }

    /**
     * @param {Object|HttpMiddleware} [middleware]
     * @returns {boolean} true if the middleware is already registered.
     */
    has(middleware: HttpMiddleware): boolean {
        return this.middlewares.indexOf(middleware) > -1;
    }

    /**
     * Adds a middleware or an array of middlewares to the stack.
     * @param {Object|HttpMiddleware|Array} [middlewares]
     * @returns {HttpMiddlewareService}
     */
    register<T extends HttpMiddleware>(middlewares: T[] | T): HttpMiddlewareService {
        // eslint-disable-next-line no-param-reassign
        if (!Array.isArray(middlewares)) middlewares = [middlewares];

        // Test if middlewares are registered more than once.
        middlewares.forEach((middleware) => {
            if (!middleware) return;
            if (this.has(middleware)) {
                throw new Error('Middleware already registered');
            }
            this.middlewares.push(middleware);
            this._addMiddleware(middleware);
        });
        return this;
    }

    /**
     * Removes a middleware from the registered stack.
     * @param {Object|HttpMiddleware} [middleware]
     * @returns {HttpMiddlewareService}
     */
    unregister<T extends HttpMiddleware>(middleware: T): HttpMiddlewareService {
        if (middleware) {
            const index = this.middlewares.indexOf(middleware);
            if (index > -1) {
                this.middlewares.splice(index, 1);
            }
            this._updateChain();
        }

        return this;
    }

    /**
     * Removes all the middleware from the stack.
     * @returns {HttpMiddlewareService}
     */
    reset(): HttpMiddlewareService {
        this.middlewares.length = 0;
        this._updateChain();
        return this;
    }

    /**
     * @param config
     * @returns {Promise}
     */
    adapter(config: AxiosRequestConfig): AxiosAdapter {
        return this.chain.reduce((acc: Promise<unknown>, data: any[]) => {
            const onResolve = data[0];
            const onError = data[1];
            return acc.then(onResolve, onError);
        }, Promise.resolve(config));
    }

    /**
     *
     * @param {Object} middleware
     * @private
     */
    _addMiddleware<T extends HttpMiddleware>(middleware: T): void {
        this.chain.unshift([
            middleware.onRequest &&
                ((conf: AxiosRequestConfig) => middleware.onRequest(conf)),
            middleware.onRequestError &&
                ((error: AxiosError) => middleware.onRequestError(error)),
        ]);

        this.chain.push([
            middleware.onResponse &&
                ((response: AxiosResponse) => middleware.onResponse(response)),
            middleware.onResponseError &&
                ((error: AxiosError) => middleware.onResponseError(error)),
        ]);
    }

    /**
     * @private
     */
    _updateChain(): void {
        this.chain = [
            [
                (conf: AxiosRequestConfig) =>
                    this._onSync(
                        this.originalAdapter?.call(this.http, conf) as Promise<unknown>,
                    ),
                undefined,
            ],
        ];
        this.middlewares.forEach((middleware) => this._addMiddleware(middleware));
    }

    /**
     * @param {Promise} promise
     * @returns {Promise}
     * @private
     */
    _onSync(promise: Promise<unknown>): Promise<unknown> {
        return this.middlewares.reduce(
            (acc, middleware) => (middleware.onSync ? middleware.onSync(acc) : acc),
            promise,
        );
    }
}
