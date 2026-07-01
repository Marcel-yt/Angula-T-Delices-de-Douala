import { Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantCard } from '../restaurant-card/restaurant-card';

@Component({
  standalone: true,
  selector: 'app-restaurant-list',
  imports: [RestaurantCard],
  templateUrl: './restaurant-list.html',
  styleUrls: ['./restaurant-list.css'],
})
export class RestaurantList {
  readonly restaurants = input<Restaurant[] | undefined>();
  readonly restaurantRated = output<{ id: number; rating: number }>();

  forwardRated(payload: { id: number; rating: number }) {
    this.restaurantRated.emit(payload);
  }
}
