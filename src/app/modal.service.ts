import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private showModalSource = new Subject<{ isOpen: boolean, type?: string }>();
  showModal$: Observable<{ isOpen: boolean, type?: string }> = this.showModalSource.asObservable();

  constructor( private zone: NgZone) { }

  openModal(type: string) {
    this.zone.run(() => {
      this.showModalSource.next({ isOpen: true, type });
    });
  }

  closeModal() {
    this.showModalSource.next({ isOpen: false });
  }

  getType(): Observable<string | undefined> {
    return this.showModal$.pipe(map(state => state.type));
  }
}
