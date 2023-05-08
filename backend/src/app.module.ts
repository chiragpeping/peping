import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PatientModule } from './patient/patient.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [ AuthModule, UsersModule, PatientModule,   ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
