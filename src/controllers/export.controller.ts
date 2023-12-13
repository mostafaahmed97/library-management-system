import { NextFunction, Request, Response } from 'express';

import { ExportFormats } from '../types';
import { ExportService } from '../services/export.service';
import { injectable } from 'tsyringe';

@injectable()
export class ExportController {
  private exportService: ExportService;

  constructor(exportService: ExportService) {
    this.exportService = exportService;
  }

  borrowings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const fileFormat = req.query.format as ExportFormats;
      const startDate = req.query.startDate as string;
      const endDate = req.query.endDate as string;

      const result = await this.exportService.createExport({
        startDate,
        endDate,
        fileFormat,
      });

      return res.download('Exporting!');
    } catch (error) {
      return next(error);
    }
  };

  borrowingsLastMonth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.send('Exporting!');
    } catch (error) {
      return next(error);
    }
  };

  borrowingsLastMonthOverdue = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.send('Exporting!');
    } catch (error) {
      return next(error);
    }
  };
}
