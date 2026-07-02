import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apps } from './components/apps/apps';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Apps],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('delices-de-douala');
}
