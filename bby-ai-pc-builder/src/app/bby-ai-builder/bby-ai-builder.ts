import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bby-ai-builder',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './bby-ai-builder.html',
  styleUrl: './bby-ai-builder.scss'
})
export class BbyAiBuilder {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8000/api/v1/recommendations/';

  public budget: number = 1000;
  public useCase: string = 'gaming';
  public gamingType: string = 'esports';
  public priority: string = 'optimized';
  public recommendationResponse: any = null;

  public get budgetExplanation(): string {
    if (this.budget < 750) {
      return 'Entry-level system for 1080p gaming at medium settings and everyday tasks.';
    } else if (this.budget < 1500) {
      return 'Solid 1080p high-settings gaming and smooth multitasking.';
    } else if (this.budget < 2500) {
      return 'Excellent for 1440p gaming and streaming or content creation.';
    } else if (this.budget < 3500) {
        return 'Top-tier performance for 4K gaming and professional workloads.';
    } else {
      return 'Maxed-out builds for uncompromising 4K gaming and demanding creative work.';
    }
  }

  getRecommendations(): void {
    const formData = {
      budget: this.budget,
      useCase: this.useCase,
      gamingType: this.useCase === 'gaming' ? this.gamingType : null,
      priority: this.priority
    };

    console.log('Sending to Django API:', formData);
    this.recommendationResponse = null; // Reset previous response

    this.http.post(this.apiUrl, formData).subscribe({
      next: (response) => {
        console.log('Response from Django:', response);
        this.recommendationResponse = response;
        alert('Success! Check the console and the page for the API response.');
      },
      error: (error) => {
        console.error('Error calling API:', error);
        this.recommendationResponse = { error: 'Failed to get recommendations. Is the Django server running?' };
        alert('Error! Could not connect to the API. See the console for details.');
      }
    });
  }
}
