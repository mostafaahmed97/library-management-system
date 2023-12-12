import { ApiRouteConfig } from '../types';
import { setupRoutes as bookRoutes } from './book.routes';
import { setupRoutes as borrowerRoutes } from './borrower.routes';
import { setupRoutes as borrowingRoutes } from './borrowing.routes';

export const apiRoutes: ApiRouteConfig[] = [
  {
    path: 'books',
    generator: bookRoutes,
  },
  {
    path: 'borrowers',
    generator: borrowerRoutes,
  },
  {
    path: 'borrowings',
    generator: borrowingRoutes,
  },
];
