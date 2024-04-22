import { Controller, Get, Query, Res } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { Response } from 'express';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  streamFinanceData(
    @Res() response: Response,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    response.setHeader('Content-Type', 'application/json');
    return this.financeService.streamFinanceData(response, limit, offset);
  }

  @Get('/filter')
  streamFilteredFinanceData(
    @Res() response: Response,
    @Query('nrAgencia') nrAgencia?: string,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
  ) {
    response.setHeader('Content-Type', 'application/json');
    return this.financeService.streamFilteredFinanceData(
      response,
      nrAgencia,
      limit,
      offset,
    );
  }
}
