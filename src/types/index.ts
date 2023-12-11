export interface Paginated<T> {
  data: Array<T>;
  page: number;
  limit: number;
  total: number;
}
