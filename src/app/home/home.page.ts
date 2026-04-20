import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
import { camera, person, home, images, sparkles, scanCircleOutline, colorWandOutline } from 'ionicons/icons';
import { ProfilePage } from '../profile/profile.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ProfilePage]
})
export class HomePage {
  imageSource: any;
  outfitScore: number | null = null;
  feedback: string = '';

  constructor(private modalCtrl: ModalController) {
    addIcons({ camera, person, home, images, sparkles, scanCircleOutline, colorWandOutline });
  }

  async goToProfile() {
    const modal = await this.modalCtrl.create({
      component: ProfilePage,
      cssClass: 'profile-modal'
    });
    await modal.present();
  }

  // Kembali menggunakan Capacitor Native Camera secara simpel
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