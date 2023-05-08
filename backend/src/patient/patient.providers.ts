import { Mongoose } from 'mongoose';
import { PatientSchema } from './schemas/patient.schema';

export const patientProviders = [
  {
    provide: 'PATIENT_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Patient', PatientSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];