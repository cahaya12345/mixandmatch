import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { camera, person, home, images, sparkles, scanCircleOutline, colorWandOutline } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  imageSource: any;
  outfitScore: number | null = null;
  feedback: string = '';

  constructor(private router: Router) {
    // Registrasi ikon dengan key string agar aman di Vercel
    addIcons({ 
      'camera': camera, 
      'person': person, 
      'home': home, 
      'images': images, 
      'sparkles': sparkles, 
      'scan-circle-outline': scanCircleOutline, 
      'color-wand-outline': colorWandOutline 
    });
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false, 
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt 
      });
      this.imageSource = image.webPath;
      this.analyzeOutfit();
    } catch (error) {
      console.log('User membatalkan ambil foto');
    }
  }

  analyzeOutfit() {
    const randomScore = Math.floor(Math.random() * (100 - 70 + 1)) + 70; 
    this.outfitScore = randomScore;
    if (randomScore >= 90) {
      this.feedback = "Wah! Mix & Match kamu sempurna banget.";
    } else {
      this.feedback = "Cukup bagus, tapi coba cek lagi kombinasinya!";
    }
  }
}