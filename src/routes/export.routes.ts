import { ExportController } from '../controllers/export.controller';
import { Router } from 'express';
import { container } from 'tsyringe';
import { exportPayload } from '../validators';
import { validateRequest } from '../middleware';

export function setupRoutes() {
  const exportController = container.resolve(ExportController);

  const router = Router();

  router.get(
    '/borrowings',
    validateRequest(exportPayload, 'query'),
    exportController.borrowings
  );

  router.get(
    '/borrowings/last-month',
    validateRequest(exportPayload, 'query'),
    exportController.borrowingsLastMonth
  );

  router.get(
    '/borrowings/last-month-overdue',
    validateRequest(exportPayload, 'query'),
    exportController.borrowingsLastMonthOverdue
  );

  return router;
}
