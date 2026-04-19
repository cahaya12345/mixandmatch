import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, chevronBack, closeCircleOutline, downloadOutline, sparklesOutline } from 'ionicons/icons';

export interface OutfitItem {
  id: number;
  title: string;
  category: string;
  tags: string[];
  imageUrl: string;
  linkUrl?: string; // Tambahkan properti link untuk diklik
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  searchQuery: string = ''; // FIX ERROR: Deklarasikan properti searchQuery
  isModalOpen: boolean = false;
  isGenerating: boolean = false;
  selectedOutfit: OutfitItem | null = null;
  generatedImageUrl: string = '';

  outfitList: OutfitItem[] = [
    { 
      id: 1, title: 'Korean Y2K Baggy', category: 'Streetwear', tags: ['korean', 'casual', 'oversized', 'streetwear', 'y2k'], 
      imageUrl: 'assets/images/ai_korean_y2k_1776500625555.png',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=korean%20streetwear%20boy%20baggy'
    },
    { 
      id: 2, title: 'Dark Acubi Fashion', category: 'Acubi', tags: ['acubi', 'dark', 'subversive', 'gen z'], 
      imageUrl: 'assets/images/ai_dark_acubi_1776500642255.png',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=acubi%20fashion%20boy'
    },
    { 
      id: 3, title: 'Y2K Crop Top & Baggy', category: 'Womenswear', tags: ['y2k', 'crop top', 'baggy jeans', 'girl', 'aesthetic'], 
      imageUrl: 'assets/images/ai_girl_stripe_zip.png',
      linkUrl: ''
    },
    { 
      id: 4, title: 'Jersey & Jorts Style', category: 'Minimalist', tags: ['jorts', 'jersey', '90s', 'aesthetic'], 
      imageUrl: 'assets/images/ai_jersey_jorts_1776500747621.png',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=soft%20boy%20earth%20tone%20outfit'
    },
    { 
      id: 5, title: 'All Black Streetwear', category: 'Streetwear', tags: ['dark', 'edgy', 'black', 'leather', 'chains'], 
      imageUrl: 'assets/images/ai_y2k_subversive_1776500854028.png',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=all%20black%20streetwear%20boy'
    },
    { 
      id: 6, title: 'Utility Outdoor Tech', category: 'Gorpcore', tags: ['gorpcore', 'techwear', 'urban', 'casual'], 
      imageUrl: 'assets/images/ai_camo_bgy_1776500801640.png',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=gorpcore%20fashion%20men'
    },
    { 
      id: 7, title: 'Cargo Girl Y2K', category: 'Womenswear', tags: ['y2k', 'cargo', 'girl', 'streetwear', 'aesthetic'], 
      imageUrl: 'assets/images/ai_girl_black_tank.png',
      linkUrl: ''
    },
    { 
      id: 8, title: 'Layered Acubi Girl', category: 'Womenswear', tags: ['casual', 'minimalist', 'dark', 'girl', 'acubi'], 
      imageUrl: 'assets/images/ai_girl_layered_tee.png',
      linkUrl: ''
    }
  ];

  constructor(private toastController: ToastController) {
    addIcons({ searchOutline, chevronBack, closeCircleOutline, downloadOutline, sparklesOutline });
  }

  ngOnInit() {
  }

  // Getter: filter daftar outfit berdasarkan kata kunci (mencari ke judul, kategori, atau tags)
  get filteredOutfits() {
    if (!this.searchQuery) {
      return this.outfitList;
    }
    const lowerQuery = this.searchQuery.toLowerCase();
    return this.outfitList.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.category.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // Fungsi untuk update query secara langsung saat user mengetik
  handleInput(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
  }

  // Fungsi saat sebuah kartu di klik
  async showOutfitDetails(outfit: OutfitItem) {
    this.selectedOutfit = outfit;
    this.isModalOpen = true;
    this.isGenerating = true;
    
    // Simulasi waktu loading untuk AI Generator
    setTimeout(() => {
      this.isGenerating = false;
      this.generatedImageUrl = outfit.imageUrl; 
    }, 2000); // Kurangi waktu loading agar lebih snappy
  }

  // Tutup Modal AI
  closeModal() {
    this.isModalOpen = false;
    setTimeout(() => {
      this.selectedOutfit = null;
      this.generatedImageUrl = '';
    }, 300);
  }
}
