import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DeviceModule } from './device/device.module';
import { ModelModule } from './model/model.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule, 
    DeviceModule, 
    ModelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
