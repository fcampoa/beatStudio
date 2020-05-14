import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class EventsService {
  event: BehaviorSubject<any>;

  constructor() {
    this.event = new BehaviorSubject<any>('');
  }

public getEvent(): Observable<any> {
  return this.event.asObservable();
}

public set setEvent(value: any) {
  this.event.next(value);
}
}
