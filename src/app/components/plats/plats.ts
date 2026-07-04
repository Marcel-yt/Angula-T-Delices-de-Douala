import { Component, inject, signal, computed, effect, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuService } from '../../services/menu-service';
import type { Plats as Plat } from '../../models/plats';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-plats',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plats.html',
  styleUrls: ['./plats.css'],
})
export class Plats {
  private menu = inject(MenuService);
  readonly platsResource = this.menu.platsResource;
  readonly category = signal<'Toutes'|'Plats'|'Grillades'|'Végétarien'|'Boissons'>('Toutes');
  readonly search = signal('');
  readonly restaurantFilter = signal<'Tous'|string>('Tous');

  readonly plats = computed<Plat[]>(() => this.platsResource.value() ?? []);


  // derive list of restaurants for the filter dropdown
  readonly restaurantsList = computed(() => {
    const list = this.plats();
    const names = Array.from(new Set(list.map(p => p.restaurantNom ?? '—')));
    return ['Tous', ...names];
  });

  // apply category + search + restaurant filter
  readonly filteredPlats = computed<Plat[]>(() => {
    const list = this.plats();
    let out = list;
    if (this.category() !== 'Toutes') out = out.filter(p => p.categorie === this.category());
    const q = this.search().trim().toLowerCase();
    if (q) out = out.filter(p => p.nom.toLowerCase().includes(q));
    if (this.restaurantFilter() && this.restaurantFilter() !== 'Tous') {
      out = out.filter(p => (p.restaurantNom ?? '—') === this.restaurantFilter());
    }
    return out;
  });

  // plat du jour rotation every 5s
  private readonly tick = toSignal(interval(5000), { initialValue: 0 });
  readonly rotationPaused = signal(false);
  private readonly currentIndex = signal(0);

  // advance index on tick when not paused
  constructor() {
    // diagnostic log to confirm component initialization in browser
    console.debug('Plats component initializing');
    effect(() => {
      this.tick(); // depend on tick only
      if (!this.rotationPaused()) {
        const list = this.filteredPlats();
        if (!list || list.length === 0) return;
        // use untracked to read currentIndex without creating a dependency
        // (avoids infinite loop: writing currentIndex would retrigger this effect)
        const cur = untracked(() => this.currentIndex());
        this.currentIndex.set((cur + 1) % list.length);
      }
    });

    // reset index when filtered list changes (category/search/restaurant)
    effect(() => {
      this.filteredPlats(); // track filteredPlats only
      untracked(() => this.currentIndex.set(0));
    });
  }

  readonly platDuJour = computed<Plat | undefined>(() => {
    const list = this.filteredPlats();
    if (!list || list.length === 0) return undefined;
    const idx = Math.min(this.currentIndex(), Math.max(0, list.length - 1));
    return list[idx];
  });

  onImgError(e: Event) {
    const img = e.target as HTMLImageElement;
    if (img && img.src && !img.dataset['fallback']) {
      img.dataset['fallback'] = '1';
      img.src = '/assets/images/plats/plat1.jpg';
    }
  }
}
