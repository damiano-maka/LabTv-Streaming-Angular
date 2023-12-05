import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  public open(): void {
    this.loader$.next(true);
  }

  public close(): void {
    this.loader$.next(false);
  }
}
