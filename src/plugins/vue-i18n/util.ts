import camelCase from 'lodash/camelCase';
import { LocaleMessages, VueMessageType } from 'vue-i18n';

const Config = {
    ja: {
        extension: '.ja.ts',
        regex: /ja\.ts$/,
        code: 'ja',
    },
    en: {
        extension: '.en.ts',
        regex: /en\.ts$/,
        code: 'en',
    },
};

const parseLocale = (
    file: string,
    type = Config.ja.extension,
    obj: Record<string, Record<string, unknown>>,
) => {
    let filename = `${file}`.replace(/^.*[\\/]/, '');
    const arr = file.split('/');
    const tmp: Record<string, unknown> = {};
    if (arr.length > 1) {
        let moduleName = file.split('/')[1];
        filename = filename.replace(type, '');
        filename = camelCase(filename);
        moduleName = camelCase(moduleName);
        file = file.replace('./', '/');
        tmp[filename] = require('@/modules' + file);
        if (!obj[moduleName]) {
            obj[moduleName] = {};
        }
        obj[moduleName][filename] = (
            tmp[filename] as { default: Record<string, unknown> }
        ).default;
    }
};

const getJaModuleFromCode = () => {
    const locale: LocaleMessages<VueMessageType> = {};
    const files = require.context('@/modules', true, /ja\.ts$/);
    if (files) {
        files.keys().forEach((file) => {
            parseLocale(file, Config.ja.extension, locale);
        });
    }
    return locale;
};

const getEnModuleFromCode = () => {
    const locale: LocaleMessages<VueMessageType> = {};
    const files = require.context('@/modules', true, /en\.ts$/);
    if (files) {
        files.keys().forEach((file) => {
            parseLocale(file, Config.en.extension, locale);
        });
    }
    return locale;
};

export const getLocaleFromModules = (): LocaleMessages<VueMessageType> => {
    const localeJa = getJaModuleFromCode();
    const localeEn = getEnModuleFromCode();
    return {
        [Config.en.code]: localeEn,
        [Config.ja.code]: localeJa,
    };
};
