import { BorrowingExport, ExportFormats } from '../types';

import { Borrowing } from '../db/entity';
import { BorrowingRepository } from '../db';
import { BorrowingService } from './borrowing.service';
import { Workbook } from 'exceljs';
import { injectable } from 'tsyringe';

@injectable()
export class ExportService {
  private borrowingService: BorrowingService;

  async createExport({
    startDate,
    endDate,
    fileFormat,
  }: {
    startDate: string;
    endDate: string;
    fileFormat: ExportFormats;
  }) {
    const borrowings = await this.borrowingService.getInDateRange(
      startDate,
      endDate
    );

    const formattedForExport: BorrowingExport[] = borrowings.map(b => ({
      id: b.id,
      status: b.status,
      bookName: b.book.title,
      borrowerName: b.borrower.name,
      borrowerEmail: b.borrower.email,
      borrowedOn: b.createdAt.toString(),
      dueDate: b.dueDate.toString(),
    }));

    let result: Workbook | string;

    switch (fileFormat) {
      case 'csv':
        result = 'sth';
        break;
      case 'xlsx':
        result = this.writeToExcel(formattedForExport);
        break;
      default:
        throw new Error('No available writer');
    }

    return result;
    console.log({ fileFormat });
  }

  private async writeToCsv(data: BorrowingExport[]) {}

  private writeToExcel(data: BorrowingExport[]) {
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet('');
    data.forEach(row => sheet.addRow(row));
    return workbook;
  }
}
