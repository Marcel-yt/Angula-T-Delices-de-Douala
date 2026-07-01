export interface Restaurant {
  id: number;
  name: string;
  district: string;
  specialty: string;
  currentRating: number; // 0 = non noté
  image?: string; // chemin relatif ou URL de l'image
}
