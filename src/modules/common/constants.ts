// layouts
export const MAIN_LAYOUT_NAME = 'MainLayout';
export const GUEST_LAYOUT_NAME = 'GuestLayout';
export const LOGIN_LAYOUT_NAME = 'LoginLayout';
export const ERROR_LAYOUT_NAME = 'ErrorLayout';
export const HEIGHT_HEADER = 64;
export const HEIGHT_HEADER_OF_CONTENT = 80;

export const DATE_PICKER_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_PICKER_FORMAT = 'YYYY-MM-DD HH:mm:ss';

// max size upload file 10 * 1024 * 1024 = 10485760
export const MAX_SIZE_FILE = 10485760;

// textarea
export const TEXTAREA_DEFAULT_ROWS = 3;
export const TEXTAREA_MAX_ROW = 10;
export const TEXTAREA_MIN_ROW = 1;
export const TEXTAREA_MAX_LENGTH = 2000;
export const TEXT_MAX_LENGTH = 255;
export const TEXTAREA_MIN_LENGTH = 0;

// pagination
export const DEFAULT_FIRST_PAGE = 1;
export const DEFAULT_SIZE_PER_PAGE = 10;
export const DEFAULT_SIZE_PER_PAGE_OPTIONS = [10, 50, 100];
export const DEFAULT_LAYOUT = 'prev, pager, next';
export const DEFAULT_PAGER_COUNT = 7;

export enum HttpStatus {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    EARLYHINTS = 103,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    AMBIGUOUS = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    TEMPORARY_REDIRECT = 307,
    PERMANENT_REDIRECT = 308,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    PAYMENT_REQUIRED = 402,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    PROXY_AUTHENTICATION_REQUIRED = 407,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    GONE = 410,
    LENGTH_REQUIRED = 411,
    PRECONDITION_FAILED = 412,
    PAYLOAD_TOO_LARGE = 413,
    URI_TOO_LONG = 414,
    UNSUPPORTED_MEDIA_TYPE = 415,
    REQUESTED_RANGE_NOT_SATISFIABLE = 416,
    EXPECTATION_FAILED = 417,
    I_AM_A_TEAPOT = 418,
    MISDIRECTED = 421,
    UNPROCESSABLE_ENTITY = 422,
    FAILED_DEPENDENCY = 424,
    TOO_MANY_REQUESTS = 429,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
    HTTP_VERSION_NOT_SUPPORTED = 505,
}

export enum PageName {
    LOGIN_PAGE = 'LoginPage',
    DASHBOARD_PAGE = 'DashboardPage',
    PROFILE_PAGE = 'ProfilePage',
    USER_PAGE = 'UserPage',
    HOME_PAGE = 'home',
    ROLE_LIST_PAGE = 'RoleListPage',
    ROLE_CREATE_PAGE = 'RoleCreatePage',
    ROLE_EDIT_PAGE = 'RoleEditPage',
    TIME_KEEPING_PAGE = 'TimeKeepingPage',
    REQUEST_ABSENCE_PAGE = 'RequestAbsencePage',
    BILLING_PAGE = 'BillingPage',
    EVENT_PAGE = 'EventListPage',
    CONTRACT_LIST_PAGE = 'ContractListPage',
    CANDIDATE_LIST_PAGE = 'CandidateListPage',
    CANDIDATE_DETAIL_PAGE = 'CandidateDetailPage',
    REQUEST_ASSET_LIST_PAGE = 'RequestAssetListPage',
    UPDATE_REQUEST_ASSET_PAGE = 'RequestAssetUpdatePage',
    CREATE_REQUEST_ASSET_PAGE = 'CreateRequestAssetPage',
    CREATE_CONTRACT_PAGE = 'CreateContractPage',
    UPDATE_CONTRACT_PAGE = 'UpdateContractPage',
    CREATE_EVENT_PAGE = 'CreateEventPage',
    UPDATE_EVENT_PAGE = 'UpdateEventPage',
    ASSET_LIST_PAGE = 'AssetListPage',
    CREATE_ASSET_PAGE = 'CreateAssetPage',
    UPDATE_ASSET_PAGE = 'UpdateAssetPage',
    GENERAL_SETTINGS = 'GeneralSettings',
    PERMISSION_LIST_PAGE = 'PermissionListPage',
    TEAM_PAGE = 'TeamPage',
    UPDATE_TEAM_PAGE = 'UpdateTeamPage',
    CREATE_TEAM_PAGE = 'CreateTeamPage',
    NOT_FOUND = 'PageNotFound',
}

export enum OrderDirection {
    ASC = 'asc',
    DESC = 'desc',
}

export const Order = {
    ASC: {
        value: OrderDirection.ASC,
        label: 'Z - A',
    },
    DESC: {
        value: OrderDirection.DESC,
        label: 'A - Z',
    },
};

export const INPUT_TEXT_MAX_LENGTH = 255;
export const INPUT_PHONE_MAX_LENGTH = 11;

// eslint-disable-next-line no-useless-escape
export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,20}$/;

export const PHONE_NUMBER_REGEX = /^([0-9]){10,11}$/;

export const URL_REGEX_CV =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

export const BIRTHDAY_MIN_DATE = '1800-01-01 00:00:00';

export const USER_LIMIT = 40;

export enum SupportLanguage {
    EN = 'en',
    VI = 'vi',
}
export const DEFAULT_ORDER_BY = 'createdAt';
export const DEFAULT_ORDER_DIRECTION = OrderDirection.DESC;

export const SIDEBAR_ARRAY = ['asset', 'requestAsset', 'user', 'timeKeeping', 'role'];

export enum ModuleName {
    USER = 'user',
    CONTRACT = 'contract',
    TIME_KEEPING = 'timeKeeping',
    ASSET = 'asset',
    EVENT = 'event',
    RECRUITMENT = 'recruitment',
    BILLING = 'billing',
    ROLE = 'role',
    REQUEST_ASSET = 'requestAsset',
    REQUEST_ABSENCE = 'requestAbsence',
    GENERAL_SETTINGS = 'generalSettings',
    PERMISSION = 'permission',
    DASHBOARD_PAGE = 'dashboard',
    TEAM = 'team',
}

export enum SpecialPage {
    PROFILE_PAGE = 'profile',
    NOT_FOUND = '404',
}

export const timezone = 'Asia/Ho_Chi_Minh';

export const TEXTAREA_REGEX = /^.{0,2000}$/;

export const TEXT_REGEX = /^.{0,255}$/;

export const URL_REGEX =
    /^https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/;

export const LIMIT_PER_PAGE = 10;

export const NUMBER_REGEX = /^(?:[0-9]\d*|)$/;
