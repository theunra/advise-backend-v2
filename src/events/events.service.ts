import { Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { Response } from 'express';


@Injectable()
export class EventsService {
    private eventListenerSubjects : Map<string, Subject<MessageEvent>[]> = new Map();

    emitEvent(userId : string, event : MessageEvent) {
        const listenSubjects = this.eventListenerSubjects.get(userId);

        if(listenSubjects)
        {
           return -1; //err 
        }

        listenSubjects.forEach((subject) => {
            subject.next(event);
        });
    }
    

    onConnectEventListener(response : Response, userId : string) {
        const eventListenerSubject = new Subject<MessageEvent>();

        if(this.eventListenerSubjects.has(userId)){
            const subjects = this.eventListenerSubjects.get(userId);

            subjects.push(eventListenerSubject);
        } 
        else {
            const subjects : Subject<MessageEvent> []= [];
            subjects.push(eventListenerSubject);

            this.eventListenerSubjects.set(userId, subjects);
        }

        response.on('close', ()=>{
            const subjects = this.eventListenerSubjects.get(userId);
            const new_subjects = subjects.filter(value => value != eventListenerSubject);

            this.eventListenerSubjects.set(userId, new_subjects);
            
            console.log(`subjects at  id ${userId} is ${this.eventListenerSubjects.get(userId).length} `)
            console.log(`sse resp device id ${userId} closed`);
        });

        return eventListenerSubject.pipe();
    }

}
