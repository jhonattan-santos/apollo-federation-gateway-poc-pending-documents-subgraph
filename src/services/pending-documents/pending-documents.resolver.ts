import { NotFoundException } from '@nestjs/common';
import {
  Args,
  Parent,
  Query,
  ResolveField,
  ResolveReference,
  Resolver,
} from '@nestjs/graphql';
import { PendingDocumentsService } from './pending-documents.service';
import { PendingDocument } from './entities/pending-document.entity';

@Resolver((of) => PendingDocument)
export class PendingDocumentsResolver {
  constructor(
    private readonly pendingDocumentsService: PendingDocumentsService,
  ) {}

  @Query((returns) => [PendingDocument])
  async pendingDocuments(@Args('id') id: string): Promise<PendingDocument[]> {
    const pendingDocument =
      await this.pendingDocumentsService.findPendingDocumentsByCustomerId(id);
    if (!pendingDocument) {
      throw new NotFoundException(id);
    }
    return pendingDocument;
  }

  @Query((returns) => [PendingDocument])
  async allPendingDocuments(): Promise<PendingDocument[]> {
    return await this.pendingDocumentsService.findAllAccounts();
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; customerId: string }) {
    const pendingDocument =
      await this.pendingDocumentsService.findPendingDocumentsByCustomerId(
        reference.customerId,
      );
    if (!pendingDocument) {
      throw new NotFoundException(reference.customerId);
    }
    return pendingDocument[0];
  }
}
