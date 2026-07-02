import { Component, input, output, signal } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-star-rating',
  imports: [],
  templateUrl: './star-rating.html',
  styleUrls: ['./star-rating.css'],
})
export class StarRating {
  // reçoit la note actuelle (0 si pas noté)
  readonly currentRating = input<number>();
  // émet la nouvelle note
  readonly ratingChanged = output<number>();

  private hover = signal(0);

  onHover(index: number) {
    this.hover.set(index);
  }

  onLeave() {
    this.hover.set(0);
  }

  setRating(index: number) {
    const current = this.currentRating() ?? 0;
    // toggle: clicking the same star removes the rating
    const toEmit = index === current ? 0 : index;
    this.ratingChanged.emit(toEmit);
  }

  isFilled(index: number) {
    const h = this.hover();
    const base = h > 0 ? h : (this.currentRating() ?? 0);
    return index <= base;
  }
}
