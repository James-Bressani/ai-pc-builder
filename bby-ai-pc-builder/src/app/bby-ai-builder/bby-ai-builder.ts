import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bby-ai-builder',
  standalone: true, // This makes it a standalone component
  imports: [
    CommonModule, // Required for *ngIf
    FormsModule   // Required for [(ngModel)]
  ],
  templateUrl: './bby-ai-builder.html',
  styleUrl: './bby-ai-builder.scss'
})
export class BbyAiBuilder {
  // Properties to hold the form's state with default values
  public budget: number = 1000;
  public useCase: string = 'gaming';
  public gamingType: string = 'esports';
  public priority: string = 'optimized';

  public get budgetExplanation(): string {
    if (this.budget < 750) {
      return '$500 - $750: Entry-level system for 1080p gaming at medium settings and everyday tasks.';
    } else if (this.budget < 1500) {
      return '$750 - $1500: Solid 1080p high-settings gaming and smooth multitasking.';
    } else if (this.budget < 2500) {
      return '$1500 - $2500: Excellent for 1440p gaming and streaming or content creation.';
    } else if (this.budget < 3500) {
        return '$2500 - $3500: Top-tier performance for 4K gaming and professional workloads.';
    } else {
      return '$3500+: Maxed-out builds for uncompromising 4K gaming and demanding creative work.';
    }
  }

  /**
   * This method is called when the user clicks the submit button.
   * It gathers the current form data into a single object and logs it.
   */
  getRecommendations(): void {
    const formData = {
      budget: this.budget,
      useCase: this.useCase,
      // Conditionally include gamingType only if the 'gaming' use case is selected
      gamingType: this.useCase === 'gaming' ? this.gamingType : null,
      priority: this.priority
    };

    console.log('Form Submitted:', formData);
    // In a real application, you would send this data to a service or an AI endpoint.
    alert('Check the browser console (F12) to see the selected options!');
  }
}
