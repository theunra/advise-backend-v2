import { Body, Controller, Get, Param, Post, Res, Sse } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Response } from 'express';
import { DeviceService } from './device.service';
import { CreateDeviceDataDto } from './dtos/create-device-data.dto';

@Controller('device')
export class DeviceController {
    constructor(
        private readonly deviceService: DeviceService
    ) {}

    @Post(':device_id/data/create')
    async createDeviceData(
        @Param('device_id') deviceId: string,
        @Body() createDeviceDataDto: CreateDeviceDataDto,
    ) {
        console.log(`create device ${deviceId} data with :`);
        console.log(createDeviceDataDto); 
        
        return this.deviceService.createDeviceData(deviceId, createDeviceDataDto);
    }

    @Sse(':device_id/data/listen')
    async listenDeviceData(
        @Res() response: Response,
        @Param('device_id') deviceId: string,
    ) {
        console.log(`sse req device id ${deviceId}`);
        return this.deviceService.listenDeviceData(response, deviceId);
    }
}
