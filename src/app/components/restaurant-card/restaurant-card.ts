import { Component, input, output } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { StarRating } from '../star-rating/star-rating';

@Component({
  standalone: true,
  selector: 'app-restaurant-card',
  imports: [StarRating],
  templateUrl: './restaurant-card.html',
  styleUrls: ['./restaurant-card.css'],
})
export class RestaurantCard {
  readonly restaurant = input<Restaurant | undefined>();
  readonly restaurantRated = output<{ id: number; rating: number }>();

  onRatingChanged(newRating: number) {
    const r = this.restaurant();
    if (!r) return;
    this.restaurantRated.emit({ id: r.id, rating: newRating });
  }
}
