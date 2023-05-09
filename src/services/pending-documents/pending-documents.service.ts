import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { PendingDocument } from './entities/pending-document.entity';
import { ResolveReference } from '@nestjs/graphql';

@Injectable()
export class PendingDocumentsService {
  private readonly logger = new Logger(PendingDocumentsService.name);

  constructor(private readonly httpService: HttpService) {}

  baseURL = 'http://localhost:4001';

  async findPendingDocumentsByCustomerId(
    id: string,
  ): Promise<PendingDocument[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<PendingDocument[]>(
          `${this.baseURL}/pending-documents?customerId=${id}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  async findAllAccounts(): Promise<PendingDocument[]> {
    const { data } = await firstValueFrom(
      this.httpService
        .get<PendingDocument[]>(`${this.baseURL}/pending-documents`)
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; customerId: string }) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<PendingDocument[]>(
          `${this.baseURL}/pending-documents?customerId=${reference.customerId}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw 'An error happened!';
          }),
        ),
    );
    return data;
  }
}
