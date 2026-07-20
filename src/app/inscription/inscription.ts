import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule, JsonPipe],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})

export class Inscription {
  user: User = {
    id: '',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: ''
  };
  motDePasse2 = '';

  readonly users = signal<User[]>([]);
  private readonly _indexEdite = signal<number | null>(null);
  readonly enEdition = computed(() => this._indexEdite() !== null);

  enregistrer(): void {
    const nomVal = this.user.nom.trim();
    const prenomVal = this.user.prenom.trim();
    const emailVal = this.user.email.trim();
    const passVal = this.user.motDePasse.trim();
    const pass2Val = this.motDePasse2.trim();

    if (!nomVal || !prenomVal || !emailVal || !passVal || !pass2Val || passVal !== pass2Val) {
      return;
    }

    const i = this._indexEdite();
    if (i === null) {
      // Add mode
      const newUser: User = {
        id: Date.now().toString(),
        nom: nomVal,
        prenom: prenomVal,
        email: emailVal,
        motDePasse: passVal
      };
      this.users.update(list => [...list, newUser]);
    } else {
      // Edit mode
      this.users.update(list =>
        list.map((u, idx) => (idx === i ? { ...this.user, id: u.id } : u))
      );
      this._indexEdite.set(null);
    }
    this.resetForm();
  }

  modifier(i: number): void {
    const selectedUser = this.users()[i];
    this.user = { ...selectedUser };
    this.motDePasse2 = selectedUser.motDePasse;
    this._indexEdite.set(i);
  }

  supprimer(i: number): void {
    this.users.update(list => list.filter((_, idx) => idx !== i));
    if (this._indexEdite() === i) {
      this._indexEdite.set(null);
      this.resetForm();
    }
  }

  soumetre(): void {
    this.enregistrer();
  }

  private resetForm(): void {
    this.user = {
      id: '',
      nom: '',
      prenom: '',
      email: '',
      motDePasse: ''
    };
    this.motDePasse2 = '';
  }
}


// export class Inscription {
//   nom = '';

// // dans la classe — la liste des clients (état applicatif) 
// private readonly _clients = signal<string[]>([]); 
// readonly clients = this._clients.asReadonly(); 

// // dans la classe — suit la ligne en cours de modification 
// private readonly _indexEdite = signal<number | null>(null); 
// readonly enEdition = computed(() => this._indexEdite() !== null);

// enregistrer(): void {     //Enregistrer (ajouter ou modifier) 
//   const valeur = this.nom.trim(); 
//   if (!valeur) return; 
  
//   const i = this._indexEdite(); 
//   if (i === null) { 
//     this._clients.update((l) => [...l, valeur]);          // ajout 
//   } else { 
//     this._clients.update((l) => 
//       l.map((c, idx) => (idx === i ? valeur : c)));         // modification 
//     this._indexEdite.set(null); 
//   } 
//   this.nom = '';                                            // vider le champ 
// } 

// modifier(i: number): void { 
// this.nom = this.clients()[i];   //Modifier- recharge la ligne dans le champ
// this._indexEdite.set(i); 
// }

// supprimer(i: number): void {    //Supprimer- supprime la ligne de la liste
// this._clients.update((l) => l.filter((_, idx) => idx !== i)); 
// }
// }
