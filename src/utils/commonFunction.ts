import i18n from '@/plugins/vue-i18n';
import { ElNotification } from 'element-plus';

export const randomVid = (): string => {
    return `${Math.floor(Math.random() * 100)}-${Date.now()}`;
};

export const capitalizeFirstLetter = (letter: string): string => {
    if (letter) {
        return letter.charAt(0).toUpperCase() + letter.slice(1);
    }
    return letter;
};

export const networkErrNotitfication = () => {
    ElNotification({
        message: i18n.global.t('common.common.errors.network'),
        type: 'error',
    });
};
