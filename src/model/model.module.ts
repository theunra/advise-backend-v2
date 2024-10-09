import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Condition } from 'src/device/entities/condition.entity';
import { Device } from 'src/device/entities/device.entity';
import { Sensor } from 'src/device/entities/sensor.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        database: configService.getOrThrow('DB_NAME'),
        synchronize: configService.getOrThrow('DB_SYNC'),
        // entities: ['../**/*.entity{.ts,.js}'],
        entities: [
            User,
            Sensor,
            Condition,
            Device
        ],
        migrations: ['../../database/migrations/*'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ModelModule {}