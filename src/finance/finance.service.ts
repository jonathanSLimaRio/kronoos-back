import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { parse } from 'csv-parse';
import { join } from 'path';
import { Response } from 'express';

@Injectable()
export class FinanceService {
  private readonly csvFilePath = join(
    __dirname,
    '..',
    '..',
    'src',
    'data',
    'data.csv',
  );

  streamFinanceData(
    response: Response,
    limit: number = 100,
    offset: number = 0,
  ) {
    response.write('[');
    const parser = createReadStream(this.csvFilePath).pipe(
      parse({
        columns: true,
        delimiter: ',',
        trim: true,
        skip_empty_lines: true,
      }),
    );

    let count = 0;
    let outputCount = 0;
    let started = false;
    parser.on('data', (data) => {
      if (count >= offset && outputCount < limit) {
        if (started) {
          response.write(',');
        }
        response.write(JSON.stringify(data));
        started = true;
        outputCount++;
      }
      count++;
      if (outputCount >= limit) {
        response.write(']');
        response.end();
        parser.destroy();
      }
    });

    parser.on('end', () => {
      if (!started) {
        response.write(']');
      }
      response.end();
    });

    parser.on('error', (error) => {
      console.error('Stream error:', error);
      if (!response.headersSent) {
        response.status(500).send(error.message);
      } else {
        response.end();
      }
    });
  }

  streamFilteredFinanceData(
    response: Response,
    nrAgencia?: string,
    limit: number = 100,
    offset: number = 0,
  ) {
    response.write('[');
    const parser = createReadStream(this.csvFilePath).pipe(
      parse({
        columns: true,
        delimiter: ',',
        trim: true,
        skip_empty_lines: true,
      }),
    );

    let count = 0;
    let outputCount = 0;
    let started = false;
    parser.on('data', (data) => {
      if (!nrAgencia || data.nrAgencia === nrAgencia) {
        if (count >= offset && outputCount < limit) {
          if (started) {
            response.write(',');
          }
          response.write(JSON.stringify(data));
          started = true;
          outputCount++;
        }
        count++;
      }
      if (outputCount >= limit) {
        response.write(']');
        response.end();
        parser.destroy();
      }
    });

    parser.on('end', () => {
      if (!started) {
        response.write(']');
      }
      response.end();
    });

    parser.on('error', (error) => {
      if (!response.headersSent) {
        response.status(500).send(error.message);
      } else {
        console.error('Stream error after headers sent:', error);
        response.end();
      }
    });
  }
}
