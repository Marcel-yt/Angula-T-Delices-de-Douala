export interface Plats {
	id: string;
	nom: string;
	prix: number; // en FCFA
	categorie: 'Plats' | 'Grillades' | 'Végétarien' | 'Boissons';
	disponible: boolean;
	restaurantId?: string;
	restaurantNom?: string;
	image?: string;
}
