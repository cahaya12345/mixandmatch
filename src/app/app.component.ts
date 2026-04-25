import { Component } from '@angular/core';
import { IonicModule, Platform } from '@ionic/angular';
import { CommonModule, Location } from '@angular/common';
import { App } from '@capacitor/app';

import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonApp, IonRouterOutlet, CommonModule],
})
export class AppComponent {
  constructor(private platform: Platform, private location: Location) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
        const currentPath = this.location.path();
        
        // Jika sedang di halaman utama, keluar dari aplikasi
        if (currentPath === '/home' || currentPath === '') {
          App.exitApp();
        } else {
          // Biarkan navigasi mundur standar Ionic berjalan untuk halaman lain
          processNextHandler();
        }
      });
    });
  }
}