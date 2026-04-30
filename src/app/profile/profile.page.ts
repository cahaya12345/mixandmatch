import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, chevronBack, closeCircleOutline, downloadOutline, sparklesOutline, arrowBackOutline } from 'ionicons/icons';

export interface OutfitItem {
  id: number;
  title: string;
  category: string;
  tags: string[];
  imageUrl: string;
  linkUrl?: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  searchQuery: string = '';
  isModalOpen: boolean = false;
  selectedOutfit: OutfitItem | null = null;
  displayOutfits: OutfitItem[] = [];

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

  constructor(public navCtrl: NavController, private modalCtrl: ModalController) {
    addIcons({ searchOutline, chevronBack, closeCircleOutline, downloadOutline, sparklesOutline, arrowBackOutline });
  }

  ngOnInit() {
    this.updateDisplayOutfits();
  }

  ionViewWillEnter() {
    this.updateDisplayOutfits();
  }

  updateDisplayOutfits() {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.displayOutfits = [...this.outfitList];
      return;
    }
    const lowerQuery = this.searchQuery.toLowerCase().trim();
    this.displayOutfits = this.outfitList.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) || 
      item.category.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  showOutfitDetails(outfit: OutfitItem) {
    this.selectedOutfit = outfit;
    this.isModalOpen = true;
  }

  closeOutfitDetails() {
    this.isModalOpen = false;
    setTimeout(() => {
      this.selectedOutfit = null;
    }, 300);
  }

  trackById(index: number, item: OutfitItem) {
    return item.id;
  }
}
