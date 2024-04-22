// floor.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FloorService {
  private floorDetailsSubject = new BehaviorSubject<any[]>([]);
  floorDetails$: Observable<any[]> = this.floorDetailsSubject.asObservable();

  addFloorDetails(floorDetails: any) {
    const currentDetails = this.floorDetailsSubject.value;
    this.floorDetailsSubject.next([...currentDetails, floorDetails]);
  }
}
