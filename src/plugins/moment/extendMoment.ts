import moment from 'moment';
declare module 'moment' {
    interface Moment {
        /**
         * format YYYY-MM-DD HH:mm
         * @return string
         */
        fmFullTimeWithoutSecond(): string;
        /**
         * format YYYY-MM-DD HH:mm:ss
         * @return string
         */
        fmFullTimeString(): string;
        /**
         * format YYYY-MM-DD
         * @return string
         */
        fmDayString(): string;
        /**
         * get start of day
         * @return Moment
         */
        startOfDay(): moment.Moment;
        /**
         * get start of day
         * @return string format YYYY-MM-DD HH:mm:ss
         */
        startOfDayString(): string;
        /**
         * get end of day
         * @return Moment
         */
        endOfDay(): moment.Moment;
        /**
         * get end of day
         * @return string format YYYY-MM-DD HH:mm:ss
         */
        endOfDayString(): string;
        /**
         * get start of tomorrow
         * @return Moment
         */
        startOfTomorrow(): moment.Moment;
        /**
         * get start of tomorrow
         * @return string format YYYY-MM-DD HH:mm:ss
         */
        startOfTomorrowString(): string;
        /**
         * get end of tomorrow
         * @return Moment
         */
        endOfTomorrow(): moment.Moment;
        /**
         * get end of tomorrow
         * @return string format YYYY-MM-DD HH:mm:ss
         */
        endOfTomorrowString(): string;
        /**
         * round second into 0
         * @return Moment
         */
        zeroSecond(): moment.Moment;
        /**
         * format M月D日(ddd)
         * @return string
         */
        fmDateWeekJp(): string;
        /**
         * format M月D日(ddd) HH:mm
         * @return string
         */
        fmDateWeekTimeJp(): string;
        /**
         * format YYYY年M月D日
         * @return string
         */
        fmJpDate(): string;
        /**
         * format YYYY年M月D日(ddd)
         * @return string
         */
        fmDateJpWithDay(): string;
    }
}

moment.fn.fmFullTimeWithoutSecond = function (): string {
    return this.format('YYYY-MM-DD HH:mm');
};

moment.fn.fmFullTimeString = function (): string {
    return this.format('YYYY-MM-DD HH:mm:ss');
};

moment.fn.fmDayString = function (): string {
    return this.format('YYYY-MM-DD');
};

moment.fn.startOfDay = function (): moment.Moment {
    return this.clone().startOf('day');
};

moment.fn.startOfDayString = function (): string {
    return this.clone().startOf('day').fmFullTimeString();
};

moment.fn.endOfDay = function (): moment.Moment {
    return this.clone().endOf('day');
};

moment.fn.endOfDayString = function (): string {
    return this.clone().endOf('day').fmFullTimeString();
};

moment.fn.startOfTomorrow = function (): moment.Moment {
    return this.clone().add(1, 'day').startOf('day');
};

moment.fn.startOfTomorrowString = function (): string {
    return this.clone().add(1, 'day').startOf('day').fmFullTimeString();
};

moment.fn.endOfTomorrow = function (): moment.Moment {
    return this.clone().add(1, 'day').endOf('day');
};

moment.fn.endOfTomorrowString = function (): string {
    return this.clone().add(1, 'day').endOf('day').fmFullTimeString();
};
moment.fn.zeroSecond = function (): moment.Moment {
    return this.set('second', 0);
};
moment.fn.fmDateWeekJp = function (): string {
    return this.format('M月D日(ddd)');
};
moment.fn.fmDateWeekTimeJp = function (): string {
    return this.format('M月D日(ddd) HH:mm');
};

moment.fn.fmJpDate = function (): string {
    return this.format('YYYY年M月D日');
};

moment.fn.fmDateJpWithDay = function (): string {
    return this.format('YYYY年M月D日(ddd)');
};
