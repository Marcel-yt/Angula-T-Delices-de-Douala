import { Injectable } from '@angular/core';
import { httpResource } from '@angular/common/http';
import type { Plats } from '../models/plats';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MenuService {
	// httpResource overload accepts a function returning the URL
	readonly platsResource = httpResource<Plats[]>((ctx) => `${environment.apiBase}/plats.json`);
}
