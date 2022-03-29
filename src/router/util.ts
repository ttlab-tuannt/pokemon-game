import camelCase from 'lodash/camelCase';

const parseFile = (file: string, obj: Record<string, unknown>) => {
    const arr = file.split('/');
    if (arr.length > 1) {
        let moduleName = file.split('/')[1];
        moduleName = camelCase(moduleName);
        file = file.replace('./', '/');
        obj[moduleName] = require('@/modules' + file);
    }
};

export const getRouteFromModules = (): Record<string, unknown> => {
    const files = require.context('@/modules', true, /route.ts$/);
    const routes = {};
    if (files) {
        files.keys().forEach((file) => {
            parseFile(file, routes);
        });
    }
    return routes;
};
