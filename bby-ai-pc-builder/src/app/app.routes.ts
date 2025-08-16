import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./bby-ai-builder/bby-ai-builder').then(m => m.BbyAiBuilder)
    }
];
