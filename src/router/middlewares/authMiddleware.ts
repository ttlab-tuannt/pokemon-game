import { ModuleName, SpecialPage } from '@/modules/common/constants';
import { appService } from '@/utils/app';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export default async (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext,
): Promise<void> => {
    const isPublic = to?.meta?.public || false;
    const onlyWhenLoggedOut = to?.meta?.onlyWhenLoggedOut || false;
    const loggedIn = !!appService.getTokenOption().accessToken;
    const refreshToken = appService.getTokenOption()?.refreshToken;
    const refreshTokenExpiredAt = +appService.getTokenOption()?.refreshTokenExpiredAt;

    if (isPublic) {
        // Do not allow user to visit entry page if they are logged in
        if (loggedIn && onlyWhenLoggedOut) {
            return next('/');
        }
        return next();
    }
    if (!isPublic && !loggedIn) {
        return next({
            path: '/login',
            query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
        });
    }
    if (
        !refreshToken ||
        !refreshTokenExpiredAt ||
        refreshTokenExpiredAt <= new Date().getTime()
    ) {
        appService.resetAll();
        return next({
            path: '/login',
            query: { redirect: to.path },
        });
    }
    if (loggedIn) {
        const nameModule = to?.meta?.name || '';
        if (nameModule === '') {
            return next({ path: '/error/404' });
        }
        if (nameModule === ModuleName.DASHBOARD_PAGE || SpecialPage.NOT_FOUND) {
            return next();
        }
        const userPermissions = appService.getUser() as any;
        const canRead = userPermissions?.role?.permission[`${nameModule}`]?.read;
        if (!canRead) {
            return next({ path: ModuleName.DASHBOARD_PAGE });
        }
        return next();
    }
    return next();
};
