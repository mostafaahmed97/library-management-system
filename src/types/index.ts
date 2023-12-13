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

export type ExportFormats = 'csv' | 'xlsx';

export type BorrowingExport = {
  id: number;
  status: string;
  bookName: string;
  borrowerName: string;
  borrowerEmail: string;
  borrowedOn: string;
  dueDate: string;
};
