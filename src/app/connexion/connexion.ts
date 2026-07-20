import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-connexion',
  imports: [FormsModule],
  templateUrl: './connexion.html',
  styleUrl: './connexion.css',
})
export class Connexion {
  credentials: Pick<User, 'email' | 'motDePasse'> = {
    email: '',
    motDePasse: ''
  };

  connecter(): void {
    console.log('Connexion tentée pour :', this.credentials.email);
    // Logique de connexion (ex. vérifier les identifiants)
  }
}
