import {shareReplay, filter, tap, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import {Observable, BehaviorSubject} from "rxjs";



@Injectable()
export class RouterExtService {

    private subject = new BehaviorSubject<string>('/');
    currentURL$: Observable<string> = this.subject.asObservable().pipe(filter(url => !!url));
    private previousUrl:Observable<string> | undefined;

    

    constructor(private router : Router) {
        router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              this.previousUrl = this.currentURL$;
              this.subject.next(event.url ? event.url : '/');
            };
        });
    }
    
    public getPreviousUrl(){
        return this.previousUrl;
    } 
}