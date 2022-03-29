import { appService } from '@/utils/app';
import moment from 'moment';
import './extendMoment';

moment.locale(appService.currentAppLang);
