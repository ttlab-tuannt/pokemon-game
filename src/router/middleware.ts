/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavigationGuardNext, RouteLocationNormalized, RouteRecord } from 'vue-router';

export const GLOBAL_MIDDLEWARE_NAME = 'global';
class VueRouteMiddleware {
    middlewares: any = {};
    to: RouteLocationNormalized;
    from: RouteLocationNormalized;
    next: NavigationGuardNext;
    nextHasCalled: boolean;
    /**
     * Set instance properties and call defined
     * middlewares on matching routes
     *
     * @param {object} definedMiddlewares
     * @param {object} to
     * @param {object} from
     * @param {function|undefined} next
     *
     * @var {object} middlewares // predefined middlewares
     * @var {boolean} nextHasCalled // if next was called in the middlewares
     * @var {array} toMiddleware // arguments passed to middleware function
     */
    constructor(
        definedMiddlewares: any,
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext,
    ) {
        if (this._isObject(definedMiddlewares)) {
            this.middlewares = definedMiddlewares;
        } else {
            this._error('Defined middlewares must be of type Object!');
            this.middlewares = {};
        }
        this.to = to;
        this.from = from;
        this.next = next;
        this.nextHasCalled = false;
        // run global middleware for all routes
        this.applyMiddleware(GLOBAL_MIDDLEWARE_NAME);
        if (this.to && this.to.matched) {
            // Apply middleware if anu route matched
            to.matched.every((route) => this.applyRouteMiddlewares(route));
        }
        if (typeof this.next === 'function' && !this.nextHasCalled) {
            // call next if user didnt call it
            this.callNext();
        }
    }

    /**
     * Function used to pass arguments to middlewares with spred syntax
     *
     * @return {array}
     */
    toMiddleware() {
        return [
            this.to,
            this.from,
            this._isFunction(this.next) ? this.callNext.bind(this) : undefined,
        ];
    }

    /**
     * Function that is passed to middleware as a next function wrapper
     * toggling `nextHasCalled` trigger
     *
     * @param  {...any} args
     */
    callNext(...args: any) {
        if (!this.nextHasCalled) this.nextHasCalled = true;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.next(...args);
    }

    /**
     * Fuction applying middlewares of a single route and deciding
     * if other matched routes should be checked as well
     *
     * @param {*} route
     *
     * @return {boolean}
     */
    applyRouteMiddlewares(route: RouteRecord) {
        if (route.meta && route.meta.middleware) {
            const middlewareKeys: any = route.meta.middleware;
            if (this._isArray(middlewareKeys)) {
                return middlewareKeys.every((middleware: string | Function) =>
                    this.applyMiddleware(middleware),
                );
            } else {
                return this.applyMiddleware(middlewareKeys);
            }
        }
        return true;
    }

    /**
     * Function calling middlewares and deciding if middleware chain
     * must be continued or stopped after first faliure
     *
     * @param {string|function} middleware
     *
     * @return {boolean}
     */
    applyMiddleware(middleware: string | Function) {
        const result = this.getMiddleware(middleware)(...this.toMiddleware());
        return result === undefined ? true : result;
    }

    /**
     * Function to get middleware function.
     * In case of function validation failure
     * console the error and return empty function
     *
     * @param {string|function} middleware
     *
     * @return {function}
     */
    getMiddleware(middleware: string | Function) {
        if (this._isString(middleware)) {
            if (this.middlewares.hasOwnProperty(middleware)) {
                if (this._isFunction(this.middlewares[middleware as string])) {
                    return this.middlewares[middleware as string];
                } else {
                    this._error(middleware + ' is not a function!');
                }
            }
        } else if (this._isFunction(middleware)) {
            return middleware;
        } else {
            this._error('All middlewares must be functions!');
        }
        return () => true;
    }

    /**
     * @param {string} text
     *
     * @return {boolean}
     */
    _error(text: string) {
        console.error(this.constructor.name + ': ' + text);
    }

    /**
     * @param {*} toCheck
     *
     * @return {boolean}
     */
    _isString(toCheck: unknown) {
        return typeof toCheck === 'string' || toCheck instanceof String;
    }

    /**
     * @param {*} toCheck
     *
     * @return {boolean}
     */
    _isArray(toCheck: unknown) {
        return Array.isArray(toCheck);
    }

    /**
     * @param {*} toCheck
     *
     * @return {boolean}
     */
    _isFunction(toCheck: unknown) {
        return typeof toCheck === 'function';
    }

    /**
     * @param {*} toCheck
     *
     * @return {boolean}
     */
    _isObject(toCheck: unknown) {
        return typeof toCheck === 'object' && toCheck !== null;
    }
}

export default (definedGroups = {}) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return (...args: any) => new VueRouteMiddleware(definedGroups, ...args);
};
