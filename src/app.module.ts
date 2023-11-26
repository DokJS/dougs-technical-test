import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SyncDataValidationModule } from './sync-data-validation/sync-data-validation.module';

@Module({
  imports: [SyncDataValidationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
