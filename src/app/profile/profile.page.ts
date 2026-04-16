import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { searchOutline, chevronBack } from 'ionicons/icons';

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

  outfitList: OutfitItem[] = [
    { 
      id: 1, title: 'Korean Y2K Baggy', category: 'Streetwear', tags: ['korean', 'casual', 'oversized', 'streetwear', 'y2k'], 
      imageUrl: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=korean%20streetwear%20boy%20baggy'
    },
    { 
      id: 2, title: 'Dark Acubi Fashion', category: 'Acubi', tags: ['acubi', 'dark', 'subversive', 'gen z'], 
      imageUrl: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=acubi%20fashion%20boy'
    },
    { 
      id: 3, title: 'Star Grunge Boy', category: 'Grunge', tags: ['denim', 'retro', 'streetwear', '2000s', 'star'], 
      imageUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=y2k%20grunge%20outfit%20boy'
    },
    { 
      id: 4, title: 'Soft Earth Tone Knit', category: 'Minimalist', tags: ['earth', 'soft boy', 'knit', 'aesthetic'], 
      imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=soft%20boy%20earth%20tone%20outfit'
    },
    { 
      id: 5, title: 'All Black Streetwear', category: 'Streetwear', tags: ['dark', 'edgy', 'black', 'leather', 'chains'], 
      imageUrl: 'https://images.unsplash.com/photo-1506152983158-b4a74a01c721?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=all%20black%20streetwear%20boy'
    },
    { 
      id: 6, title: 'Utility Outdoor Tech', category: 'Gorpcore', tags: ['gorpcore', 'techwear', 'urban', 'casual'], 
      imageUrl: 'https://images.unsplash.com/photo-1542062700-9b61ccbc1696?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=gorpcore%20fashion%20men'
    },
    { 
      id: 7, title: 'Retro 90s Vintage', category: 'Vintage', tags: ['retro', '90s', 'jacket', 'denim'], 
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=90s%20vintage%20aesthetic%20boy'
    },
    { 
      id: 8, title: 'Oversized Aesthetic', category: 'Korean Style', tags: ['casual', 'minimalist', 'white shirt', 'loose'], 
      imageUrl: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800&q=80',
      linkUrl: 'https://id.pinterest.com/search/pins/?q=korean%20boy%20oversize%20shirt'
    }
  ];

  constructor(private toastController: ToastController) {
    addIcons({ searchOutline, chevronBack });
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
    // Navigasikan pengguna ke link Pinterest referensi
    if (outfit.linkUrl) {
      window.open(outfit.linkUrl, '_blank');
    }
    
    const toast = await this.toastController.create({
      message: 'Membuka inspirasi gaya ' + outfit.title + '...',
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}
