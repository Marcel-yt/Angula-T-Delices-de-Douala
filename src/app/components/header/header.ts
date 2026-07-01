import { Component, input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  // Reçoit le nombre de restos notés (valeur primitive)
  readonly ratedCount = input<number | undefined>();
}
