import { Routes } from "@angular/router";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { PokemonComponent } from "../pokemon/pokemon.component";

export const LayoutRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pokemon', component: PokemonComponent}
]
