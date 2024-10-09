import { Controller, Get, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Observable, Subject } from 'rxjs';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  index(@Res() response: Response) {
    response
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString());
  }

  @Sse('sse')
  sse(@Res() response: Response): Observable<MessageEvent> {
    console.log("sse triggered");

    const eventSubject = new Subject<MessageEvent>();
    
    const tm = setInterval(() => {
      eventSubject.next({ data: { hello: 'world' } } as MessageEvent);
    }, 1000);

    response.on('close', ()=>{
      clearInterval(tm);

      setTimeout(()=>{
        console.log('closed');
      }, 1000);
    });
    
    return eventSubject.pipe();
  }
}
