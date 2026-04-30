import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { addIcons } from 'ionicons';
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
  isAnalyzing: boolean = false;

  constructor(private navCtrl: NavController) {
    // Registrasi semua ikon agar tidak error saat render
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

  // Fungsi navigasi ke profil (agar error TS2339 hilang)
  goToProfile() {
    this.navCtrl.navigateForward('/profile');
  }

  // Fungsi ambil foto
  async takePicture() {
    try {
      // Meminta izin akses kamera secara eksplisit untuk Android 13+ (SDK 33)
      const permissions = await Camera.requestPermissions();
      if (permissions.camera !== 'granted' && permissions.camera !== 'limited') {
         console.warn('Izin kamera ditolak');
         return;
      }

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false, 
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt 
      });
      this.imageSource = image.webPath;
      
      // Jalankan analisis warna setelah foto diambil
      this.analyzeOutfitColor(image.webPath!);
    } catch (error) {
      console.log('User membatalkan ambil foto atau terjadi error:', error);
    }
  }

  // Fungsi ekstraksi warna menggunakan Canvas
  analyzeOutfitColor(imageUrl: string) {
    this.isAnalyzing = true;
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      // Ukuran canvas kecil saja untuk performa
      canvas.width = 50;
      canvas.height = 50;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, 50, 50);
        
        // Mengambil data pixel di area tengah gambar
        const imageData = ctx.getImageData(10, 10, 30, 30).data;
        
        let r = 0, g = 0, b = 0;
        for (let i = 0; i < imageData.length; i += 4) {
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
        }
        
        const count = imageData.length / 4;
        const avgR = Math.floor(r / count);
        const avgG = Math.floor(g / count);
        const avgB = Math.floor(b / count);

        this.calculateScore(avgR, avgG, avgB);
      }
      this.isAnalyzing = false;
    };
  }

  // Logika pemberian skor berdasarkan saturasi warna
  calculateScore(r: number, g: number, b: number) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;

    let score = 0;

    // Jika warna cenderung netral/monokrom (Saturasi rendah)
    if (saturation < 0.25) {
      score = Math.floor(Math.random() * (98 - 92 + 1)) + 92;
      this.feedback = "Outfit monokrom kamu terlihat sangat berkelas dan rapi!";
    } 
    // Jika warna cukup cerah
    else if (saturation >= 0.25 && saturation < 0.6) {
      score = Math.floor(Math.random() * (91 - 85 + 1)) + 85;
      this.feedback = "Kombinasi warna yang berani! Kamu terlihat stand out.";
    } 
    // Jika warna terlalu kontras/sangat jreng
    else {
      score = Math.floor(Math.random() * (84 - 75 + 1)) + 75;
      this.feedback = "Warna yang sangat ekspresif! Pastikan pencahayaannya pas ya.";
    }

    this.outfitScore = score;
  }
}