import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket?: Socket;                 // ← peut rester undefined côté serveur
  private entry$ = new Subject<any>();
  private exit$  = new Subject<any>();

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    /* Ouvrir la connexion uniquement dans le navigateur */
    if (isPlatformBrowser(platformId)) {
      this.socket = io('http://localhost:3000');

      this.socket.on('carEntry', (d) => this.entry$.next(d));
      this.socket.on('carExit',  (d) => this.exit$.next(d));
    }
  }

  /* Observables exposés au composant */
  onCarEntry(): Observable<any> { return this.entry$.asObservable(); }
  onCarExit():  Observable<any> { return this.exit$.asObservable(); }
}
