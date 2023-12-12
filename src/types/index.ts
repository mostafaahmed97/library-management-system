import { Router } from 'express';

export interface Paginated<T> {
  data: Array<T>;
  page: number;
  limit: number;
  total: number;
}

export type ApiRouteConfig = {
  path: string;
  generator: () => Router;
};
