import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Response } from 'express';
import { CreateDeviceDataDto } from './dtos/create-device-data.dto';

@Injectable()
export class DeviceService {
    private listenDeviceDataSubjects : Map<string, Subject<MessageEvent>[]> = new Map();

    createDeviceData(deviceId : string, createDeviceDataDto : CreateDeviceDataDto) {
        const listenSubjects = this.listenDeviceDataSubjects.get(deviceId);

        if(listenSubjects)
        {
            listenSubjects.forEach((subject) => {
                subject.next({data: createDeviceDataDto} as MessageEvent);
            });
        }

        
    }
    listenDeviceData(response : Response, deviceId : string) {
        const listenDeviceDataSubject = new Subject<MessageEvent>();

        if(this.listenDeviceDataSubjects.has(deviceId)){
            const subjects = this.listenDeviceDataSubjects.get(deviceId);

            subjects.push(listenDeviceDataSubject);
        } 
        else {
            const subjects : Subject<MessageEvent> []= [];
            subjects.push(listenDeviceDataSubject);

            this.listenDeviceDataSubjects.set(deviceId, subjects);
        }
        
        response.on('close', ()=>{
            const subjects = this.listenDeviceDataSubjects.get(deviceId);
            const new_subjects = subjects.filter(value => value != listenDeviceDataSubject);

            this.listenDeviceDataSubjects.set(deviceId, new_subjects);
            
            console.log(`subjects at  id ${deviceId} is ${this.listenDeviceDataSubjects.get(deviceId).length} `)
            console.log(`sse resp device id ${deviceId} closed`);
        });

        return listenDeviceDataSubject.pipe();
    }
}
