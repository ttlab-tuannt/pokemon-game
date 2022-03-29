import { configure } from 'vee-validate';
import { localize } from '@vee-validate/i18n';
import locale from './locale';

configure({
    generateMessage: localize(locale),
});
