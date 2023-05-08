import { Module } from '@nestjs/common';
import { PatientService } from './patient.service';
import { PatientController } from './patient.controller';
import { patientProviders } from './patient.providers';
import { DatabaseModule } from '../database/database.module';
@Module({
  imports: [DatabaseModule],
  controllers: [PatientController],
  providers: [PatientService,...patientProviders]
})
export class PatientModule {}
