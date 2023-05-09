import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PendingDocumentsService } from './pending-documents.service';
import { PendingDocumentsResolver } from './pending-documents.resolver';

@Module({
  imports: [HttpModule],
  providers: [PendingDocumentsService, PendingDocumentsResolver],
  exports: [PendingDocumentsService],
})
export class PendingDocumentsModule {}
