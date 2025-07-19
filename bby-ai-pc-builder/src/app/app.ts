import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BbyAiBuilder } from './bby-ai-builder/bby-ai-builder';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    BbyAiBuilder
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('bby-ai-pc-builder');
}
