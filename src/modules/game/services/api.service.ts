import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class ExampleService extends BaseService {}
export const exampleService = new ExampleService({ baseUrl: '/' }, service);
