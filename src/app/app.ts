import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Apps } from './components/apps/apps';
import { Inscription } from "./inscription/inscription";
import { Connexion } from "./connexion/connexion";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Apps, Inscription, Connexion],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('delices-de-douala');
}
