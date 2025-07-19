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
