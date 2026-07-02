import { Component, signal, computed } from '@angular/core';
import { Header } from '../header/header';
import { RestaurantList } from '../restaurant-list/restaurant-list';
import { Footer } from '../footer/footer';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-apps',
  imports: [Header, RestaurantList, Footer],
  templateUrl: './apps.html',
  styleUrls: ['./apps.css'],
})
export class Apps {
  restaurants = signal<Restaurant[]>([
    { id: 1, name: 'Le Calao Doré', district: 'Akwa', specialty: 'Ndolé aux crevettes', currentRating: 0, image: 'assets/images/restaurants/restaurant1.jpg' },
    { id: 2, name: 'Chez Madame Ngono', district: 'Bonapriso', specialty: 'Eru aux pieds de bœuf', currentRating: 0, image: 'assets/images/restaurants/restaurant2.jpg' },
    { id: 3, name: 'La Fourchette Camerounaise', district: 'Bonanjo', specialty: 'Poulet DG', currentRating: 0, image: 'assets/images/restaurants/restaurant3.jpg' },
    { id: 4, name: 'Saveurs du Wouri', district: 'Bonamoussadi', specialty: 'Poisson braisé', currentRating: 0, image: 'assets/images/restaurants/restaurant4.jpg' },
    { id: 5, name: "L'Akwa Gourmand", district: 'Akwa', specialty: 'Bobolo et sauce arachide', currentRating: 0, image: 'assets/images/restaurants/restaurant5.jpg' },
    { id: 6, name: 'Le Royal de Bali', district: 'Bali', specialty: 'Koki et plantain', currentRating: 0, image: 'assets/images/restaurants/restaurant6.jpg' }
  ]);

  // nombre de restaurants notés (>=1)
  readonly ratedCount = computed(() => this.restaurants().filter(r => (r.currentRating ?? 0) > 0).length);

  // average rating of rated restaurants (one decimal), 0 if none
  readonly averageRating = computed(() => {
    const rated = this.restaurants().filter(r => (r.currentRating ?? 0) > 0);
    if (rated.length === 0) return 0;
    const sum = rated.reduce((s, r) => s + (r.currentRating ?? 0), 0);
    return Math.round((sum / rated.length) * 10) / 10;
  });

  // filter toggle: show only restaurants rated >=4
  filterHigh = signal(false);

  // displayed restaurants: optionally filtered and sorted by rating desc
  readonly displayedRestaurants = computed(() => {
    let list = this.restaurants().slice();
    if (this.filterHigh()) {
      list = list.filter(r => (r.currentRating ?? 0) >= 4);
    }
    list.sort((a, b) => (b.currentRating ?? 0) - (a.currentRating ?? 0));
    return list;
  });

  // méthode minimale pour recevoir l'event (sera utilisée plus tard)
  onRestaurantRated(payload: { id: number; rating: number }) {
    this.restaurants.update(list =>
      list.map(r => (r.id === payload.id ? { ...r, currentRating: payload.rating } : r))
    );
  }
}
